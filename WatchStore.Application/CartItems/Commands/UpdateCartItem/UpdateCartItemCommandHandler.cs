using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CartItems.Commands.UpdateCartItem
{
    public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, bool>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IMapper _mapper;
        public UpdateCartItemCommandHandler(ICartItemRepository cartItemRepository, IMapper mapper)
        {
            _cartItemRepository = cartItemRepository;
            _mapper = mapper;
        }
        public async Task<bool> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var cartItem = await _cartItemRepository.GetCartItemByIdAsync(request.CartItemId);

                if (cartItem == null)
                {
                    throw new Exception("CartItem not found");
                }

                cartItem.Quantity = request.Quantity; // Hoặc sử dụng mappping

                await _cartItemRepository.UpdateCartItemAasync(cartItem);

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Update cart item failed", ex);
            }
        }
    }
}
