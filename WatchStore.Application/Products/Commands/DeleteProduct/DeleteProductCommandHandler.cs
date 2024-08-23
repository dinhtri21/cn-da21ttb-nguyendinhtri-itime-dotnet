using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, bool>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;

        public DeleteProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            return _productRepository.DeleteProductAsync(request.ProductId);
        }
    }
}
