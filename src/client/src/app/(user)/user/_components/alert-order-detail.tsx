import { useEffect, useState } from "react";
import Invoice from "./invoice";
import { OrderDetail } from "@/types/orderDetail";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";
import OrderDetailApi from "@/apis/orderDetailApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Order } from "@/types/order";

interface AlertOrderDetailProps {
  orderId: number;
  children: React.ReactNode;
  order: Order;
}

export default function AlertOrderDetail(props: AlertOrderDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const token = Cookies.get("token");
  const user = useSelector((state:RootState) => state.user);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  // Close dialog if clicked outside the content area
  const handleClickOutside = (e: React.MouseEvent) => {
    const dialogContent = e.target as HTMLElement;
    if (!dialogContent.closest(".dialog-content")) {
      handleClose();
    }
  };

  const fetchOrderDetail = async () => {
    if (!token) {
      CustomToast.showError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
      window.location.href = "/login";
      return;
    }
    try {
      const data = await OrderDetailApi.GetOrderDetailsByOrderId(
        token,
        props.orderId
      );
      setOrderDetails(data);
    } catch (error:any) {
      console.log(error.status);
      if (error.status === 401) {
        CustomToast.showError("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại!");
        window.location.href = "/login";
        return;
      }
      CustomToast.showError("Lỗi khi lấy thông tin đơn hàng!");
    }
  };

  const calculateSubTotal = () => {
    let total = 0;
    orderDetails?.forEach((item) => {
      total += item.unitPrice
    });
    setSubTotal(total);
  }

  useEffect(() => {
    if (isOpen) {
      fetchOrderDetail();
    }
  }, [isOpen]);

  useEffect(() => {
    calculateSubTotal();
  }, [orderDetails]);

  return (
    <>
      {/* Trigger button to open the dialog */}
      <div onClick={handleOpen}>{props.children}</div>

      {/* Dialog (Alert) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50 overflow-y-scroll"
          onClick={handleClickOutside} // Detect click outside
        >
          <div
            className="mt-[10px] mb-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <Invoice subTotal={subTotal} orderDetails={orderDetails} user={user} order={props.order}/>
          </div>
        </div>
      )}
    </>
  );
}
