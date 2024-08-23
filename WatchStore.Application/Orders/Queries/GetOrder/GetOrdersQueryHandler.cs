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
    public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, IEnumerable<OrderDto>>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;
        public GetOrdersQueryHandler(IOrderRepository orderRepository, IMapper mapper)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var orders = await _orderRepository.GetOrdersAsync(request.PageNumber, request.PageSize);
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }
    }
}
