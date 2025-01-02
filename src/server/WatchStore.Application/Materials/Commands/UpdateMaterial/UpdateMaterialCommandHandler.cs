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

namespace WatchStore.Application.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialCommandHandler : IRequestHandler<UpdateMaterialCommand, MaterialDto>, IApplicationMarker
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;

        public UpdateMaterialCommandHandler(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        public async Task<MaterialDto> Handle(UpdateMaterialCommand request, CancellationToken cancellationToken)
        {
            var material = await _materialRepository.GetMaterialByIdAsync(request.MaterialId);
            if (material == null)
            {
                throw new KeyNotFoundException("Material not found");
            }

            material.MaterialName = request.MaterialName ?? material.MaterialName;

            var updatedMaterial = await _materialRepository.UpdateMaterialAsync(material);

            return _mapper.Map<MaterialDto>(updatedMaterial);
        }
    }
}
