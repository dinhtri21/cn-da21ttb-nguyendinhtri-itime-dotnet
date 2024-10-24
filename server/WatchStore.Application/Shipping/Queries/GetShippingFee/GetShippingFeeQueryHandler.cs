using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Shipping.Queries.GetShippingFee
{
    public class GetShippingFeeQueryHandler : IRequestHandler<GetShippingFeeQuery, GhtkShippingFeeDto>, IApplicationMarker
    {
        private readonly IGhtkService _shippingService;
        private readonly IMapper _mapper;

        public GetShippingFeeQueryHandler(IGhtkService shippingService, IMapper mapper)
        {
            _shippingService = shippingService;
            _mapper = mapper;
        }

        public async Task<GhtkShippingFeeDto> Handle(GetShippingFeeQuery request, CancellationToken cancellationToken)
        {
            var fee = await _shippingService.GetGhtkFeeAsync(
                request.Address, request.Province, request.District,
                request.PickProvince, request.PickDistrict,
                request.Weight, request.DeliverOption);

            return _mapper.Map<GhtkShippingFeeDto>(fee);
        }
    }
}
