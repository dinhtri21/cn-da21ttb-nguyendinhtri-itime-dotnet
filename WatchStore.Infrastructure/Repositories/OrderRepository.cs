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
    public class OrderRepository : BaseRepository,  IOrderRepository
    {
        private readonly WatchStoreDbContext _context;
        public OrderRepository(WatchStoreDbContext context) : base (context)
        {
            _context = context;
        }
        public async Task AddOrderAsync(Order order)
        {
            _context.Orders.Add(order);
        }
    }
}
