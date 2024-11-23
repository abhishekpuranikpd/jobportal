"use client";
import { UploadButton } from "@uploadthing/react";
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ResumeuploadClient = ({ userdata }) => {
  const [formData, setFormData] = useState({
    resumeUrl: "",
    resumename: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (!formData.resumeUrl) {
      setErrorMessage("Please upload your resume");
      setLoading(false);
      return;
    }

    console.log("Form Data before submission:", formData); // Debug log

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("resumeUrl", formData.resumeUrl); // The resume URL received from the UploadButton
      formDataToSubmit.append("resumename", formData.resumename);
      const response = await fetch("/api/jobseeker/uploadresume", {
        method: "POST",
        body: formDataToSubmit,
      });

      console.log("API Response:", response); // Log the response

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Upload failed");
      } else {
        setSuccessMessage("Upload successful!");
        setFormData({
          resumeUrl: "", // Reset the form after success
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred while uploading.");
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex  flex-col lg:pt-16 mt-20 px-6 lg:px-8 bg-gray-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-white shadow-md rounded-lg p-8">
          <h2 className="text-center text-xl font-bold text-[#243460] mb-6">
            Resume Management
          </h2>

          {/* Error and Success Messages */}
          {errorMessage && (
            <div className="text-red-600 text-center mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-600 text-center mb-4">
              {successMessage}
            </div>
          )}

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Resume Upload with UploadButton */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium leading-6 pl-4 text-[#243460]">
                Resume Upload
              </label>
              <UploadButton
                className="bg-blue-600 text-white rounded-full"
                endpoint="fileUploader"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  if (res.length > 0) {
                    const uploadedFile = res[0]; // Access the first file in the response array
                    const originalFileName =
                      uploadedFile.originalName || uploadedFile.name; // Check for the original file name
                    console.log("Original File Name: ", originalFileName);

                    setFormData((prevData) => ({
                      ...prevData,
                      resumeUrl: uploadedFile.url, // Assuming the response contains the URL
                      resumename: originalFileName, // Save the original file name if needed
                    }));
                    alert(`Upload Completed: ${originalFileName}`);
                  }
                }}
                onUploadError={(error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#243460] py-2 text-white hover:bg-[#3d5af1]"
                disabled={loading}
              >
                {loading ? "Uploading" : "Upload"}
              </button>
            </div>
          </form>
          <div className="mb-4 mt-6">
            <h3 className="font-semibold text-[#243460] text-sm lg:text-lg mb-2 flex items-center">
              <FileText className="inline mr-2" size={16} /> Resumes{" "}
              <span className="text-[10px] ml-2">
                ({userdata.resumes.length})
              </span>
            </h3>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-sm text-[#243460]">
                    Resume Title
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-sm text-[#243460]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userdata.resumes.map((resume, index) => (
                  <tr key={index} className="border">
                    <td className="px-4 py-2 text-sm">
                      {resume.title || `Resume ${index + 1}`}
                    </td>
                    <td className="px-4 py-2 border text-sm">
                      {resume.url ? (
                        <Link
                          href={resume.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 p-2 border"
                        >
                          View Resume
                        </Link>
                      ) : (
                        <span className="text-gray-500">URL not available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeuploadClient;
