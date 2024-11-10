using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IOrderDetailRepository
    {
        Task AddOrderDetailsAsync(OrderDetail orderDetail);
        Task<OrderDetail> GetOrderDetailByIdAsync(int orderDetailId);
        Task<IList<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId);
    }
}
