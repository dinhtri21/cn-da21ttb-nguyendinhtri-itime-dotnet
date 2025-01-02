using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Brands.Commands.UpdateBrand
{
    public class UpdateBrandCommandHandler : IRequestHandler<UpdateBrandCommand, BrandDto>, IApplicationMarker
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IMapper _mapper;

        public UpdateBrandCommandHandler(IBrandRepository brandRepository, IWebHostEnvironment webHostEnvironment, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _webHostEnvironment = webHostEnvironment;
            _mapper = mapper;
        }
        public async Task<BrandDto> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _brandRepository.GetBrandByIdAsync(request.BrandId);
            if (brand == null) {
                throw new ValidationException($"BrandId {request.BrandId} không tồn tại.");
            }

            brand.BrandName = request.BrandName ?? brand.BrandName;
            brand.BrandDescription = request.BrandDescription ?? brand.BrandDescription;

            // Save file and get URL
            if (request.BrandImage != null)
            {
                var fileName = $"{Guid.NewGuid()}_{request.BrandImage.FileName}";
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "brands", fileName);

                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await request.BrandImage.CopyToAsync(stream);
                }
                var relativePath = $"/images/brands/{fileName}";
                brand.BrandImageUrl = relativePath;
            }

            var updatedBrand = await _brandRepository.UpdateBrandAsync(brand);
            return _mapper.Map<BrandDto>(updatedBrand);

        }
    }

}
