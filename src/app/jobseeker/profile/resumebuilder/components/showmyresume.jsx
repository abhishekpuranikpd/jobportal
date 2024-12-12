"use client"
import React from 'react';
import ReactToPdf from 'react-to-pdf';

const Showmyresume = ({ data }) => {
  const ref = React.createRef(); // To refer to the content to be converted to PDF

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div ref={ref} style={{ maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <header style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>
            {data?.firstName} {data?.lastName}
          </h1>
          <p style={{ fontSize: '18px', fontStyle: 'italic' }}>
            {data?.email} | {data?.phone}
          </p>
        </header>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>About Me</h2>
          <p>{data?.aboutMe}</p>
        </section>

     
        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Skills</h2>
          <p>{data?.skills}</p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Hobbies</h2>
          <p>{data?.hobbies}</p>
        </section>
        <section style={{ marginBottom: '20px' }}>
  <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Education</h2>
  {/* Ensure `data?.education` is always an array */}
  {(data?.education && Array.isArray(data.education) ? data.education : []).map((edu, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <h3 style={{ fontSize: '20px' }}>
        {edu.institution} - {edu.degree} ({edu.year})
      </h3>
      <p>{edu.university} | {edu.city} | Grade: {edu.grade}</p>
    </div>
  ))}
</section>

<section style={{ marginBottom: '20px' }}>
  <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Work Experience</h2>
  {/* Ensure `data?.workExperience` is always an array */}
  {(data?.workExperience && Array.isArray(data.workExperience) ? data.workExperience : []).map((work, index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <h3 style={{ fontSize: '20px' }}>
        {work.company} - {work.position}
      </h3>
      <p>{work.fromDate} - {work.toDate} | {work.location}</p>
      <p><strong>Responsibilities:</strong> {work.responsibilities}</p>
    </div>
  ))}
</section>


<section style={{ marginBottom: '20px' }}>
  <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Certifications</h2>
  {/* Ensure `data?.certifications` is always an array */}
  {(data?.certifications && Array.isArray(data.certifications) ? data.certifications : []).map((cert, index) => (
    <div key={index} style={{ marginBottom: '10px' }}>
      <p><strong>{cert.name}</strong> - {cert.organization} ({cert.year})</p>
    </div>
  ))}
</section>


        <section style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '28px', borderBottom: '2px solid #007BFF' }}>Address</h2>
          <p>{data?.addressStreet}, {data?.addressCity}, {data?.addressState} - {data?.addressZip}</p>
        </section>
      </div>

      {/* PDF Download Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ReactToPdf targetRef={ref} filename="resume.pdf">
          {({ toPdf }) => (
            <button 
              onClick={toPdf} 
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>
              Download Resume as PDF
            </button>
          )}
        </ReactToPdf>
      </div>
    </div>
  );
}

export default Showmyresume;
