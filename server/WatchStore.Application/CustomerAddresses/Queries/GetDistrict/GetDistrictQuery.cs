using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CustomerAddresses.Queries.GetDistrict
{
    public class GetDistrictQuery : IRequest<List<GHNDistrictDto>>
    {
        public int ProvinceID { get; set; }
    }
}
