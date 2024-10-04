using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.CartItems.Queries.GetCartItemsCount
{
    public class GetCartItemsCountQuery:IRequest<int>
    {
        public int CustomerId { get; set; } 
        public GetCartItemsCountQuery(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
