using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CartItems.Queries.GetCartItems
{
    public class GetCartItemsQuery : IRequest<List<CartItemDto>>
    {
        public int CustomerId { get; set; }
        public GetCartItemsQuery(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
