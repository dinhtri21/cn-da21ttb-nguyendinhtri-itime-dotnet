using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Queries.GetProducts
{
    public class GetProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
        public List<int> BrandIds { get; set; }
        public List<int> MaterialIds { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; } = 9; // Default page size

        public GetProductsQuery(List<int> brandIds, List<int> materialIds,int pageNumber) {
            BrandIds = brandIds;
            MaterialIds = materialIds;
            PageNumber = pageNumber;
        }
    }
}
