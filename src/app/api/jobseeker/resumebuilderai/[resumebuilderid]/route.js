import { db } from "@/lib/db";
import { getSession } from "@/lib/jobseekerauth";

// Function to handle PUT requests
export async function PUT(req, {params}) {
  try {
    const loggedUser = await getSession();

    if (!loggedUser?.email) {
      // If there's no logged-in user or email, return an unauthorized response
      return new Response(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the jobseeker by email (from session)
    const jobseeker = await db.Jobseeker.findUnique({
      where: { email: loggedUser.email },
    });

    if (!jobseeker) {
      // If no jobseeker found, return an error response
      return new Response(
        JSON.stringify({ message: "Jobseeker not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the resumebuilderId from the route parameters
    const resumebuilderId = params.resumebuilderid;

    if (!resumebuilderId) {
      // If resumebuilderId is missing, return an error response
      return new Response(
        JSON.stringify({ message: "Resumebuilder ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the incoming data (formData) from the request body
    const formData = await req.json();

    // Call function to update the resume data
    await updateAIResumeGeneratedData(jobseeker.id, resumebuilderId, formData);

    // Return success response
    return new Response(
      JSON.stringify({ message: "Resume updated successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating resume:", error);

    // Return a general error response
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Function to update AIResumeGeneratedData
async function updateAIResumeGeneratedData(jobseekerId, resumebuilderId, formData) {
  try {
    // Update the record based on jobseekerId and resumebuilderId
    await db.AIResumeGeneratedData.update({
      where: {
        id: resumebuilderId,  // Ensure the ID is passed correctly here
      },
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        aboutMe: formData.aboutMe,
        skills: formData.skills,
        hobbies: formData.hobbies,
        certifications: formData.certifications,
        addressStreet: formData.address?.street,
        addressCity: formData.address?.city,
        addressState: formData.address?.state,
        addressZip: formData.address?.zip,
        education: JSON.stringify(formData.education),  // Store education as a JSON string
        workExperience: JSON.stringify(formData.workExperience),  // Store workExperience as a JSON string
      },
    });
  } catch (error) {
    console.error("Error updating resume data in database:", error);
    throw new Error("Failed to update resume data.");
  }
}
