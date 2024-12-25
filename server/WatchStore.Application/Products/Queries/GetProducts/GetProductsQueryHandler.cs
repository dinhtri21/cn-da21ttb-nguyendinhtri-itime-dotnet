using AutoMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
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
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public GetProductsQueryHandler(IProductRepository productRepository, IMapper mapper, IConfiguration configuration)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<ProductListDto> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            var Products = await _productRepository.GetProductsAsync(request.BrandIds, request.MaterialIds, request.Skip, request.Limit, request.SortOrder, request.Filters);


            int totalProduct = await _productRepository.GetTotalProductCountAsync();
            var ProductsToCount = await _productRepository.GetProductsAsync(request.BrandIds, request.MaterialIds, 0, totalProduct, request.SortOrder, request.Filters);
            int totalCount = ProductsToCount.Count();
            //int totalCount = await _productRepository.GetTotalProductCountAsync(request.BrandIds, request.MaterialIds);

            // Thêm base URL vào ImageUrl
            var baseUrl = _configuration["BaseUrl"];
            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(Products).ToList();
            foreach (var productDto in productDtos)
            {
                var updatedImageUrls = productDto.ImageUrls.ToList();
                for (int i = 0; i < updatedImageUrls.Count; i++)
                {
                    updatedImageUrls[i] = $"{baseUrl}{updatedImageUrls[i]}";
                }
                productDto.ImageUrls = updatedImageUrls;
            }

            return new ProductListDto
            {
                Products = productDtos,
                total = totalCount,
                skip = request.Skip,
                limit = request.Limit
            };
        }
    }
}
