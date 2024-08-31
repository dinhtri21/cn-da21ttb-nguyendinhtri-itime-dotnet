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
    public class CartItemRepository : ICartItemRepository
    {
        private readonly WatchStoreDbContext _context;
        public CartItemRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task<int> CreateCartItemAsync(CartItem cartItem)
        {
            await _context.CartItems.AddAsync(cartItem);
            await _context.SaveChangesAsync();
            return cartItem.CartItemId;
        }

        public async Task<bool> DeleteCartItemByIdAsync(int id)
        {

            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return false;
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CartItem>> GetCartItemByCartIdAsync(int cartId)
        {
            var cartItems = await _context.CartItems
                                          .Where(c => c.CartId == cartId)
                                          .Include(c => c.Product)
                                          .ToListAsync();
            return cartItems;
        }

        public async Task<CartItem> GetCartItemByIdAsync(int id)
        {
            var cartItem = await _context.CartItems.FirstOrDefaultAsync(c => c.CartItemId == id);
            return cartItem;
        }

        public async Task<bool> UpdateCartItemAasync(CartItem cartItem)
        {
            try
            {
                _context.CartItems.Update(cartItem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;

            }
        }
    }
}
