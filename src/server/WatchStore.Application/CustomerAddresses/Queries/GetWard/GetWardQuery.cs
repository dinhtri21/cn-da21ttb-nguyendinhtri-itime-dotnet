using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CustomerAddresses.Queries.GetWard
{
    public class GetWardQuery : IRequest<List<GHNWardDto>>
    {
        public int DistrictID { get; set; }
    }
}
