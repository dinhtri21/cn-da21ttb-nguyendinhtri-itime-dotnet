﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Shipping.Queries
{
    public class GetShippingFeeQuery : IRequest<GhtkShippingFeeResponseDto>
    {
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string PickProvince { get; set; }
        public string PickDistrict { get; set; }
        public int Weight { get; set; }
        public int Value { get; set; }
        public string DeliverOption { get; set; }
    }
}
