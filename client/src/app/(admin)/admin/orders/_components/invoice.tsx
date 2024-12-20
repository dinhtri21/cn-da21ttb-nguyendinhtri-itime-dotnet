import { Order } from "@/types/order";
import { OrderDetail } from "@/types/orderDetail";
import React, { useRef } from "react";
import { FaPrint, FaDownload, FaEnvelope } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

interface Customer {
  customerId: number | null;
  fullName: string | null;
  phoneNumber: string | null;
  email: string | null;
}

interface InvoiceProps {
  orderDetails: OrderDetail[];
  subTotal: number;
  user: Customer;
  order: Order;
}

const Invoice = (props: InvoiceProps) => {
  const invoiceData = {
    company: {
      name: "Nơi gửi",
      logo: "/logo/logo-dark2.svg",
      address: "Phường 5, Thành Phố Trà Vinh",
      phone: "(+84) 357550xxx",
      email: "tringuyen21092003@gmail.com",
    },
  };

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div
      ref={contentRef}
      className="fixed px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8 min-w-[500px] 
      print:shadow-none print:rounded-none print:pb-6 print:pt-12"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <img
            src={invoiceData.company.logo}
            alt="Company Logo"
            className="h-8"
          />
          <h1 className="text-lg font-semibold text-gray-500 uppercase">
            Hoá Đơn
          </h1>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <h2 className=" font-semibold text-gray-700">
              {invoiceData.company.name}
            </h2>
            <p className="text-sm text-gray-500">
              {invoiceData.company.address}
            </p>
            <p className="text-sm text-gray-500">{invoiceData.company.phone}</p>
            <p className="text-sm text-gray-500">{invoiceData.company.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              Số hoá đơn: #{props.order.orderId}
            </p>
            <p className="text-sm text-gray-500">
              Ngày: {props.order.createdAt}
            </p>
            <p className="text-sm text-gray-500">
              Thanh toán: {props.order.payment.paymentName}
            </p>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="font-semibold text-gray-700 ">Gửi đến:</h3>
          <p className="text-sm text-gray-600">{props.user.fullName}</p>
          <p className="text-sm text-gray-600">{props.user.phoneNumber}</p>
          <p className="text-sm text-gray-600">{props.user.email}</p>
          <p className="text-sm text-gray-600">{props.order.addressLine}</p>
        </div>

        <table className="w-full mb-4">
          <thead>
            <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
              <th className="py-2 text-left">Mô tả</th>
              <th className="py-2 text-right">SL</th>
              <th className="py-2 text-right">Giá</th>
              <th className="py-2 text-right">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {props.orderDetails.map((item, index) => (
              <tr key={index} className="text-sm text-gray-600">
                <td className="py-1 text-left max-w-[230px] line-clamp-2 overflow-hidden text-ellipsis">
                  {item.product.productName}
                </td>
                <td className="py-1 text-right">{item.quantity}</td>
                <td className="py-1 text-right">
                  {item.product.productPrice.toLocaleString()} ₫
                </td>
                <td className="py-1 text-right">
                  {item.unitPrice.toLocaleString()} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-4">
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">
              Tạm tính: {props.subTotal.toLocaleString()} ₫
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Phí vận chuyển: {props.order.shippingFee.toLocaleString()} ₫
            </p>
            <p className="text-lg font-semibold text-gray-700">
              Tổng cộng: {props.order.total.toLocaleString()} ₫
            </p>
          </div>
        </div>

        <div className="border-t pt-3 mb-4">
          {/* <p className="text-sm text-gray-600 mb-1">Payment Terms: Net 30</p> */}
          <p className="text-sm text-gray-600">
            {/* Please make checks payable to TechCorp Solutions */}
            Cảm ơn bạn đã đồng hành cùng chúng tôi! 
          </p>
        </div>

        <div className="flex justify-center space-x-4 print:hidden">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            onClick={() => reactToPrintFn()}
          >
            <FaPrint className="mr-2" />
            In Hoá Đơn
          </button>
          {/* <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200">
            <FaDownload className="mr-2" />
            Tải về
          </button>
          <button className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-200">
            <FaEnvelope className="mr-2" />
            Email
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
