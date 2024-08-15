using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Queries.GetAllProducts
{
    public record GetAllProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; } = 9; // Default page size

        public GetAllProductsQuery(int pageNumber)
        {
            PageNumber = pageNumber;
        }
    }
}
