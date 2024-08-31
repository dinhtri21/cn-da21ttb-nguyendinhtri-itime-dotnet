using AutoMapper;
using MediatR;
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

        public GetCartItemsQueryHandler(ICartItemRepository cartItemRepository, ICartRepository cartRepository, IMapper mapper)
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
            _mapper = mapper;
        }
        public async Task<List<CartItemDto>> Handle(GetCartItemsQuery request, CancellationToken cancellationToken)
        {

           var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
            if (cart == null)
              {
                var cartId = await _cartRepository.CreateCartAsync(new Domain.Entities.Cart { CustomerId = request.CustomerId, CreatedDate = DateTime.Now });
                cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
                return new List<CartItemDto>();
           }

            var cartItems = await _cartItemRepository.GetCartItemByCartIdAsync(cart.CartId);
           
            var cartItemDtos = _mapper.Map<List<CartItemDto>>(cartItems);

            return cartItemDtos;
        }
    }
}
