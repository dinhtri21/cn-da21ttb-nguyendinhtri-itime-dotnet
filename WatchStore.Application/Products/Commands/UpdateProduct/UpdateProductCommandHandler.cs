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

namespace WatchStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, bool>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public UpdateProductCommandHandler(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
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
            product.ProductImage = request.ImageUrls
                                          .Select(url => new ProductImage { ImageUrl = url, ProductId = request.ProductId }).ToList();

            await _productRepository.UpdateProductAsync(product);
            return true;
        }
    }

}