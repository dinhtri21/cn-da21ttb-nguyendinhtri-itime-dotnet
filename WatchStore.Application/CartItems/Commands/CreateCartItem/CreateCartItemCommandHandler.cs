using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.CartItems.Commands.CreateCartItem
{

    public class CreateCartItemCommandHandler : IRequestHandler<CreateCartItemCommand, int>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IProductRepository _productRepository;
        public CreateCartItemCommandHandler(ICartItemRepository cartItemRepository, ICartRepository cartRepository, IProductRepository productRepository)
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
            _productRepository = productRepository;
        }

        public async Task<int> Handle(CreateCartItemCommand request, CancellationToken cancellationToken)
        {
            // Check if cart exist
            var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = request.CustomerId
                };
               await _cartRepository.CreateCartAsync(cart);
            }

            // Check if product exist
            var product = await _productRepository.GetProductByIdAsync(request.ProductId);
            if (product == null)
            {
                throw new ValidationException($"Product {request.ProductId} không tồn tại.");
            }

            // Create cart item
            var cartItem = new CartItem
            {
                CartId = cart.CartId,
                ProductId = request.ProductId,
                Quantity = request.Quantity,
                UnitPrice = product.ProductPrice * request.Quantity
            };

            await _cartItemRepository.CreateCartItemAsync(cartItem);
            return cartItem.CartItemId;
        }
    }
}
