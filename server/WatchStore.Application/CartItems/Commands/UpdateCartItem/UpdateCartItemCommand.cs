using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CartItems.Commands.UpdateCartItem
{
    public class UpdateCartItemCommand : IRequest<CartItemDto>
    {
        public int CustomerId { get; set; } 
        public int CartItemId { get; set; }
        public int Quantity { get; set; }
    }
}
