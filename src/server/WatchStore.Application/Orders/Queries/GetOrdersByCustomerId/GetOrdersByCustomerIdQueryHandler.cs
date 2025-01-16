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

namespace WatchStore.Application.Orders.Queries.GetOrdersByCustomerId
{
    public class GetOrdersByCustomerIdQueryHandler : IRequestHandler<GetOrdersByCustomerIdQuery, OrderListDto>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IShippingRepository _shippingRepository;
        private readonly IMapper _mapper;
        public GetOrdersByCustomerIdQueryHandler(IOrderRepository orderRepository, IMapper mapper, IGiaoHanhNhanhService giaoHanhNhanhService, IShippingRepository shippingRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _shippingRepository = shippingRepository;
        }
       
        public async Task<OrderListDto> Handle(GetOrdersByCustomerIdQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersByCustomerIdAsync(request.CustomerId, request.Skip, request.Limit);
            int totalCount = await _orderRepository.GetTotalOrderCountByCustomerIdAsync(request.CustomerId);

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

                // Cập nhật trạng thái shipping
                if (shipping.ShippingStatus != orderInfoGHN.Data.Status)
                {
                    shipping.ShippingStatus = orderInfoGHN.Data.Status;
                    await _shippingRepository.UpdateShippingAsync(shipping);
                }

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

                // Lọc theo status nếu có
                if (request.Status != null)
                {
                    orderListDto.Orders = orderListDto.Orders.Where(o => o.ShippingStatus == request.Status).ToList();
                    orderListDto.Total = orderListDto.Orders.Count();
                    orderListDto.Orders = orderListDto.Orders.Skip(request.Skip * request.Limit).Take(request.Limit).ToList();
                }
            }

            return orderListDto;
        }
    }
}
