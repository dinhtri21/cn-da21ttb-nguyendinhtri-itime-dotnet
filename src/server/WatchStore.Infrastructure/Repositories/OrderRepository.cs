using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;
using System.Linq.Dynamic.Core;

namespace WatchStore.Infrastructure.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly WatchStoreDbContext _context;
        public OrderRepository(WatchStoreDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync(int Skip, int Limit, Dictionary<string, string> filters)
        {

            var query = _context.Orders.Include(o => o.Payment)
                                       .OrderByDescending(o => o.CreatedAt)
                                       .AsQueryable();

            foreach (var filter in filters)
            {
                var filterValue = filter.Value;

                // Kiểm tra xem filter.Value có được bao bởi cặp dấu "" hay không
                if (filterValue.StartsWith("\"") && filterValue.EndsWith("\""))
                {
                    // Nếu là chuỗi, loại bỏ dấu "" và sử dụng LIKE
                    filterValue = filterValue.Trim('"');
                    query = query.Where($"{filter.Key}.Contains(@0)", filterValue);
                }
                else
                {
                    // Nếu không phải chuỗi, sử dụng ==
                    query = query.Where($"{filter.Key} == @0", filterValue);
                }
            }

            var orders = await query.Skip(Skip * Limit)
                                     .Take(Limit)
                                     .ToListAsync();

            return orders;
        }
        public async Task AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var order = await _context.Orders
                                      .Include(o => o.OrderDetails)
                                      .FirstOrDefaultAsync(o => o.OrderId == orderId);

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetTotalOrderCountAsync()
        {
            int TotalCount = await _context.Orders
                                      .CountAsync();

            return TotalCount;
        }

        public async Task<IEnumerable<Order>> GetOrdersByCustomerIdAsync(int customerId, int Skip, int Limit)
        {
            var orders = await _context.Orders
                                       .Where(o => o.CustomerId == customerId)
                                       .Include(o => o.Payment)
                                       .OrderByDescending(o => o.CreatedAt)
                                       .Skip(Skip * Limit)
                                       .Take(Limit)
                                       .ToListAsync();
            return orders;
        }

        public async Task<int> GetTotalOrderCountByCustomerIdAsync(int customerId)
        {
            int TotalCount = await _context.Orders
                                   .CountAsync(o => o.CustomerId == customerId);

            return TotalCount;
        }

        public async Task<int> GetOrderCountByMonthAndYearAsync(int? month, int? year)
        {
            // Nếu truyền vào tháng mà không có năm -> trả về lỗi
            if (month.HasValue && !year.HasValue)
            {
                throw new ArgumentException("Vui lòng cung cấp cả năm nếu lọc theo tháng.");
            }

            var query = _context.Orders.AsQueryable();

            // Lọc theo năm nếu có
            if (year.HasValue)
            {
                query = query.Where(o => o.CreatedAt.Year == year.Value);
            }

            // Lọc theo tháng nếu có
            if (month.HasValue)
            {
                query = query.Where(o => o.CreatedAt.Month == month.Value);
            }

            // Không truyền tháng và năm -> Đếm tất cả các đơn hàng
            return await query.CountAsync();
        }

        public async Task<Order?> GetOrderByIdAsync(int orderId)
        {
            return await _context.Orders
                               .Include(o => o.OrderDetails)
                               .Include(o => o.Payment)
                               .Include(o => o.Shipping)
                               .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }
    }
}
