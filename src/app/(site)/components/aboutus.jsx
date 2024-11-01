"use client";
import React, { useState } from "react";
import { BookA } from "lucide-react";
import Image from "next/image";

const AboutUs = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => setIsHovered(true);
  const handleLeave = () => setIsHovered(false);

  return (
    <div className="container  mx-auto px-4 sm:px-6 lg:px-16 mt-8 mb-4 py-6">
      {/* Header Section */}
      <div>
        {" "}
        <div
          className="text-3xl font-semibold font-sans text-center text-gray-800 mb-2"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          About Us
        </div>
      </div>
      <hr className="w-24 h-1 mx-auto mb-6 bg-blue-500 rounded" />

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/3">
          <Image
            src="https://res.cloudinary.com/dnckhli5u/image/upload/v1730441092/Final_rvb4ax.png"
            alt="Peperk Logo"
            height={400}
            width={400}
            className="h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-md object-contain"
          />
        </div>

        {/* Description Section */}
        <div className="w-full md:w-2/3 text-justify p-4 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-blue-500">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Welcome to <strong>Peperk.in</strong>, a platform by{" "}
            <strong>Fortunovet Resources Pvt Ltd</strong>—a leader in human
            resources solutions, dedicated to transforming the talent sourcing
            and job-seeking experience across India. Fortunovet Resources Pvt
            Ltd has built a reputation as a trusted partner in manpower
            solutions, helping businesses of all sizes access skilled
            professionals at industry-best rates.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            <strong>Peperk.in</strong> goes beyond traditional hiring practices,
            offering unique features such as an advanced resume builder and
            personalized video resumes. Our platform provides exclusive perks
            for users, from shopping discounts to health insurance options,
            adding real value to every career path. Our mission is simple: to
            connect people with opportunities and empower them to succeed.
          </p>

          {/* Vision Section */}
          <div className="flex items-center gap-2 mt-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-500">
              Our Vision
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We aim to be India’s most trusted career platform, bridging the gap
            between talent and opportunity through technology and perks that
            empower job seekers and employers alike. As a Fortunovet Resources
            Pvt Ltd company, we’re building a thriving, resilient workforce that
            drives progress across industries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
