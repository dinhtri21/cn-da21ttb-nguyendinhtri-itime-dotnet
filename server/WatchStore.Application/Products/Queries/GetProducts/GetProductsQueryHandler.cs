using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Products.Queries.GetProducts
{
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, ProductListDto>, IApplicationMarker
    {
        readonly IProductRepository _productRepository;
        readonly IMapper _mapper;
        public GetProductsQueryHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<ProductListDto> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
          var Products = await _productRepository.GetProductsAsync(request.BrandIds, request.MaterialIds, request.Skip, request.Limit, request.SortOrder);
          
          int totalCount = await _productRepository.GetTotalProductCountAsync(request.BrandIds, request.MaterialIds);

            return new ProductListDto
            {
                Products = _mapper.Map<IEnumerable<ProductDto>>(Products),
                total = totalCount,
                skip = request.Skip,
                limit = request.Limit
            };
        }
    }
}
