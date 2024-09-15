using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, int>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public CreateProductCommandHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            if (!await _productRepository.IsBrandExistsAsync(request.BrandId))
            {
                throw new ValidationException($"BrandId {request.BrandId} không tồn tại.");
            }
            if (!await _productRepository.IsMaterialExistsAsync(request.MaterialId))
            {
                throw new ValidationException($"MaterialId {request.MaterialId} không tồn tại.");
            }

            var product = _mapper.Map<Product>(request);
            product.ProductImages = request.ImageUrls.Select(url => new ProductImage { ImageUrl = url }).ToList();

            await _productRepository.AddProductAsync(product);
            return product.ProductId;

        }
    }
}
