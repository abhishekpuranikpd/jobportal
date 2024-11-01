"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    title: "Job Seekers",
    items: [
      {
        title: "Job Search Support",
        description:
          "The job search support I received was exceptional! The platform helped me find multiple opportunities that perfectly matched my skills. I felt supported throughout the entire process.",
        author: "Anjali Sharma",
      },
      {
        title: "Resume Building",
        description:
          "The resume building tools are fantastic! I was able to create a professional resume that landed me interviews. I highly recommend it to anyone looking for a job.",
        author: "Rahul Desai",
      },
      {
        title: "Interview Preparation",
        description:
          "Thanks to the interview preparation resources, I felt confident and well-prepared. The tips and mock interviews were invaluable in landing my dream job!",
        author: "Priya Iyer",
      },
      {
        title: "User-Friendly Interface",
        description:
          "The platform is incredibly user-friendly. I was able to navigate through job listings and application processes with ease. A great experience overall!",
        author: "Vikram Reddy",
      },
      {
        title: "Community Support",
        description:
          "Being part of this job-seeking community has been motivating. I've connected with many like-minded individuals who share valuable insights and encouragement.",
        author: "Neha Gupta",
      },
      {
        title: "Job Alerts",
        description:
          "I love the job alert feature! It keeps me updated with new job postings that match my profile, making my job search much easier.",
        author: "Amit Nair",
      },
    ],
  },
  {
    title: "Employers",
    items: [
      {
        title: "Quality Candidates",
        description:
          "We have found some of the best candidates through this platform. The quality of applicants has significantly improved since we started using it.",
        author: "Suresh Patil, HR Manager",
      },
      {
        title: "Streamlined Hiring Process",
        description:
          "The hiring process has become much more streamlined. The tools available for screening and interviewing candidates save us a lot of time.",
        author: "Meera Joshi, Talent Acquisition Lead",
      },
      {
        title: "Excellent Customer Service",
        description:
          "The customer service is top-notch! Anytime we've had questions or needed assistance, the team has been quick to help.",
        author: "Rohit Kapoor, Operations Director",
      },
      {
        title: "Effective Job Posting",
        description:
          "Posting jobs is straightforward and efficient. We can easily reach our target audience and receive quality applications in no time.",
        author: "Aditi Singh, Recruitment Coordinator",
      },
      {
        title: "Great Platform for Networking",
        description:
          "This platform has helped us network with other professionals in the industry. We've gained insights that have improved our recruitment strategies.",
        author: "Vikas Menon, CEO",
      },
      {
        title: "Cost-Effective Solutions",
        description:
          "The cost of using this service is very reasonable considering the quality of candidates and the tools we get access to. It's a smart investment for our hiring needs.",
        author: "Pooja Ramesh, Hiring Manager",
      },
    ],
  },
  {
    title: "Users",
    items: [
      {
        title: "Comprehensive Services",
        description:
          "The range of services offered is impressive. From job searching to health-related resources, it's all in one place!",
        author: "Lakshmi Reddy",
      },
      {
        title: "Easy Access to Information",
        description:
          "I love how easy it is to access information about job openings and healthcare services. The platform is well-organized and informative.",
        author: "Karan Mehta",
      },
      {
        title: "Supportive Community",
        description:
          "Being part of this community has been wonderful. Everyone is supportive and shares valuable resources and tips.",
        author: "Sneha Patil",
      },
      {
        title: "Regular Updates",
        description:
          "I appreciate the regular updates on job openings and healthcare tips. It keeps me informed and engaged with the latest opportunities.",
        author: "Vishal Gupta",
      },
      {
        title: "User-Centric Design",
        description:
          "The user-centric design makes it easy to find what I need quickly. It's a refreshing change from other platforms I've used.",
        author: "Riya Suresh",
      },
      {
        title: "Empowering Experience",
        description:
          "Using this platform has been empowering. I feel like I have the resources I need to take charge of my career and health.",
        author: "Arjun Nair",
      },
    ],
  },
];

