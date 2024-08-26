using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Orders.Queries.GetOrder
{
    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, OrderListDto>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        public GetOrdersQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<OrderListDto> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersAsync(request.PageNumber, request.PageSize);

            int totalCount = await _orderRepository.GetTotalOrderCountAsync(request.PageNumber, request.PageSize);

            int totalPages = (int)Math.Ceiling(totalCount / (double)request.PageSize);

            return new OrderListDto
            {
                Orders = _mapper.Map<IEnumerable<OrderDto>>(orders),
                TotalCount = totalCount,
                TotalPages = totalPages
            };

            
        }
    }
}
