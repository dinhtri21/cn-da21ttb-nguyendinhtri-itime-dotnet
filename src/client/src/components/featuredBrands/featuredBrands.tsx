"use client";

import Image from "next/image";
const brands = [
  {
    name: "Casio",
    image: "/logo/casio.png",
  },
  {
    name: "Citizen",
    image: "/logo/citizen.png",
  },
  {
    name: "Omega",
    image: "/logo/omega.png",
  },
  {
    name: "Seiko",
    image: "/logo/seiko.png",
  },

  {
    name: "Adriatica",
    image: "/logo/adriatica.png",
  },

  {
    name: "Titan",
    image: "/logo/titan.png",
  },

  {
    name: "Orient",
    image: "/logo/orient.png",
  },
  {
    name: "Elle",
    image: "/logo/elle.png",
  },
  
];
export default function FeaturedBrands() {
  return (
    <div className="w-full mx-auto max-w-screen-xl mt-2">
      <div className="relative flex overflow-hidden  opacity-70">
        <div className="flex py-2 px-1 w-max animate-marquee [--duration:30s] hover:[animation-play-state:paused]">
          {[...brands, ...brands].map((item, index) => (
            <div key={index} className="h-full px-3">
              <div className="relative h-full w-[150px] md:w-[200px] rounded-2xl border border-white/5 bg-white/5">
                <div className="mt-auto flex items-center gap-4">
                  <img src={item.image} className="h-[60px]  md:h-[90px] rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[100px] md:w-[500px] z-10 h-full absolute text bg-gradient-to-r from-[rgba(255,255,255,1)] bg-[rgba(255,255,255,0.001)]
           to-transparent"></div>
        <div className="w-[100px] md:w-[500px] right-0 z-10 md:h-full absolute text bg-gradient-to-r from-transparent bg-[rgba(255,255,255,0.001)]
           to-[rgba(255,255,255,1)]"></div>
      </div>

    </div>
  );
}
