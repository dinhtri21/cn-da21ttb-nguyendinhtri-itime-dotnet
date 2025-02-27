﻿using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using Microsoft.AspNetCore.Hosting;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Commands.CreateProduct
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, ProductDto>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IBrandRepository _brandRepository;
        private readonly IMaterialRepository _materialRepository;

        public CreateProductCommandHandler(IProductRepository productRepository, IMapper mapper, IWebHostEnvironment webHostEnvironment, IBrandRepository brandRepository, IMaterialRepository materialRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
            _brandRepository = brandRepository;
            _materialRepository = materialRepository;
        }

        public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
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

            // Lưu từng file và lấy URL
            var imageUrls = new List<string>();
            foreach (var image in request.Images)
            {
                var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products", fileName);

                // Tạo thư mục nếu chưa tồn tại
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                var relativePath = $"/images/products/{fileName}";
                imageUrls.Add(relativePath);
            }

            product.ProductImages = imageUrls.Select(url => new ProductImage { ImageUrl = url }).ToList();

            await _productRepository.AddProductAsync(product);

            product.Brand = await _brandRepository.GetBrandByIdAsync(request.BrandId);
            product.Material = await _materialRepository.GetMaterialByIdAsync(request.MaterialId);
            
            return _mapper.Map<ProductDto>(product);
        }
    }
}
