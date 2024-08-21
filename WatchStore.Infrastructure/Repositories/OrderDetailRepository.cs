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
    public class OrderDetailRepository : BaseRepository, IOrderDetailRepository
    {
        private readonly WatchStoreDbContext _context;
        public OrderDetailRepository(WatchStoreDbContext context ) : base(context) { 
            _context = context;
        }

        public async Task AddOrderDetailsAsync(OrderDetail orderDetail)
        {
            await _context.OrderDetails.AddAsync(orderDetail);
        }
    }
}
