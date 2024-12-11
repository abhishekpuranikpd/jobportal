import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: true, // Use default body parser for JSON requests
  },
};

class APICallError extends Error {
  constructor({ url, statusCode, responseBody, responseHeaders, isRetryable }) {
    super(`API call failed at ${url}`);
    this.statusCode = statusCode;
    this.responseBody = responseBody;
    this.responseHeaders = responseHeaders;
    this.isRetryable = isRetryable;
  }

  static isInstance(err) {
    return err instanceof APICallError;
  }
}

// Retry logic to handle intermittent issues
const retryRequest = async (url, options, retries = 3, delay = 5000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... Attempts remaining: ${retries}`);
      await new Promise((res) => setTimeout(res, delay)); // Wait before retrying
      return retryRequest(url, options, retries - 1, delay);
    }
    throw error; // Throw the error after all retries have been exhausted
  }
};

export async function POST(req) {
  // Extract the prompt from the request body
  try {
    const { prompt } = await req.json();

    // API request details
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';
    const timeout = 60000; // Timeout for the request (60 seconds)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    };

    // Log the request details
    console.log('Fetching URL:', apiUrl);
    console.log('Request Headers:', options.headers);
    console.log('Request Body:', { prompt });

    // Use retry logic to handle intermittent timeouts
    const response = await Promise.race([
      retryRequest(apiUrl, options), // Retry logic
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request Timeout')), timeout)
      ),
    ]);

    // If the API response is not okay, throw an error
    if (!response.ok) {
      const errorData = await response.json();
      const error = new APICallError({
        url: response.url,
        statusCode: response.status,
        responseBody: errorData,
        responseHeaders: response.headers,
        isRetryable: response.status >= 500,
      });
      throw error;
    }

    // Parse the response and send the result back
    const data = await response.json();
    return NextResponse.json({ result: data.result }, { status: 200 });

  } catch (err) {
    // If it's a known API call error, return the error details
    if (APICallError.isInstance(err)) {
      console.error('API Call Error:', err);
      return NextResponse.json({ error: err.responseBody || err.message }, { status: err.statusCode || 500 });
    } else {
      // If it's an unexpected error, log it and return a general error message
      console.error('Unexpected Error:', err);
      return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
    }
  }
}
