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

namespace WatchStore.Application.CartItems.Commands.UpdateCartItem
{
    public class UpdateCartItemCommandHandler : IRequestHandler<UpdateCartItemCommand, CartItemDto>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly IMapper _mapper;
        public UpdateCartItemCommandHandler(ICartItemRepository cartItemRepository, IMapper mapper)
        {
            _cartItemRepository = cartItemRepository;
            _mapper = mapper;
        }
        public async Task<CartItemDto> Handle(UpdateCartItemCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var cartItem = await _cartItemRepository.GetCartItemByIdAsync(request.CartItemId);

                if (cartItem == null)
                {
                    throw new Exception("CartItem not found");
                }

                cartItem.Quantity = request.Quantity; 
                cartItem.UnitPrice = cartItem.Product.ProductPrice * request.Quantity;

                await _cartItemRepository.UpdateCartItemAasync(cartItem);

                cartItem = await _cartItemRepository.GetCartItemByIdAsync(request.CartItemId);
                return _mapper.Map<CartItem, CartItemDto>(cartItem);
            }
            catch (Exception ex)
            {
                throw new Exception("Update cart item failed", ex);
            }
        }
    }
}
