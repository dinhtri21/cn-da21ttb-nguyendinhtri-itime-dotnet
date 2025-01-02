using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Materials.Queries.GetMaterialById
{
    public class GetMaterialByIdQueryHandler : IRequestHandler<GetMaterialByIdQuery, MaterialDto>, IApplicationMarker
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;
        public GetMaterialByIdQueryHandler(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        public async Task<MaterialDto> Handle(GetMaterialByIdQuery request, CancellationToken cancellationToken)
        {
            var material = await _materialRepository.GetMaterialByIdAsync(request.id);
            if (material == null)
            {
                throw new KeyNotFoundException("Material not found");
            }

            return _mapper.Map<MaterialDto>(material);
            
        }
    }
}
