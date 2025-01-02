using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.OrderDetails.Queries.GetOrderDetailById
{
    public class GetOrderDetailByIdQueryHandler : IRequestHandler<GetOrderDetailByIdQuery, OrderDetailDto>, IApplicationMarker
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IMapper _mapper;
        public GetOrderDetailByIdQueryHandler(IOrderDetailRepository orderDetailRepository, IMapper mapper)
        {
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
        }
        
        public async Task<OrderDetailDto> Handle(GetOrderDetailByIdQuery request, CancellationToken cancellationToken)
        {
            var orderDetail = await _orderDetailRepository.GetOrderDetailByIdAsync(request.OrderDetailId);

            if(orderDetail != null && orderDetail.Order.CustomerId != request.CustomerId)
            {
                throw new UnauthorizedAccessException();
            }

           return _mapper.Map<OrderDetailDto>(orderDetail);
        }
    }
}
