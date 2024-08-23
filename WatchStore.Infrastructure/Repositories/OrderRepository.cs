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

        public async Task<IEnumerable<Order>> GetOrdersAsync(int pageNumber, int pageSize)
        {
            var orders = await _context.Orders
                                       .Skip((pageNumber - 1) * pageSize)
                                       .Take(pageSize)
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
    }
}
