using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Materials.Queries.GetMaterials
{
    public class GetMaterialsQueryHandler : IRequestHandler<GetMaterialsQuery, MaterialResponseDto>, IApplicationMarker
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;
        public GetMaterialsQueryHandler(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        public async Task<MaterialResponseDto> Handle(GetMaterialsQuery request, CancellationToken cancellationToken)
        {
            var brands = await _materialRepository.GetMaterialsAsync(request.Skip, request.Limit, request.Filters);
            if (brands == null)
            {
                throw new Exception("Brands not found");
            }

            var totalBrands = await _materialRepository.GetMaterialsAsync(null, null, null);
            var totalBrandFilters = await _materialRepository.GetMaterialsAsync(0, totalBrands.Count(), request.Filters);

            return new MaterialResponseDto
            {
                Materials = _mapper.Map<List<MaterialDto>>(brands),
                limit = request.Limit,
                skip = request.Skip,
                total = totalBrandFilters.Count()
            };
        }
    }
}
