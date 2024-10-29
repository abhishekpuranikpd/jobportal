"use client";
import React, { useState } from "react";
import Image from "next/image";

const Alljobseekers = ({ fetchedJobSeekers }) => {
  const [selectedResume, setSelectedResume] = useState(null);

  const closeModal = () => setSelectedResume(null);

  return (
    <div className="jobseeker-container">
      {fetchedJobSeekers.map((jobseeker) => (
        <div className="card" key={jobseeker.id}>
          <div className="card-header">
            <h3>{jobseeker.fullName}</h3>
            {jobseeker.image && (
              <Image
                src={jobseeker.image}
                alt={`${jobseeker.fullName}'s Profile`}
                width={100}
                height={100}
                className="profile-image"
              />
            )}
          </div>
          <p>{jobseeker.email}</p>
          {jobseeker.phone && <p>Phone: {jobseeker.phone}</p>}
          {jobseeker.resume && (
            <div className="button-container">
              <button className="view-button" onClick={() => setSelectedResume(jobseeker.resume)}>
                View Resume
              </button>
              <a
                href={jobseeker.resume}
                download={`${jobseeker.fullName}_Resume.pdf`}
                className="download-button"
              >
                Download Resume
              </a>
            </div>
          )}
        </div>
      ))}

      {selectedResume && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <iframe
              src={selectedResume}
              width="100%"
              height="600px"
              title="Resume Preview"
            ></iframe>
          </div>
        </div>
      )}

      <style jsx>{`
        .jobseeker-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          padding: 20px;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .profile-image {
          border-radius: 50%;
        }
        .button-container {
          margin-top: 10px;
        }
        .view-button,
        .download-button {
          margin: 5px;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .view-button {
          background-color: #0070f3;
          color: white;
        }
        .download-button {
          background-color: #4caf50;
          color: white;
        }
        .view-button:hover {
          background-color: #005bb5;
        }
        .download-button:hover {
          background-color: #388e3c;
        }
        .modal {
          display: flex;
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.7);
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: #fff;
          border-radius: 5px;
          padding: 20px;
          width: 80%;
          max-width: 800px;
        }
        .close {
          cursor: pointer;
          float: right;
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Alljobseekers;
