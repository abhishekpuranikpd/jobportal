// Import necessary modules
"use client"
import { APICallError } from 'ai';
import { useState } from 'react';

const GenerateContentComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/trailresume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      if (APICallError.isInstance(err)) {
        console.error('API Call Error:', {
          url: err.url,
          requestBodyValues: err.requestBodyValues,
          statusCode: err.statusCode,
          responseHeaders: err.responseHeaders,
          responseBody: err.responseBody,
          isRetryable: err.isRetryable,
          data: err.data,
        });
        setError(`API Error: ${err.statusCode} - ${err.responseBody?.message || err.message}`);
      } else {
        console.error('Unexpected Error:', err);
        setError(`Unexpected Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate Content</h1>
      <textarea
        className="w-full border p-2 mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
      ></textarea>
      <button
        onClick={handleGenerateContent}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
      {result && <div className="mt-4 p-4 border rounded bg-gray-100">{result}</div>}
    </div>
  );
};

export default GenerateContentComponent;

