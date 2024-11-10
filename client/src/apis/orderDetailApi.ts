import axiosConfig from "@/lib/axiosConfig";
import { OrderDetail } from "@/types/orderDetail";

const OrderDetailApi = {
    async GetOrderDetailsByOrderId(token: string, orderId: number): Promise<OrderDetail[]> {
        const res = await axiosConfig.get(`/order-details/order/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }
}

export default OrderDetailApi;