using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Brands.Queries.GetBrands
{
    public class GetBrandsQueryHandler : IRequestHandler<GetBrandsQuery, BrandsResponse>, IApplicationMarker

    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        public GetBrandsQueryHandler(IBrandRepository brandRepository, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }
        public async Task<BrandsResponse> Handle(GetBrandsQuery request, CancellationToken cancellationToken)
        {
            var brands = await _brandRepository.GetBrandsAsync(request.Skip, request.Limit, request.Filters);
            if (brands == null)
            {
                throw new Exception("Brands not found");
            }

            var totalBrands = await _brandRepository.GetBrandsAsync(null, null, null);
            var totalBrandFilters = await _brandRepository.GetBrandsAsync(0, totalBrands.Count(), request.Filters);

            return new BrandsResponse
            {
                Brands = _mapper.Map<List<BrandDto>>(brands),
                limit = request.Limit,
                skip = request.Skip,
                total = totalBrandFilters.Count()
            };
        }


    }
}
