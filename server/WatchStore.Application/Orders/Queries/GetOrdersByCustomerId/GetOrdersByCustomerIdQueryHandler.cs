using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Orders.Queries.GetOrdersByCustomerId
{
    public class GetOrdersByCustomerIdQueryHandler : IRequestHandler<GetOrdersByCustomerIdQuery, OrderListDto>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        public GetOrdersByCustomerIdQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }
        public async Task<OrderListDto> Handle(GetOrdersByCustomerIdQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersByCustomerIdAsync(request.CustomerId, request.Skip, request.Limit);
            int totalCount = await _orderRepository.GetTotalOrderCountByCustomerIdAsync(request.CustomerId);

            return new OrderListDto
            {
                Orders = _mapper.Map<IEnumerable<OrderDto>>(orders),
                Total = totalCount,
                Skip = request.Skip,
                Limit = request.Limit
            };
        }
    }
}
