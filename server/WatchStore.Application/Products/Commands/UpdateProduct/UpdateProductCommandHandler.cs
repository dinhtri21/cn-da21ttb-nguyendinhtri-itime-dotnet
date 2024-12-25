using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, bool>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UpdateProductCommandHandler(IProductRepository productRepository, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            if (!await _productRepository.IsBrandExistsAsync(request.BrandId))
            {
                throw new ValidationException($"BrandId {request.BrandId} không tồn tại.");
            }
            if (!await _productRepository.IsMaterialExistsAsync(request.MaterialId))
            {
                throw new ValidationException($"MaterialId {request.MaterialId} không tồn tại.");
            }

            var product = await _productRepository.GetProductByIdAsync(request.ProductId);

            if (product == null)
            {
                return false;
            }

            _mapper.Map(request, product);

            // Lưu các Image cũ
            if (request.ImageUrls != null && request.ImageUrls.Count > 0)
            {
                product.ProductImages = request.ImageUrls
                                             .Select(url => new ProductImage { ImageUrl = url, ProductId = request.ProductId }).ToList();
            }
            // Lưu image mới 
            // Lưu từng file và lấy URL
            if (request.Images != null && request.Images.Count > 0)
            {
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

                // Giữ lại các ProductImages cũ và thêm các Images mới
                var existingImageUrls = product.ProductImages.Select(pi => pi.ImageUrl).ToList();
                existingImageUrls.AddRange(imageUrls);
                product.ProductImages = existingImageUrls.Select(url => new ProductImage { ImageUrl = url }).ToList();
            }
            await _productRepository.UpdateProductAsync(product);

            return true;
        }
    }

}