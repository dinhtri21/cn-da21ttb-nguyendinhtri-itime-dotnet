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

namespace WatchStore.Application.Orders.Queries.GetOrder
{
    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, OrderListDto>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IShippingRepository _shippingRepository;
        public GetOrdersQueryHandler(IOrderRepository orderRepository, IMapper mapper, IGiaoHanhNhanhService giaoHanhNhanhService, IShippingRepository shippingRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _shippingRepository = shippingRepository;
        }

        public async Task<OrderListDto> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersAsync(request.Skip, request.Limit);
            int totalCount = await _orderRepository.GetTotalOrderCountAsync();

            var orderListDto = new OrderListDto
            {
                Orders = new List<OrderShippingDto>(),
                Total = totalCount,
                Skip = request.Skip,
                Limit = request.Limit
            };

            foreach (var order in orders)
            {
                var shipping = await _shippingRepository.GetShippingByOrderIdAsync(order.OrderId);
                var orderInfoGHN = await _giaoHanhNhanhService.GetOrderInfoAsync(new GetOrderInfoRequest { OrderCode = shipping.TrackingNumber });
                orderListDto.Orders.Add(new OrderShippingDto
                {
                    OrderId = order.OrderId,
                    CustomerId = order.CustomerId,
                    PaymentId = order.PaymentId,
                    Payment = order.Payment,
                    Total = order.Total,
                    CreatedAt = order.CreatedAt,
                    TrackingNumber = shipping.TrackingNumber,
                    EstimatedDeliveryTime = shipping.EstimatedDelivery.ToString(),
                    ShippingStatus = orderInfoGHN.Data.Status,
                    ShippingFee = shipping.ShippingFee,
                    AddressLine = shipping.AddressLine
                });
            }

            return orderListDto;


        }
    }
}
