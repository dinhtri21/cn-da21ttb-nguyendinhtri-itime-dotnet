using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Shipping.Queries
{
    public class GetShippingFeeQuery : IRequest<GhtkShippingFeeDto>
    {
        public string Address { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public int Weight { get; set; }
        public string DeliverOption { get; set; }
    }
}
