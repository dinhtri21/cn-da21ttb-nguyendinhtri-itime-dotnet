﻿using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService;

namespace WatchStore.Application.Shippings.Queries.GetCalculateFee
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
            // TP Trà vinh: 1560
            var res = await _ghnService.GetServiceAsync(new GetServiceRequest() { ShopID = 1 , FromDistrict = 1560, ToDistrict = request.ToDistrictId });

            var service = res.Data.FirstOrDefault(x => x.ShortName == "Hàng nhẹ");
            if (service == null)
            {
                service = res.Data[0];
            }

            var calculateFeeRequest = new CalculateFeeRequest
            {
                ServiceId = service.ServiceID,
                ServiceTypeId = service.ServiceTypeID,
                ToDistrictId = request.ToDistrictId,
                ToWardCode = request.ToWardCode,
                Height = request.Height,
                Length = request.Length,
                Weight = request.Weight,
                Width = request.Width,
            };

            var calculateFeeResponse = await _ghnService.CalculateFeeAsync(calculateFeeRequest);
            return _mapper.Map<GHNCalculateFeeDto>(calculateFeeResponse);

        }
    }
}