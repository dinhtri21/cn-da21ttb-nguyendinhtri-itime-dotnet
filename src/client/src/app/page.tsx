import FeaturedProducts from "@/components/featuredProducts/featuredProducts";
import Slider from "@/components/slider/slider";
import FeaturedBrands from "@/components/featuredBrands/featuredBrands";

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <div className="pb-4 mt-[80px] min-h-[calc(100vh-315px)]">
      <Slider />
      <FeaturedBrands />
      <FeaturedProducts title="Sản phẩm nổi bật" />
      <FeaturedProducts title="Sản phẩm nổi bật" />
    </div>
  );
}
