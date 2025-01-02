using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.OrderDetails.Queries.GetOrderDetailsByOrderId
{
    public class GetOrderDetailsByOrderIdQueryHandler : IRequestHandler<GetOrderDetailsByOrderIdQuery, IList<OrderDetailDto>>, IApplicationMarker
    {
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IMapper _mapper;
        public GetOrderDetailsByOrderIdQueryHandler(IOrderDetailRepository orderDetailRepository, IMapper mapper)
        {
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
        }
        public async Task<IList<OrderDetailDto>> Handle(GetOrderDetailsByOrderIdQuery request, CancellationToken cancellationToken)
        {
            var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(request.OrderId);

            return _mapper.Map<IList<OrderDetailDto>>(orderDetails);
        }
    }
}
