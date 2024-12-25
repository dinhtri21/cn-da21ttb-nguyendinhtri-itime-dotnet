using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Orders.Queries.GetOrder
{
    public class GetOrdersQuery : IRequest<OrderListDto>
    {
        public int Skip { get; set; }
        public int Limit { get; set; }
        public Dictionary<string, string> Filters { get; }
        public string? Status { get; set; }
        public GetOrdersQuery(int skip, int limit, Dictionary<string, string> filters, string? status)
        {
            Skip = skip;
            Limit = limit;
            Filters = filters;
            Status = status;
        }
    }
}
