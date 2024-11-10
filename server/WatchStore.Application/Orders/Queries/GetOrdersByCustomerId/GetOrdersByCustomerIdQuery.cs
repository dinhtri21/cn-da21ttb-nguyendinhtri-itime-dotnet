using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Orders.Queries.GetOrdersByCustomerId
{
    public class GetOrdersByCustomerIdQuery : IRequest<OrderListDto>
    {
        public int CustomerId { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }
        public GetOrdersByCustomerIdQuery(int customerId, int skip, int limit)
        {
            Skip = skip;
            Limit = limit;
            CustomerId = customerId;
        }
    }
}
