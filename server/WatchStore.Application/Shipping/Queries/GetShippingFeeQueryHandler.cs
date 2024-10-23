using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Shipping.Queries
{
    public class GetShippingFeeQueryHandler : IRequestHandler<GetShippingFeeQuery, GhtkShippingFeeResponseDto>, IApplicationMarker
    {
        private readonly IShippingService _shippingService;

        public GetShippingFeeQueryHandler(IShippingService shippingService)
        {
            _shippingService = shippingService;
        }

        public async Task<GhtkShippingFeeResponseDto> Handle(GetShippingFeeQuery request, CancellationToken cancellationToken)
        {
            return await _shippingService.GetShippingFeeAsync(
                request.Address, request.Province, request.District,
                request.PickProvince, request.PickDistrict,
                request.Weight, request.Value, request.DeliverOption);
        }
    }
}
