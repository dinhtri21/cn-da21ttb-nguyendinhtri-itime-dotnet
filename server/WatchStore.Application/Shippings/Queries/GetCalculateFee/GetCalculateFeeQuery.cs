using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Shippings.Queries.GetCalculateFee
{
    public class GetCalculateFeeQuery : IRequest<GHNCalculateFeeDto>
    {
        //public int ServiceId { get; set; }
        //public int? ServiceTypeId { get; set; }
        public int ToDistrictId { get; set; }
        public string ToWardCode { get; set; }
        public int Height { get; set; }
        public int Length { get; set; }
        public int Weight { get; set; }
        public int Width { get; set; }
    }
}
