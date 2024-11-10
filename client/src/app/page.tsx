import FeaturedProducts from "@/components/featuredProducts/featuredProducts";
import Slider from "@/components/slider/slider";
import FeaturedBrands from "@/components/featuredBrands/featuredBrands";


export default function Home() {
  return (
    <div className="pb-4 mt-[80px] min-h-[calc(100vh-315px)]">
      <Slider />
      <FeaturedProducts title="Sản phẩm nổi bật" />
      <FeaturedBrands />
    </div>
  );
}





