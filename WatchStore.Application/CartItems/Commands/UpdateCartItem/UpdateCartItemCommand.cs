using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.CartItems.Commands.UpdateCartItem
{
    public class UpdateCartItemCommand : IRequest<bool>
    {
        public int CartItemId { get; set; }
        public int Quantity { get; set; }
    }
}
