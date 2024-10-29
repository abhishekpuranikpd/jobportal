"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2Icon, Clock, IndianRupeeIcon, MapPin } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const JobSearchBar = ({ jobPosts }) => {
  const [search, setSearch] = useState({
    jobType: "",
    experience: "",
    location: "",
  });
  const [filteredJobs, setFilteredJobs] = useState(jobPosts);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));

    const filtered = jobPosts.filter((job) => {
      return (
        (value && name === "jobType"
          ? job.title.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (value && name === "experience"
          ? job.experienceLevel?.toLowerCase().includes(value.toLowerCase())
          : true) &&
        (value && name === "location"
          ? job.location.toLowerCase().includes(value.toLowerCase())
          : true)
      );
    });
    setFilteredJobs(filtered);
    setVisibleJobs(3);
  };

  const loadMoreJobs = () => {
    setVisibleJobs((prev) => prev + 3);
  };

  const hasSearchInputs = Object.values(search).some(
    (input) => input.trim() !== ""
  );

  return (
    <>
      <section className="text-[#243460]  min-h-screen body-font">
        <div className="container mx-auto mt-20 px-5">
          <div className="text-center">
            <h1 className="text-[30px] md:text-[40px] text-[#5271FF] font-extrabold mb-4">
              <span>Unlock Your Dream Career</span>
            </h1>
            <p className="mb-8 container mx-auto md:w-2/3 font-semibold text-[#243460]">
              Discover jobs matched to your goals. Start your career or take on
              new challenges with top employers. Join now!
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center container mx-auto">
            <div className="w-11/12 md:w-3/4 lg:w-2/3">
              <div className="flex flex-col md:flex-row items-center p-3 bg-white rounded-2xl shadow-blue-100 shadow-xl md:space-y-0 space-y-2  md:rounded-full">
                <input
                  type="text"
                  name="jobType"
                  placeholder="Job Title"
                  value={search.jobType}
                  onChange={handleSearchChange}
                  className="flex-1 border-b md:border-b-0 md:border-r text-base   outline-none py-2 px-3 leading-8 mb-2 md:mb-0"
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  value={search.experience}
                  onChange={handleSearchChange}
                  className="flex-1 border-b md:border-b-0 md:border-r text-base outline-none py-2 px-3 leading-8 mb-2 md:mb-0"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={search.location}
                  onChange={handleSearchChange}
                  className="flex-1 text-base outline-none py-2 px-3 leading-8"
                />
              </div>
            </div>
          </div>

          {/* Filtered Jobs Section */}
          {hasSearchInputs && filteredJobs.length > 0 && (
            <div className="container mx-auto mt-8 flex  flex-col justify-center items-center">
              <h2 className="text-xl font-bold text-center mb-4">
                Filtered Jobs
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {filteredJobs.slice(0, visibleJobs).map((job) => (
                  <Card
                    key={job.id}
                    className="w-80 bg-transparent  bg-[#FAF9F6] shadow-xl rounded-[15px] p-4"
                  >
                    <CardContent className="flex flex-col p-2 rounded-3xl h-auto">
                      <div className="mb-3 flex items-start">
                        <span className="mx-3 my-1">
                          <Building2Icon />
                        </span>
                        <div className="flex-1">
                          <Link href={`/jobs/${job.id}`}>
                            <span className="font-bold hover:text-blue-500 text-[14px] md:text-xl">
                              {job.title || "Untitled Job"}
                            </span>
                          </Link>
                          <p className="text-xs">
                            {job.employer.name || "Unknown Company"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap   items-center font-bold gap-2 md:pb-1">
                        <p className="text-xs border-2  px-2 py-1 rounded-full flex items-center">
                          <MapPin className="text-[#243460] mr-1" size={16} />
                          {job.location || "Location not available"}
                        </p>
                        <p className="text-xs border-2  px-2 py-1 rounded-full flex items-center">
                          <Clock className="text-[#243460] mr-1" size={16} />
                          {job.employmentType || "Full Time"}
                        </p>
                        <p className="text-xs  border-2  px-2 py-1 rounded-full flex items-center">
                          <IndianRupeeIcon
                            className="text-[#243460] mr-1"
                            size={16}
                          />
                          {job.salaryMin?.toLocaleString()} -{" "}
                          {job.salaryMax?.toLocaleString()}
                          <span className="text-[#243460]"> / year</span>
                        </p>
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-4">
                        <Link href={`/jobs/${job.id}`}>
                          <button className="bg-[#5271FF] text-white font-semibold text-xs md:text-sm p-2 rounded-xl shadow-md w-full">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {visibleJobs < filteredJobs.length && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={loadMoreJobs}
                    className="bg-[#5271FF] text-white font-semibold px-4 py-2 rounded-lg"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Recent Jobs Section (Optional) */}
          <div className="container mx-auto mt-8 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-center mb-4">Recent Jobs</h2>
            <Carousel
              opts={{ align: "start" }}
              plugins={[plugin.current]}
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.reset()}
              className="container w-[70%] mx-auto"
            >
              <CarouselContent>
                {jobPosts.slice(0, 5).map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="w-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <Card className="h-auto mb-4">
                      <CardContent className="flex flex-col p-2 rounded-3xl h-auto">
                        <div className="w-full bg-white rounded-3xl mb-4">
                          {item.employer?.logo ? (
                            <Image
                              src={item.employer.logo}
                              width={600}
                              height={400}
                              alt={item.employer.name}
                              className="object-cover bg-[#5271FF] rounded-3xl h-24 md:h-28"
                            />
                          ) : (
                            <div className="relative w-full h-24 md:h-28 flex justify-center items-center border-[#ffce38] rounded-3xl">
                              Company Logo
                            </div>
                          )}
                        </div>
                        <p className="text-[14px] md:text-[15px] font-bold text-[#243460] mb-2 text-center">
                          {item.title}
                        </p>
                        <p className="text-[12px] md:text-[13px] font-semibold text-[#ff5e00] mb-4 text-center">
                          {item.employer.name}
                        </p>
                        <div className="flex justify-center items-center gap-1">
                          <Link href={`/jobs/${item.id}`}>
                            <button className="bg-[#5271FF] text-white font-semibold text-xs md:text-sm p-2 rounded-xl shadow-md w-full">
                              View Details
                            </button>
                          </Link>
                        </div>
                        <div className="text-[10px] md:text-[12px] mt-2 text-end text-gray-500 mb-4">
                          <span>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
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
        </div>
      </section>
    </>
  );
};

export default JobSearchBar;
