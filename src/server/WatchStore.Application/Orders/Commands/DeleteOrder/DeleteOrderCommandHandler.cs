using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CancelOrder;

namespace WatchStore.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IProductRepository _productRepository;
        public DeleteOrderCommandHandler(IOrderRepository orderRepository, IGiaoHanhNhanhService giaoHanhNhanhService, 
            IOrderDetailRepository orderDetailRepository, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _orderDetailRepository = orderDetailRepository;
            _productRepository = productRepository;
        }
   

        public async Task Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepository.GetOrderByIdAsync(request.OrderId);

            if (order == null)
            {
                throw new Exception("Order not found");
            }
            if (order.Shipping != null && order.Shipping.TrackingNumber != null)
            {
                var cancelOrderRequest = new CancelOrderRequest { OrderCode = new List<string> { order.Shipping.TrackingNumber } };
                await _giaoHanhNhanhService.CancelOrder(cancelOrderRequest);
            }

            // update quantity of product
            var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(request.OrderId);

            foreach (var orderDetail in orderDetails)
            {
                var product = await _productRepository.GetProductByIdAsync(orderDetail.ProductId);
                product.QuantityInStock += orderDetail.Quantity;
                await _productRepository.UpdateProductAsync(product);
            }

            await _orderRepository.DeleteOrderAsync(request.OrderId);
        }
    }
}
