using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;

namespace WatchStore.Application.Shipping.Queries.GetCalculateFee
{
    public class GetCalculateFeeQueryHandler : IRequestHandler<GetCalculateFeeQuery, GHNCalculateFeeDto>, IApplicationMarker
    {
        private readonly IGiaoHanhNhanhService _ghnService;
        private readonly IMapper _mapper;

        public GetCalculateFeeQueryHandler(IGiaoHanhNhanhService ghnService, IMapper mapper)
        {
            _ghnService = ghnService;
            _mapper = mapper;
        }
        public async Task<GHNCalculateFeeDto> Handle(GetCalculateFeeQuery request, CancellationToken cancellationToken)
        {

            var calculateFeeRequest = new CalculateFeeRequest
            {
                ServiceId = request.ServiceId,
                ServiceTypeId = request.ServiceTypeId,
                ToDistrictId = request.ToDistrictId,
                ToWardCode = request.ToWardCode,
                Height = request.Height,
                Length = request.Length,
                Weight = request.Weight,
                Width = request.Width,
                InsuranceValue = request.InsuranceValue,
                CodFailedAmount = request.CodFailedAmount,
                Coupon = request.Coupon
            };

            var calculateFeeResponse = await _ghnService.CalculateFeeAsync(calculateFeeRequest);
            return _mapper.Map<GHNCalculateFeeDto>(calculateFeeResponse);
            
        }
    }
}
