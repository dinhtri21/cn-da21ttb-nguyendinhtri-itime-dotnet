import { useEffect, useState } from "react";
import AddProductModal from "./add-product-modal";
import { OrderDetail } from "@/types/orderDetail";
import Cookies from "js-cookie";
import CustomToast from "@/components/react-toastify/reactToastify";
import OrderDetailApi from "@/apis/orderDetailApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Order } from "@/types/order";
import { customerApi } from "@/apis/customerApi";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

interface AlertOrderDetailProps {
  fetchProducts: () => void;
  children: React.ReactNode;
}

export default function AlertAddProduct(props: AlertOrderDetailProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const token = Cookies.get("accessTokenAdmin");
  const [customer, setCustomer] = useState<Customer>({
    customerId: null,
    fullName: null,
    phoneNumber: null,
    email: null,
  });

  const handleClose = () => {

    setIsOpen(false);
  };
  const handleOpen = () => setIsOpen(true);

  console.log(isOpen)
  // Close dialog if clicked outside the content area
  // const handleClickOutside = (e: React.MouseEvent) => {
  //   const dialogContent = e.target as HTMLElement;
  //   if (!dialogContent.closest(".dialog-content")) {
  //     handleClose();
  //   }
  // };

  return (
    <>
      {/* Trigger button to open the dialog */}
      <div onClick={handleOpen}>{props.children}</div>

      {/* Dialog (Alert) */}
      {isOpen  && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50 overflow-y-scroll"
          // onClick={handleClickOutside} // Detect click outside
        >
          <div
            className="mt-[10px] mb-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            <AddProductModal
              fetchProducts={props.fetchProducts}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
}
