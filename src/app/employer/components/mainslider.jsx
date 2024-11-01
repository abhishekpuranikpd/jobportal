"use client";
import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { usePathname } from "next/navigation";

const MBanner = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const pathname = usePathname();

  const images = [
    {
      src: "https://res.cloudinary.com/dnckhli5u/image/upload/v1730443878/Why-you-should-create-a-job-portal-for-your-organizations-website_033e017b0_3963_s9pivr.jpg",
    },
   
 
    {
      src: "https://res.cloudinary.com/dnckhli5u/image/upload/v1730443878/Why-you-should-create-a-job-portal-for-your-organizations-website_033e017b0_3963_s9pivr.jpg",
      
    },
  ];

  return (
    <>
      <div className="mx-5 flex justify-center items-center  mb-8">
        {" "}
        <div
          className={`w-full 
          ml-3 justify-center text-center items-center md:pt-4 `}
        >
          <div className="w-full mx-auto flex justify-center items-center ">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-6xl  px-2 mx-auto flex justify-center items-center "
              onMouseEnter={() => plugin.current.stop()}
              onMouseLeave={() => plugin.current.reset()}
            >
              <CarouselContent className="w-full">
                {images.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <Image
                      src={image.src}
                      width={1000}
                      height={600}
                      className="w-full h-full rounded-[15px] p-2"
                      alt={``}
                    />{" "}
                    <div className="absolute text-start items-start ml-4 bottom-4 w-full"></div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default MBanner;
