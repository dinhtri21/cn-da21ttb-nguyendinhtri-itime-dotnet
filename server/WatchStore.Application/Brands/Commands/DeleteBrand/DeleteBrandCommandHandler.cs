using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Brands.Commands.DeleteBrand
{
    public class DeleteBrandCommandHandler : IRequestHandler<DeleteBrandCommand>, IApplicationMarker
    {
        private readonly IBrandRepository _brandRepository;
        public DeleteBrandCommandHandler(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }
        public async Task Handle(DeleteBrandCommand request, CancellationToken cancellationToken)
        {
            
            await _brandRepository.DeleteBrandAsync(request.BrandId);
        }
    }
}
