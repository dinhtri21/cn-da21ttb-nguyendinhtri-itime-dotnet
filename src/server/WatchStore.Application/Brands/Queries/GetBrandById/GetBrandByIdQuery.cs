using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Brands.Queries.GetBrandById
{
    public class GetBrandByIdQuery : IRequest<BrandDto>
    {
        public int BrandId { get; set; }
        public GetBrandByIdQuery(int brandId)
        {
            BrandId = brandId;
        }
    }
}
