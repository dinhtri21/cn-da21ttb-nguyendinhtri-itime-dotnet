import FeaturedProducts from "@/components/featuredProducts/featuredProducts";
import Slider from "@/components/slider/slider";
import FeaturedBrands from "@/components/featuredBrands/featuredBrands";


export default function Home() {
  return (
    <div>
      <Slider />
      <FeaturedProducts title="Sản phẩm nổi bật" />
      <FeaturedBrands />
    </div>
  );
}
