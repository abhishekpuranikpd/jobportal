"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const JobLocationFilter = ({ JobPosts }) => {
  const [userLocation, setUserLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [jobPosts, setJobPosts] = useState(JobPosts); // Initialize with JobPosts prop
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  // Function to get the user's current latitude and longitude
  const getUserLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      }
      // Request location access
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(new Error("Unable to retrieve location: " + error.message));
        },
        { enableHighAccuracy: true } // Optional: enable high accuracy
      );
    });
  };

  // Function to fetch the location name using OpenStreetMap's Nominatim API
  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
      );
      const data = await response.json();
      if (data.address && data.address.city) {
        return data.address.city; // You can change this to a different address component
      }
      throw new Error("Unable to fetch address.");
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  };

  // Normalize and remove non-alphabetic characters to improve comparison
  const normalizeLocation = (location) => {
    return location
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, ""); // Remove non-alphanumeric characters
  };

  // Function to filter jobs by location with flexible matching
  const filterJobsByLocation = (jobs, userLocation) => {
    const normalizedUserLocation = normalizeLocation(userLocation);
    return jobs.filter((job) => {
      const normalizedJobLocation = normalizeLocation(job.location);
      return (
        normalizedJobLocation.includes(normalizedUserLocation) ||
        normalizedUserLocation.includes(normalizedJobLocation)
      );
    });
  };

  // Main function to fetch and filter jobs based on user's location
  const fetchJobsByLocation = async () => {
    setLoading(true);
    setError("");
    try {
      const { latitude, longitude } = await getUserLocation();
      console.log("User Coordinates:", { latitude, longitude });

      const locationName = await getAddress(latitude, longitude);
      console.log("Resolved Location Name:", locationName);

      setUserLocation(locationName);

      // Filter jobs using the location
      const filteredJobs = filterJobsByLocation(jobPosts, locationName);
      setFilteredJobs(filteredJobs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If JobPosts prop changes, update jobPosts state
  useEffect(() => {
    setJobPosts(JobPosts);
  }, [JobPosts]);

  useEffect(() => {
    // Automatically load jobs filtered by location when the component mounts
    fetchJobsByLocation();
  }, [jobPosts]); // Re-fetch when jobPosts state changes

  return (
    <div className="container mx-auto py-8">
      <div className="container mx-auto mt-8 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold text-center mb-4">Jobs Near You</h2>
        <Carousel
          opts={{ align: "start" }}
          plugins={[plugin.current]}
          onMouseEnter={() => plugin.current.stop()}
          onMouseLeave={() => plugin.current.reset()}
          className="container w-[70%] mx-auto"
        >
          <CarouselContent>
            {filteredJobs.map((item, index) => (
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
  );
};

export default JobLocationFilter;
