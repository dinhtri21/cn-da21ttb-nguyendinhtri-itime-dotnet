import OutstandingProducts from "@/components/outstandingProducts/outstandingProducts";
import Slider from "@/components/slider/slider";

export default function Home() {
  return (
    <div>
      <Slider />
      <OutstandingProducts title="Sản phẩm nổi bật"/>
    </div>
  );
}
