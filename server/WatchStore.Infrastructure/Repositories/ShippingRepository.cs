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
    public class ShippingRepository : IShippingRepository
    {
        private readonly WatchStoreDbContext _context;
        public ShippingRepository(WatchStoreDbContext context)
        {
            _context = context;
        }

        public async Task<Shipping> CreateShippingAsync(Shipping shipping)
        {
           var result = await _context.Shippings.AddAsync(shipping);
            await _context.SaveChangesAsync();

            return result.Entity;
        }
    }
}
