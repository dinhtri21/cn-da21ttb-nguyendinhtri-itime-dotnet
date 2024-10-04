using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Queries.GetProducts
{
    public class GetProductsQuery : IRequest<ProductListDto>
    {
        public List<int> BrandIds { get; set; }
        public List<int> MaterialIds { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; } // Default page size
        public string SortOrder { get; set; }
        public GetProductsQuery(List<int> brandIds, List<int> materialIds,int skip, int limit, string sortOrder)
        {
            BrandIds = brandIds;
            MaterialIds = materialIds;
            Skip = skip;
            Limit = limit;
            SortOrder = sortOrder;
        }
    }
}
