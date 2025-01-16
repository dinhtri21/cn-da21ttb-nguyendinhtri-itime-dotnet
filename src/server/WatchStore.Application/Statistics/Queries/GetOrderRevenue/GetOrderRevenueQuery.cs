using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Statistics.Queries.GetOrderRevenue
{
    public class GetOrderRevenueQuery : IRequest<OrderRevenueDto>
    {
        public int? Month { get; set; }
        public int Year { get; set; }
        public GetOrderRevenueQuery(int? month, int year)
        {
            Month = month;
            Year = year;
        }
    }
}
