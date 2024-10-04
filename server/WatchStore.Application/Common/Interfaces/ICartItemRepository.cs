using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface ICartItemRepository
    {
        Task<int> CreateCartItemAsync(CartItem cartItem);
        Task<CartItem> GetCartItemByIdAsync(int id);
        Task<bool> DeleteCartItemByIdAsync(int id);
        Task<IEnumerable<CartItem>> GetCartItemByCartIdAsync(int cartId);
        Task<CartItem> UpdateCartItemAasync(CartItem cartItem);
        Task<CartItem> GetCartItemByProductIdAsync (int productId, int cartId);
        Task<int> GetCartItemCountByIdAsync(int cartId);
    }
}
