import React from 'react';
import ReactToPdf from "react-to-pdf";

// PdfDownload Component
const PdfDownload = ({ targetRef }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ReactToPdf targetRef={targetRef} filename="resume.pdf">
        {({ toPdf }) => (
          <button onClick={toPdf} className="bg-black text-white py-2 px-4 rounded">
            Download Resume as PDF
          </button>
        )}
      </ReactToPdf>
    </div>
  );
};

export default PdfDownload;
