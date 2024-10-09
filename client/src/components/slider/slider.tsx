import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import Image from "next/image";

export default function Slider() {
  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto mt-2 bg-slate-400 border">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <Image
                className="w-full h-full object-cover max-h-[600px]"
                src={"/banner/banner-3.jpg"}
                width={1200}
                height={600}
                alt="banner"
                quality={100}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                className="w-full h-full object-cover max-h-[600px]"
                src={"/banner/banner-4.jpg"}
                width={1200}
                height={600}
                alt="banner"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
