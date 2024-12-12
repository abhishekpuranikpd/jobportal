"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BrainCircuit,
  LayoutGrid,
  BadgeCheck,
  Wallet,
  Share2,
  Briefcase,
} from "lucide-react";

const AIResumeBuilder = () => {
  return (
    <>
      <section
        className="text-[#243460] min-h-screen flex items-center justify-center body-font"
        style={{
          backgroundColor: "#5271FF",
        }}
      >
        <div className="container mx-auto mt-28 px-5">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-[30px] md:text-[40px] text-[#FFFFFF] font-extrabold mb-4">
              Your Dream Job Starts with a Perfect Resume
            </h1>
            <p className="mb-8 container mx-auto md:w-2/3 font-semibold text-[#FFFFFF]">
              Build professional resumes in minutes, powered by cutting-edge AI. 
              Stand out to employers with a resume that highlights your unique skills and experience. 
              Best of all, it’s free!
            </p>
            <Link href="/jobseeker/profile/resumebuilder">
              <button className="bg-white text-[#5271FF] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#405ed0] hover:text-white transition-all">
                Build Your AI Resume Now
              </button>
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <BrainCircuit size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                Smart Suggestions
              </h3>
              <p className="text-sm text-gray-600">
                Our AI provides personalized recommendations to help you craft the ideal resume.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <LayoutGrid size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                Quick Formatting
              </h3>
              <p className="text-sm text-gray-600">
                Choose from a variety of professional templates designed to impress recruiters.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <BadgeCheck size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                Keyword Optimization
              </h3>
              <p className="text-sm text-gray-600">
                Tailor your resume with industry-specific keywords to rank higher in ATS systems.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Wallet size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                100% Free
              </h3>
              <p className="text-sm text-gray-600">
                Access all features without any cost. Start building your resume right away.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Share2 size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                Save & Share
              </h3>
              <p className="text-sm text-gray-600">
                Download your resume as a PDF or share it instantly with potential employers.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Briefcase size={50} className="text-[#5271FF] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#243460] mb-2">
                Job Matching
              </h3>
              <p className="text-sm text-gray-600">
                Get resume suggestions tailored to jobs available on our portal.
              </p>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="text-center mt-16 pb-16">
            <h2 className="text-[24px] md:text-[30px] font-bold text-[#FFFFFF]">
              Transform Your Job Hunt Today
            </h2>
            <p className="text-[#FFFFFF] md:w-2/3 mx-auto mt-4">
              Let your resume be your strongest advocate. Start using our AI Resume Builder now and 
              secure your next big opportunity.
            </p>
            <Link href="/jobseeker/profile/resumebuilder">
              <button className="mt-6 bg-white text-[#5271FF] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#405ed0] hover:text-white transition-all">
                Get Started for Free
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIResumeBuilder;
