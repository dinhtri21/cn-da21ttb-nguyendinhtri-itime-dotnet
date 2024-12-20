using AutoMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CartItems.Queries.GetCartItems
{
    public class GetCartItemsQueryHandler : IRequestHandler<GetCartItemsQuery, List<CartItemDto>>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public GetCartItemsQueryHandler(ICartItemRepository cartItemRepository, ICartRepository cartRepository, IMapper mapper, IConfiguration configuration)
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
            _mapper = mapper;
            _configuration = configuration;
        }
        public async Task<List<CartItemDto>> Handle(GetCartItemsQuery request, CancellationToken cancellationToken)
        {
            var baseUrl = _configuration["BaseUrl"];
            var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
            if (cart == null)
              {
                var cartId = await _cartRepository.CreateCartAsync(new Domain.Entities.Cart { CustomerId = request.CustomerId });
                cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
                return new List<CartItemDto>();
           }

            var cartItems = await _cartItemRepository.GetCartItemByCartIdAsync(cart.CartId);
           
            var cartItemDtos = _mapper.Map<List<CartItemDto>>(cartItems);

            foreach (var cartItemDto in cartItemDtos)
            {
                cartItemDto.Product.ImageUrls = cartItemDto.Product.ImageUrls.Select(x => $"{baseUrl}{x}").ToList();
            }

            return cartItemDtos;
        }
    }
}
