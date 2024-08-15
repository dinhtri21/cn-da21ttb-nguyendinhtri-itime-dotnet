using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Queries.GetProductsByBrand
{
    public class GetProductsByBrandQuery : IRequest<IEnumerable<ProductDto>>
    {
        public int BrandId { get; set; }
        
    }
}
