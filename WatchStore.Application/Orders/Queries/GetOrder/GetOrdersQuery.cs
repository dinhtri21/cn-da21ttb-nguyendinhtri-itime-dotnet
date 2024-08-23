using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Orders.Queries.GetOrder
{
    public class GetOrdersQuery : IRequest<IEnumerable<OrderDto>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public GetOrdersQuery(int pageNumber, int pageSize)
        {
            PageNumber = pageNumber;
            PageSize = pageSize;
        }
    }
}
