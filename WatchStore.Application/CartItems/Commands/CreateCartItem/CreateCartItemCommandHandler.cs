using AutoMapper;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.CartItems.Commands.CreateCartItem
{

    public class CreateCartItemCommandHandler : IRequestHandler<CreateCartItemCommand, CartItemDto>
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public CreateCartItemCommandHandler(ICartItemRepository cartItemRepository, ICartRepository cartRepository, IProductRepository productRepository, IMapper mapper)
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<CartItemDto> Handle(CreateCartItemCommand request, CancellationToken cancellationToken)
        {
            // Check if cart exists
            var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = request.CustomerId
                };
                await _cartRepository.CreateCartAsync(cart);
            }

            // Check if product exists
            var product = await _productRepository.GetProductByIdAsync(request.ProductId);
            if (product == null)
            {
                throw new ValidationException($"Product {request.ProductId} không tồn tại.");
            }

            // Check if cart item exists
            var cartItemExist = await _cartItemRepository.GetCartItemByProductIdAsync(request.ProductId, cart.CartId);
            if (cartItemExist != null)
            {
                cartItemExist.Quantity += request.Quantity;
                cartItemExist.UnitPrice = product.ProductPrice * cartItemExist.Quantity;
                await _cartItemRepository.UpdateCartItemAasync(cartItemExist);

                return _mapper.Map<CartItem, CartItemDto>(cartItemExist);
            }

            // If not exist, create new cart item
            var cartItem = new CartItem
            {
                CartId = cart.CartId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                UnitPrice = product.ProductPrice * request.Quantity
            };
            await _cartItemRepository.CreateCartItemAsync(cartItem);
            return _mapper.Map<CartItem, CartItemDto>(cartItem);
        }
    }
}
