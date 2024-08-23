using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepository;
        public DeleteOrderCommandHandler(IOrderRepository orderRepository) { 
            _orderRepository = orderRepository;
        }

        public async Task<bool> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {

            return await _orderRepository.DeleteOrderAsync(request.OrderId);
        }
    }
}
