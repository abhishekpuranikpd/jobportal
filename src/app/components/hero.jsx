"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2Icon,
  Clock,
  IndianRupeeIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

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

  const loadMoreJobs = () => setVisibleJobs((prev) => prev + 3);

  const hasSearchInputs = Object.values(search).some((input) => input.trim());

  return (
    <>
      <section className="text-[#243460] min-h-screen flex items-center justify-center body-font ">
        <div className="container mx-auto px-5 py-10">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-[30px] mt-4 md:text-[40px] text-[#5271FF] font-extrabold mb-4">
              Unlock Your Dream Career
            </h1>
            <p className="mb-8 md:w-2/3 mx-auto font-semibold text-[#243460]">
              Discover jobs matched to your goals. Start your career or take on
              new challenges with top employers. Join now!
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="flex flex-col md:flex-row items-center p-4 bg-white rounded-2xl shadow-lg space-y-3 md:space-y-0">
                <input
                  type="text"
                  name="jobType"
                  placeholder="Job Title"
                  value={search.jobType}
                  onChange={handleSearchChange}
                  className="flex-1 border-b md:border-b-0 md:border-r border-gray-300 focus:outline-none px-3 py-2"
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Experience"
                  value={search.experience}
                  onChange={handleSearchChange}
                  className="flex-1 border-b md:border-b-0 md:border-r border-gray-300 focus:outline-none px-3 py-2"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={search.location}
                  onChange={handleSearchChange}
                  className="flex-1 border-gray-300 focus:outline-none px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Filtered Jobs */}
          {hasSearchInputs && filteredJobs.length > 0 && (
            <div className="container mx-auto mt-10">
              <h2 className="text-xl font-bold text-center mb-6">Filtered Jobs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.slice(0, visibleJobs).map((job) => (
                  <Card
                    key={job.id}
                    className="bg-white shadow-lg rounded-lg p-6"
                  >
                    <CardContent>
                      <div className="flex items-start mb-3">
                        <Building2Icon className="text-[#5271FF] mr-3" />
                        <div className="flex-1">
                          <Link href={`/jobs/${job.id}`}>
                            <h3 className="font-bold text-lg text-[#243460] hover:text-[#5271FF]">
                              {job.title || "Untitled Job"}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {job.employer.name || "Unknown Company"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <p className="flex items-center gap-1 border px-2 py-1 rounded-full text-gray-600">
                          <MapPin size={16} className="text-[#5271FF]" />
                          {job.location || "Location not available"}
                        </p>
                        <p className="flex items-center gap-1 border px-2 py-1 rounded-full text-gray-600">
                          <Clock size={16} className="text-[#5271FF]" />
                          {job.employmentType || "Full Time"}
                        </p>
                        <p className="flex items-center gap-1 border px-2 py-1 rounded-full text-gray-600">
                          <IndianRupeeIcon size={16} className="text-[#5271FF]" />
                          {job.salaryMin?.toLocaleString()} -{" "}
                          {job.salaryMax?.toLocaleString()} / year
                        </p>
                      </div>
                      <div className="mt-4">
                        <Link href={`/jobs/${job.id}`}>
                          <button className="w-full bg-[#5271FF] text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-[#405ed0] transition-all">
                            View Details
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {visibleJobs < filteredJobs.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={loadMoreJobs}
                    className="bg-[#5271FF] text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-[#405ed0]"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Recent Jobs Carousel */}
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
