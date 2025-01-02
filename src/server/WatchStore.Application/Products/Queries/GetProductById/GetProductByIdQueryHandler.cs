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

namespace WatchStore.Application.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler : IRequestHandler<GetProductByIdQuery, ProductDto>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        public GetProductByIdQueryHandler(IProductRepository productRepository, IMapper mapper, IConfiguration configuration)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<ProductDto> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var baseUrl = _configuration["BaseUrl"];
            var product = await _productRepository.GetProductByIdAsync(request.ProductId);
            var productDto = _mapper.Map<ProductDto>(product);

            var updatedImageUrls = productDto.ImageUrls.ToList();
            for (int i = 0; i < updatedImageUrls.Count; i++)
            {
                updatedImageUrls[i] = $"{baseUrl}{updatedImageUrls[i]}";
            }
            productDto.ImageUrls = updatedImageUrls;

            return productDto;
        }
    }
}