const Testimonials = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [progress, setProgress] = useState();

  const bgColors = [
    "bg-gradient-to-r from-[#ffde59] to-[#ff914d]",
    "bg-gradient-to-r from-[#5de0e6] via-[#004aad] to-[#004aad]",
    "bg-gradient-to-br from-[#b6ff83] via-[#53e418] to-[#79b50c]",
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mb-4 mt-4 lg:mt-0 mx-auto px-16   font-poppins  container ">
        <div className="justify-center mb-4 mt-4 font-poppins text-center">
          <h1 className="lg:text-[25px] text-[20px] text-xl text-[#5271FF] font-extrabold">
            Testimonials
          </h1>
          <p className="text-[#5271FF] mt-2 mb-4 text-[11px] lg:text-[15px] ">
            <div className="flex justify-center flex-wrap space-x-2">
              {testimonials.map((category, index) => (
                <span
                  key={index}
                  className={` text-[#5271FF] rounded ${
                    selectedCategory === index ? "font-bold" : ""
                  }`}
                  onClick={() => setSelectedCategory(index)}
                >
                  {category.title}
                  {index === testimonials.length - 1 ? <></> : <> |</>}
                </span>
              ))}
            </div>
          </p>
        </div>
        <div className="mx-auto container mt-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials[selectedCategory].items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/3  sm:basis-1/2 lg:basis-1/3"
                >
                  <div className=" relative">
                    <Card className="relative h-auto mb-4 border-none ">
                      <CardContent
                        className={`flex flex-col items-start p-6  lg:h-[280px] h-full xl:h-64 font-poppins relative rounded-[15px] ${
                          bgColors[index % bgColors.length]
                        }`}
                      >
                        {/* Rating Container */}
                        <div className="hidden lg:block">
                          {" "}
                          <div className="rating-container flex items-center mb-2 relative ">
                            <div className="rating-score bg-white text-[#507bf2]  font-bold px-1 py-2 border border-blue-600 rounded-l-lg z-10">
                              5.0
                            </div>
                            <div className="rating-stars flex items-center bg-white px-2 py-[7px] border-t border-b border-blue-600 z-10">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-[#243460] mx-0.5"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.144c.969 0 1.371 1.24.588 1.81l-3.358 2.443a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.539 1.118l-3.358-2.443a1 1 0 00-1.175 0l-3.358 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.482 9.375c-.783-.57-.38-1.81.588-1.81h4.144a1 1 0 00.95-.69l1.286-3.948z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-[#243460] mx-0.5"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.144c.969 0 1.371 1.24.588 1.81l-3.358 2.443a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.539 1.118l-3.358-2.443a1 1 0 00-1.175 0l-3.358 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.482 9.375c-.783-.57-.38-1.81.588-1.81h4.144a1 1 0 00.95-.69l1.286-3.948z" />
                              </svg>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-[#243460] mx-0.5"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.144c.969 0 1.371 1.24.588 1.81l-3.358 2.443a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.539 1.118l-3.358-2.443a1 1 0 00-1.175 0l-3.358 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.482 9.375c-.783-.57-.38-1.81.588-1.81h4.144a1 1 0 00.95-.69l1.286-3.948z" />
                              </svg>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-[#243460] mx-0.5"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.144c.969 0 1.371 1.24.588 1.81l-3.358 2.443a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.539 1.118l-3.358-2.443a1 1 0 00-1.175 0l-3.358 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.482 9.375c-.783-.57-.38-1.81.588-1.81h4.144a1 1 0 00.95-.69l1.286-3.948z" />
                              </svg>{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 fill-current text-[#243460] mx-0.5"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.144c.969 0 1.371 1.24.588 1.81l-3.358 2.443a1 1 0 00-.364 1.118l1.286 3.947c.3.921-.755 1.688-1.539 1.118l-3.358-2.443a1 1 0 00-1.175 0l-3.358 2.443c-.784.57-1.838-.197-1.539-1.118l1.286-3.947a1 1 0 00-.364-1.118L2.482 9.375c-.783-.57-.38-1.81.588-1.81h4.144a1 1 0 00.95-.69l1.286-3.948z" />
                              </svg>
                            </div>
                            <div className="absolute  right-[-4px] top-1/2 transform -translate-y-1/2 h-6 w-6 bg-white border border-blue-600 border-l-transparent rotate-45"></div>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className=" text-[10px]  lg:text-[16px] md:pl-4 font-bold mt-2 text-white">
                          {item.title}
                        </h2>
                        {/* Description */}
                        <p className="mt-2 text-black md:pl-4 text-[8px]  lg:text-[14px]">
                          {item.description}
                        </p>
                        {/* Author */}
                        <p className="mt-2 text-white font-bold  text-end  text-[8px] lg:text-[14px] self-end">
                          {item.author}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>{" "}
        <div className="justify-center mt-4 mb-12  text-center">
          <h1 className="lg:text-[30px] text-[10px] mb-2 text-xl font-cursive  text-[#324260] font-extrabold">
          Unlock Your Career Potential
          </h1>
          <p className="text-[#5271FF] font-poppins text-[8px] lg:text-[15px] ">
          Explore exciting job opportunities tailored just for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
