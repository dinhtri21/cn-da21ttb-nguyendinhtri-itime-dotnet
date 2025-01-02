using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CartItems.Queries.GetCartItemsCount
{
    public class GetCartItemsCountQueryHandler : IRequestHandler<GetCartItemsCountQuery, int>, IApplicationMarker
    {
        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        public GetCartItemsCountQueryHandler(ICartItemRepository cartItemRepository, ICartRepository cartRepository)
        {
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
        }
        public async Task<int> Handle(GetCartItemsCountQuery request, CancellationToken cancellationToken)
        {
            var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
            if (cart == null)
            {
                return 0;
            }
            var cartItemsCount = await _cartItemRepository.GetCartItemCountByIdAsync(cart.CartId);
            return cartItemsCount;


        }
    }
}
