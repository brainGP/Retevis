"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "@tanstack/react-query";
import { getBanners } from "@/apis/banner";
import { baseUrl } from "@/lib/staticData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import CarouselSkeleton from "@/skeletons/CarouselSkeleton";

interface Banner {
  _id: string;
  image: string;
}

const fetchBanners = async (): Promise<Banner[]> => {
  const banners = await getBanners();
  return banners;
};

const CarouselComponent = () => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const {
    data: banners = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: fetchBanners,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  if (isLoading) return <CarouselSkeleton />;
  if (isError) return <div className="text-center">Failed to load banners</div>;

  return (
    <div className="relative w-full flex justify-center items-start md:items-center overflow-hidden">
      <Carousel
        plugins={[autoplayPlugin.current]}
        className="relative w-full h-[30vh] sm:h-[40vh] md:h-[60vh]"
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner, index) => {
            const imgUrl = `${baseUrl}${banner.image}`;

            return (
              <CarouselItem key={banner._id}>
                <div className="relative w-full h-auto items-center">
                  <Image
                    src={imgUrl}
                    alt={`Banner ${index}`}
                    className="object-contain p-4 h-auto w-full transition-all duration-300"
                    priority={true}
                    width={600}
                    height={600}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-6 lg:left-10 h-6 w-6 lg:h-8 lg:w-8" />
        <CarouselNext className="absolute right-6 lg:right-10 h-6 w-6 lg:h-8 lg:w-8" />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
