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

namespace WatchStore.Application.Brands.Commands.CreateBrand
{
    public class CreateBrandCommandHandler : IRequestHandler<CreateBrandCommand, BrandDto>, IApplicationMarker
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        public CreateBrandCommandHandler(IBrandRepository brandRepository, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }
       
        public async Task<BrandDto> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _brandRepository.CreateBrandAsync(new Brand
            {
                BrandName = request.BrandName,
                BrandDescription = request.BrandDescription
            });

           return _mapper.Map<BrandDto>(brand);
        }
    }
}
