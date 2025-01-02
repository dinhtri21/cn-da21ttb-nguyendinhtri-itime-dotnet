using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<ProductDto>
    {
        public int ProductId { get; set; }
        public GetProductByIdQuery(int productId)
        {
            ProductId = productId;
        }
    }
}
