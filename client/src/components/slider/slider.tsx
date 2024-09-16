import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Banner1 from "../../assets/banner/banner-1.jpg";
import Banner2 from "../../assets/banner/banner-2.jpg";
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
                src={Banner1}
                width={200}
                height={100}
                alt="banner"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                className="w-full h-full object-cover max-h-[600px]"
                src={Banner2}
                width={200}
                height={100}
                alt="banner"
              />
            </CarouselItem>
            <CarouselItem>sdkskljk</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
