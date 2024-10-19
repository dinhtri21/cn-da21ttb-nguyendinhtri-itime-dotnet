using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Orders.Queries.GetOrdersCount
{
    public class GetOrdersCountQuery : IRequest<int>
    {
        public int? year { get; set; }
        public int? month { get; set; }
        public GetOrdersCountQuery(int? year, int? month)
        {
            this.year = year;
            this.month = month;
        }
    }
}
