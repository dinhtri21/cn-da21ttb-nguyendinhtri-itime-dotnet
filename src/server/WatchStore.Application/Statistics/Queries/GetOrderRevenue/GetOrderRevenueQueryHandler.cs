using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.GetOrderInfo;

namespace WatchStore.Application.Statistics.Queries.GetOrderRevenue
{
    public class GetOrderRevenueQueryHandler : IRequestHandler<GetOrderRevenueQuery, OrderRevenueDto>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IShippingRepository _shippingRepository;
        private readonly IMapper _mapper;
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;

        public GetOrderRevenueQueryHandler(IOrderRepository orderRepository, IShippingRepository shippingRepository, IMapper mapper, IGiaoHanhNhanhService giaoHanhNhanh)
        {
            _orderRepository = orderRepository;
            _shippingRepository = shippingRepository;
            _mapper = mapper;
            _giaoHanhNhanhService = giaoHanhNhanh;
        }
        public async Task<OrderRevenueDto> Handle(GetOrderRevenue.GetOrderRevenueQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersByMonthAndYearAsync(request.Month, request.Year);

            var TotalPrice = 0;
            var TotalCount = 0;

            foreach (var order in orders)
            {
                var shipping = await _shippingRepository.GetShippingByOrderIdAsync(order.OrderId);
                var orderInfoGHN = await _giaoHanhNhanhService.GetOrderInfoAsync(new GetOrderInfoRequest { OrderCode = shipping.TrackingNumber });

                if (shipping.ShippingStatus != orderInfoGHN.Data.Status)
                {
                    shipping.ShippingStatus = orderInfoGHN.Data.Status;
                    await _shippingRepository.UpdateShippingAsync(shipping);
                }

                if (shipping.ShippingStatus == "delivered")
                {
                    TotalPrice += (int)(order.Total + shipping.ShippingFee);
                    TotalCount++;
                }
            }

            if (request.Month.HasValue)
            {
                int year = request.Year;
                int month = request.Month.Value;
                int daysInMonth = DateTime.DaysInMonth(year, month);
                var today = DateTime.Today;

                // Tạo danh sách tất cả các ngày trong tháng
                var allDays = Enumerable.Range(1, daysInMonth)
                    .Select(day => new DateTime(year, month, day))
                    .ToList();

                // Tính toán dữ liệu theo ngày
                var dailyData = allDays.Select(day =>
                {
                    var dailyOrders = orders.Where(o => o.CreatedAt.Date == day && o.Shipping.ShippingStatus == "delivered");
                    return new OrderRevenueDailyDataDto
                    {
                        Date = day.Day.ToString(), 
                        Revenue = day > today ? (decimal?)null : dailyOrders.Sum(o => (o.Total + o.Shipping.ShippingFee)),
                        Count = day > today ? (int?)null : dailyOrders.Count()
                    }; 
                }).ToList();

                return new OrderRevenueDto
                {
                    TotalRevenue = TotalPrice,
                    TotalCount = TotalCount,
                    DailyData = dailyData,
                    MonthlyData = null
                };
            }
            else
            {
                // Xử lý thống kê theo tháng
                var today = DateTime.Today;
                var allMonths = Enumerable.Range(1, 12)
                    .Select(m => new DateTime(request.Year, m, 1))
                    .ToList();

                var monthlyData = allMonths.Select(month =>
                {
                    var monthlyOrders = orders.Where(o => o.CreatedAt.Month == month.Month && o.Shipping.ShippingStatus == "delivered");
                    return new OrderRevenueMonthlyDataDto
                    {
                        Month = month.Month.ToString(),
                        Revenue = month > today ? (decimal?)null : monthlyOrders.Sum(o => (o.Total + o.Shipping.ShippingFee)),
                        Count = month > today ? (int?)null : monthlyOrders.Count()
                    };
                }).ToList();

                return new OrderRevenueDto
                {
                    TotalRevenue = TotalPrice,
                    TotalCount = TotalCount,
                    DailyData = null,
                    MonthlyData = monthlyData
                };
            }
        }

    }
}
