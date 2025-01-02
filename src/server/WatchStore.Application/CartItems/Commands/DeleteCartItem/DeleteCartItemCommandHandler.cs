using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CartItems.Commands.DeleteCartItem
{
    public class DeleteCartItemCommandHandler : IRequestHandler<DeleteCartItemCommand, bool>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        public DeleteCartItemCommandHandler(ICartItemRepository cartItemRepository)
        {
            _cartItemRepository = cartItemRepository;
        }
        public async Task<bool> Handle(DeleteCartItemCommand request, CancellationToken cancellationToken)
        {
            return await _cartItemRepository.DeleteCartItemByIdAsync(request.CartItemId);
        }
    }
}
