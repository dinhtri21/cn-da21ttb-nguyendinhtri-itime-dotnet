using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;

namespace WatchStore.Infrastructure.Repositories
{
    public class OrderDetailRepository : IOrderDetailRepository
    {
        private readonly WatchStoreDbContext _context;
        public OrderDetailRepository(WatchStoreDbContext context)
        {
            _context = context;
        }

        public async Task AddOrderDetailsAsync(OrderDetail orderDetail)
        {
            await _context.OrderDetails.AddAsync(orderDetail);
            await _context.SaveChangesAsync();
        }

        public async Task<OrderDetail> GetOrderDetailByIdAsync(int orderDetailId)
        {
            var orderDetail = await _context.OrderDetails
                                .Include(x => x.Product)
                                .Select(od => new OrderDetail
                                {
                                    OrderDetailId = od.OrderDetailId,
                                    ProductId = od.ProductId,
                                    Quantity = od.Quantity,
                                    UnitPrice = od.UnitPrice,
                                    Product = od.Product,
                                    Order = new Order
                                    {
                                        OrderId = od.Order.OrderId,
                                        CustomerId = od.Order.CustomerId,
                                        Total = od.Order.Total,
                                        CreatedAt = od.Order.CreatedAt
                                    }
                                })
                                .FirstOrDefaultAsync(x => x.OrderDetailId == orderDetailId);

            return orderDetail;
        }

        public async Task<IList<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            var orderDetails = await _context.OrderDetails
                          .Include(od => od.Product) 
                          .Where(od => od.OrderId == orderId) 
                          .ToListAsync(); 

            return orderDetails;
        }
    }
}
