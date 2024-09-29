export default function AboutPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto max-w-screen-xl my-2 px-4 md:px-14 mt-5 md:mt-8">
        <div className="flex justify-center">
          <h1 className="uppercase font-semibold text-lg md:text-xl">
            Giới thiệu và hướng dẫn
          </h1>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-3 md:mt-5">
          <div className="md:col-span-2">
            <h3 className="uppercase text-lg font-semibold">1. Về chúng tôi</h3>
            <p className="text-justify">
              iTime, ra đời năm 2023, tự hào là địa chỉ uy tín trong lĩnh vực
              bán lẻ đồng hồ chính hãng tại Việt Nam. Với sứ mệnh kết nối những
              người đam mê đồng hồ với thế giới phong cách và sự tinh tế, iTime
              mang đến sự đa dạng về thương hiệu và mẫu mã. Chúng tôi cam kết
              cung cấp sản phẩm chất lượng, dịch vụ tận tâm, và đảm bảo sự an
              tâm, tin cậy cho khách hàng. iTime không chỉ là nơi mua sắm mà còn
              là nguồn cảm hứng cho những ai trân trọng giá trị thời gian và
              phong cách.
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg font-semibold">
              2. Hướng dẫn mua hàng online
            </h3>
            <p>
              Bước 1: Truy cập website SneakerStore
              <br />
              Bước 2: Tìm kiếm sản phẩm cần mua, chọn size giày, số lượng
              <br />
              Bước 3: Đặt hàng <br />– Thêm sản phẩm vào giỏ hàng và nhấn thanh
              toán
              <br />– Điền đầy đủ thông tin mua hàng theo yêu cầu <br />– Nhấn
              đặt hàng để hoàn tất <br />– Kiểm tra email để xem chi tiết đơn
              hàng
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg font-semibold">
              3. Bảo hành đổi và trả
            </h3>
            <p>
              - Quý khách có thể đổi nếu size không vừa hoặc sản phẩm không đúng
              sau khi nhận hàng.
              <br />
              - Khách hàng ở xa có thể được hỗ trợ phí ship đổi trả.
              <br />
              - Khách hàng đến trực tiếp cửa hàng sẽ được giải quyết đổi trả
              ngay lập tức.
              <br />- Chi tiết, vui lòng đọc tại chính sách đổi trả.
            </p>
          </div>
          <div>
            <h3 className="uppercase text-lg font-semibold">
              4. Thông tin liên hệ
            </h3>
            <p>
              - Địa chỉ: 126 Nguyễn Thiện Thành, Phường 5, Trà Vinh
              <br /> - Hotline: 0357550228
              <br /> - Email: tringuyen.21092003@gmail.com
              <br /> - Mở cửa:
              <br /> + T2 – T7: 11:00 ~ 21:00
              <br /> + CN: 14:00 ~ 20:00
            </p>
          </div>
          <div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15720.504546942351!2d106.3465193!3d9.9234516!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0175ea296facb%3A0x55ded92e29068221!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBUcsOgIFZpbmg!5e0!3m2!1svi!2s!4v1703329265825!5m2!1svi!2s"
                width="800"
                height="200"
                style={{ border: 0 }}
                className="w-full h-120"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
