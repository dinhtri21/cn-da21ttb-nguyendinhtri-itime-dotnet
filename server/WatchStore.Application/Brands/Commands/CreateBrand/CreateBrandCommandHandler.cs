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

namespace WatchStore.Application.Brands.Commands.CreateBrand
{
    public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, BrandDto>, IApplicationMarker
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CreateBrandCommandHandler(IBrandRepository brandRepository, IMapper mapper, IWebHostEnvironment webHostEnvironment)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<BrandDto> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            // Save file and get URL
            var fileName = $"{Guid.NewGuid()}_{request.Images.FileName}";
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "brands", fileName);

            Directory.CreateDirectory(Path.GetDirectoryName(filePath));

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await request.Images.CopyToAsync(stream);
            }
            var relativePath = $"/images/brands/{fileName}";

            // Create brand
            var brand = await _brandRepository.CreateBrandAsync(new Brand
            {
                BrandName = request.BrandName,
                BrandDescription = request.BrandDescription,
                BrandImageUrl = relativePath
            });

            return _mapper.Map<BrandDto>(brand);
        }
    }
}
