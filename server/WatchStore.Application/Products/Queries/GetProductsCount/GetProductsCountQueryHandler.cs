using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Products.Queries.GetProductsCount
{
    public class GetProductsCountQueryHandler : IRequestHandler<GetProductsCountQuery, int>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        public GetProductsCountQueryHandler(IProductRepository productRepository) { 
            _productRepository = productRepository;
        }

        public async Task<int> Handle(GetProductsCountQuery request, CancellationToken cancellationToken)
        {
           int count = await _productRepository.GetTotalProductCountAsync(null, null, request.month, request.year);
           return count;
        }
    }
}
