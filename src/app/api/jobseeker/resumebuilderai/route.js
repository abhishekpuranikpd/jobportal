import { db } from '@/lib/db';
import { getSession } from '@/lib/jobseekerauth';
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

// Function to handle POST requests
export async function POST(req) {

const loggeduser = await getSession()
  const jobseekerId = await db.Jobseeker.findUnique({
    where : {email : loggeduser.email}
  })
  try {
    // Parse JSON data from the request body (client data)
    const formData = await req.json();

    // Generate AI-enhanced resume data
    const generatedData = await generateGeminiEnhancedResume(formData);

    // Save the enhanced resume data to the database
    await saveAIResumeGeneratedData(jobseekerId.id, generatedData);

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Resume generated and saved successfully!" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating resume:", error);

    // Return an error response
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Function to generate AI-enhanced resume data using Gemini
async function generateGeminiEnhancedResume(formData) {
  const prompt = `Enhance the following resume details. Improve phrasing, add a professional tone, and summarize effectively. Add relevant sections like hobbies and responsibilities based on skills and work experience. Return only the following JSON object, and ensure it is valid. Ensure spacing between each section, especially in the 'About Me' and 'Responsibilities' sections for clarity. Avoid any raw text or unnecessary characters.

  {
    "fullName": "<Enhanced Full Name>",
    "email": "<Enhanced Email>",
    "phone": "<Enhanced Phone>",
    "aboutMe": "<Enhanced About Me paragraph with clear spacing and justification>",
    "education": [{"institution": "<Name>", "degree": "<Degree>", "fieldOfStudy": "<Field>", "year": "<Year>", "percentage": "<Percentage>"}],
    "workExperience": [{"company": "<Company>", "position": "<Position>", "duration": "<Duration>", "responsibilities": "<Responsibility details with clear separation and structure>"}],
    "skills": "<Comma-separated list of skills with appropriate structure>",
    "hobbies": "<Comma-separated list of hobbies>",
    "certifications": [{"name": "<Certification Name>", "organization": "<Organization>", "year": "<Year>"}],
    "address": {"street": "<Street>", "city": "<City>", "state": "<State>", "zip": "<Zip Code>"}
  }
  Input:
  ${JSON.stringify(formData)}
  `;

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro-latest"),
      prompt,
    });

    const cleanedText = cleanResponse(text);
console.log(text);

    // Check and remove 'json' prefix if it exists
    let cleanedJsonText = cleanedText;
    if (cleanedText.startsWith('json')) {
      cleanedJsonText = cleanedJsonText.slice(4).trim(); // Remove 'json' prefix
    }

    // Check if the cleaned response is valid JSON
    let parsedResponse = null;
    if (isJson(cleanedJsonText)) {
      try {
        parsedResponse = JSON.parse(cleanedJsonText);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Response is not valid JSON:", cleanedJsonText);
    }

    // Validate fields in parsed response
    if (
      parsedResponse &&
      parsedResponse.fullName &&
      parsedResponse.email &&
      parsedResponse.education &&
      parsedResponse.workExperience
    ) {
      return parsedResponse;
    } else {
      return formData;  // Fallback to original data if missing fields
    }
  } catch (error) {
    console.error("Error during AI resume generation:", error);
    return formData;  // Fallback to original data on error
  }
}

// Function to clean unwanted characters like backticks, newlines, etc.
function cleanResponse(response) {
  return response.replace(/^\uFEFF|\s+|`/g, "").trim();
}

// Function to check if a string is valid JSON
function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Function to save AI-enhanced resume data to the database
async function saveAIResumeGeneratedData(jobseekerId, generatedData) {
  try {
    await db.AIResumeGeneratedData.create({
      data: {
        jobseekerId,
        fullName: generatedData.fullName,
        email: generatedData.email,
        phone: generatedData.phone,
        aboutMe: generatedData.aboutMe,  // Ensure spacing and formatting
        skills: generatedData.skills,
        hobbies: generatedData.hobbies,
        certifications: generatedData.certifications,
        addressStreet: generatedData.address?.street,
        addressCity: generatedData.address?.city,
        addressState: generatedData.address?.state,
        addressZip: generatedData.address?.zip,
        education: JSON.stringify(generatedData.education), // Ensure the data is stored as a string or in a format you prefer
        workExperience: JSON.stringify(generatedData.workExperience), // Ensure this is stored appropriately
      },
    });
  } catch (error) {
    console.error("Error saving resume data to database:", error);
    throw new Error("Failed to save resume data.");
  }
}


