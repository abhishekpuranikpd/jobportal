"use client";
import React from "react";

const Alljobseekers = ({ fetchedJobSeekers }) => {
  // Function to determine MIME type from base64 string
  const getMimeType = (base64String) => {
    const header = base64String.substring(0, 5);
    switch (header) {
      case "iVBOR": // PNG file header
        return "image/png";
      case "JVBER": // PDF file header
        return "application/pdf";
      default:
        return "";
    }
  };

  return (
    <div>
      {fetchedJobSeekers.map((jobseeker) => (
        <div key={jobseeker.id}>
          <h3>{jobseeker.fullName}</h3>
          <p>{jobseeker.email}</p>
          {jobseeker.resume && (
            <div>
              <button
                onClick={() => {
                  const mimeType = getMimeType(jobseeker.resume);
                  const blob = new Blob(
                    [Uint8Array.from(atob(jobseeker.resume), (c) => c.charCodeAt(0))],
                    { type: mimeType }
                  );
                  const url = URL.createObjectURL(blob);
                  window.open(url);
                }}
              >
                View Resume
              </button>
              <button
                onClick={() => {
                  const mimeType = getMimeType(jobseeker.resume);
                  const blob = new Blob(
                    [Uint8Array.from(atob(jobseeker.resume), (c) => c.charCodeAt(0))],
                    { type: mimeType }
                  );
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = `${jobseeker.fullName}_Resume.${mimeType.split("/")[1]}`; // Set the correct file extension
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Resume
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Alljobseekers;
