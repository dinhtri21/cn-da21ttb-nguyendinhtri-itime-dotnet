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
    <div className="w-full mx-auto max-w-screen-xl px-4">
      <h2 className="text-center uppercase text-lg font-medium mb-1">
        THƯƠNG HIỆU NỔI BẬT
      </h2>
      <p className="text-center mb-3 text-gray-500">
        ITime luôn có sẵn sản phẩm từ những thương hiệu nổi tiếng.
      </p>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-2  md:gap-4">
        {brands.map((brand, index) => {
          return (
            <div className="overflow-hidden  rounded-lg" key={index}>
              <Image
                src={brand.image}
                width="300"
                height="150"
                alt={brand.name}
                className="dark:bg-white rounded-lg"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
