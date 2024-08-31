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
    public class CartRepository : ICartRepository
    {
        private readonly WatchStoreDbContext _context;
        public CartRepository(WatchStoreDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateCartAsync(Cart cart)
        {
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
            return cart.CartId;
        }

        public async Task<Cart> GetCartByIdCutomerAsync(int idCustomer)
        {
            var cart = await _context.Carts.FirstOrDefaultAsync(c => c.CustomerId == idCustomer);
            return cart;
        }
    }
}
