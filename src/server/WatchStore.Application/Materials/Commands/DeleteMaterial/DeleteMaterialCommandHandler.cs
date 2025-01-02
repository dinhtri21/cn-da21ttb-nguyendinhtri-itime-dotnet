using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommandHandler : IRequestHandler<DeleteMaterialCommand> , IApplicationMarker
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;

        public DeleteMaterialCommandHandler(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }
        public async Task Handle(DeleteMaterialCommand request, CancellationToken cancellationToken)
        {
            await _materialRepository.DeleteMaterialAsync(request.id);
        }
    }
}
