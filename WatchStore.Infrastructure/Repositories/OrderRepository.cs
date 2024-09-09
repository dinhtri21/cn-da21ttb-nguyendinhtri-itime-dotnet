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
    public class OrderRepository :  IOrderRepository
    {
        private readonly WatchStoreDbContext _context;
        public OrderRepository(WatchStoreDbContext context) 
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync(int Skip, int Limit)
        {
            var orders = await _context.Orders
                                       .Skip(Skip * Limit)
                                       .Take(Limit)
                                       .ToListAsync();
            return orders;
        }
        public async Task AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteOrderAsync(int orderId)
        {
           var order = await _context.Orders
                                     .Include(o => o.OrderDetails)
                                     .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null) return false;

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int> GetTotalOrderCountAsync()
        {
            int TotalCount = await _context.Orders
                                      .CountAsync();

            return TotalCount;
        }
    }
}
