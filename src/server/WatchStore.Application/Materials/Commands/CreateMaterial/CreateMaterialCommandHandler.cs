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

namespace WatchStore.Application.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommandHandler : IRequestHandler<CreateMaterialCommand, MaterialDto>, IApplicationMarker
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;
        public CreateMaterialCommandHandler(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        public async Task<MaterialDto> Handle(CreateMaterialCommand request, CancellationToken cancellationToken)
        {
            var material = await _materialRepository.CreateMaterialAsync(new Material
            {
                MaterialName = request.MaterialName
            });

            return _mapper.Map<MaterialDto>(material);
        }
    }
}
