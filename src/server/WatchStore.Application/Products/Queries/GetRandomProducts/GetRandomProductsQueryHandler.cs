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

namespace WatchStore.Application.Products.Queries.GetRandomProducts
{
    public class GetRandomProductsQueryHandler : IRequestHandler<GetRandomProductsQuery, List<ProductDto>>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public GetRandomProductsQueryHandler(IProductRepository productRepository, IMapper mapper , IConfiguration configuration)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<List<ProductDto>> Handle(GetRandomProductsQuery request, CancellationToken cancellationToken)
        {
            var products = await _productRepository.GetRandomProductsAsync(request.Limit);

            // Thêm base URL vào ImageUrl
            var baseUrl = _configuration["BaseUrl"];
            var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products).ToList();
            foreach (var productDto in productDtos)
            {
                var updatedImageUrls = productDto.ImageUrls.ToList();
                for (int i = 0; i < updatedImageUrls.Count; i++)
                {
                    updatedImageUrls[i] = $"{baseUrl}{updatedImageUrls[i]}";
                }
                productDto.ImageUrls = updatedImageUrls;
            }
            return productDtos;
        }
    }
}
