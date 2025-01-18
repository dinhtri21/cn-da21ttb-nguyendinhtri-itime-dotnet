using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Products.Queries.GetRandomProducts
{
    public class GetRandomProductsQuery : IRequest<List<ProductDto>>
    {
        public int Limit { get; set; }
        public GetRandomProductsQuery(int limit)
        {
            Limit = limit;
        }
    }
}
