import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";


const JobSearchBar = ({ healthPackages }) => {
  return (
    <section className="text-[#243460] body-font">
      {/* Hero Section */}
      <div className="container mx-auto px-5 mt-[450px]">
        <div className="text-center">
          <h1 className="text-[30px] text-[#5271FF] font-extrabold">
            <span>Unlock Your Dream Career</span>
          </h1>
          <p className="mb-8 container mx-auto md:w-2/3 font-semibold text-[#243460]">
            Discover jobs matched to your goals. Start your career or take on
            new challenges with top employers. Join now!
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center container mx-auto">
          <div className="w-3/4 lg:w-2/3">
            <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center md:border md:border-[#243460] p-3 bg-white rounded-full">
              <div className="flex-grow w-full mb-4 md:mb-0 md:mr-2">
                <input
                  type="text"
                  placeholder="Job Type"
                  className="w-full border-r text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex-grow w-full mb-4 md:mb-0 md:mx-1">
                <input
                  type="text"
                  placeholder="Experience"
                  className="w-full border-r text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="flex-grow w-full md:ml-2">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full text-base outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="ml-4">
                <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-full text-lg">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-8 flex justify-center items-center">
  <Carousel opts={{ align: "start" }} className="md:w-full w-[80%]">
    <CarouselContent>
      {jobPosts.map((item, index) => (
        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 basis-1/2 xl:basis-1/4 ">
          <Card className=" h-auto mb-4">
            <CardContent className="flex flex-col items-center p-2 rounded-3xl h-[280px] md:h-[300px]">
              {/* Company Logo */}
              <div className=" w-full bg-white rounded-3xl mb-4">
                {item.companyLogo ? (
                  <Image
                    src={item.companyLogo}
                    width={600}
                    height={400}
                    alt={item.companyName}
                    className="object-cover bg-[#5271FF] rounded-3xl h-28"
                  />
                ) : (
                  <div className="relative w-full h-28 md:h-28 justify-center items-center flex border-[#ffce38] rounded-3xl">Company Logo</div>
                )}
              </div>

              {/* Company Name */}
              <p className="text-[15px] font-bold text-[#243460] mb-2 text-center">
                {item.companyName}
              </p>

              {/* Job Title */}
              <p className="text-[13px] font-semibold text-[#ff5e00] mb-4 text-center">
                {item.jobTitle}
              </p>

              {/* Posted Time */}
              <div className="text-[12px] text-gray-500  mb-4">
               <span className="right-0"> {item.postedAgo}</span>
              </div>
     
              <div className="flex justify-center space-x-2 ">
            <button className="bg-[#FF3131] text-white font-semibold text-sm p-2 rounded-xl shadow-md">
            View Details 
            </button>
            <button className="bg-[#5271FF] text-white font-semibold text-sm p-2 rounded-xl shadow-md">
              Apply Now
            </button>
          </div>
            </CardContent>
          </Card>
         
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>

    </section>
  );
};

export default JobSearchBar;
const jobPosts = [
    {
      logo: "",
      companyName: "Tech Innovators Inc.",
      jobTitle: "Senior Software Engineer",
      postedAgo: "2 days ago",
    },
    {
      logo: "",
      companyName: "Global Solutions LLC",
      jobTitle: "Marketing Manager",
      postedAgo: "5 hours ago",
    },
    {
      logo: "",
      companyName: "Creative Minds Co.",
      jobTitle: "UI/UX Designer",
      postedAgo: "1 week ago",
    },
    {
      logo: "",
      companyName: "Finance Experts Ltd.",
      jobTitle: "Financial Analyst",
      postedAgo: "3 days ago",
    },
    {
      logo: "",
      companyName: "Techwave Corp.",
      jobTitle: "Data Scientist",
      postedAgo: "12 hours ago",
    },
    {
      logo: "",
      companyName: "HealthCare Corp.",
      jobTitle: "Healthcare Consultant",
      postedAgo: "4 days ago",
    },
    {
      logo: "",
      companyName: "Logistics Masters",
      jobTitle: "Operations Manager",
      postedAgo: "6 hours ago",
    },
    {
      logo: "",
      companyName: "EduTech Solutions",
      jobTitle: "Product Manager",
      postedAgo: "1 week ago",
    },
  ];
  
