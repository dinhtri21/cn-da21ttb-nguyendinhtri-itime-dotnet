using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class StatisticsDto
    {
    }

    public class OrderRevenueDto
    {
        public decimal TotalRevenue { get; set; }
        public int TotalCount { get; set; }
        public List<OrderRevenueDailyDataDto>? DailyData { get; set; }
        public List<OrderRevenueMonthlyDataDto>? MonthlyData { get; set; }
    }


    public class OrderRevenueDailyDataDto
    {
        public string Date { get; set; }
        public decimal? Revenue { get; set; }
        public int? Count { get; set; }
    }

    public class OrderRevenueMonthlyDataDto
    {
        public string Month { get; set; }
        public decimal? Revenue { get; set; }
        public int? Count { get; set; }
    }

}
