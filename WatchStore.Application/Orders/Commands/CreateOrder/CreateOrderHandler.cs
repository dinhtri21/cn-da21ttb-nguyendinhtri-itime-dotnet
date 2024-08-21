using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, int>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IPaymentRepository _paymentRepository;

        public CreateOrderHandler(IOrderRepository orderRepository,
            IProductRepository productRepository,
            ICustomerRepository customerRepository,
            IOrderDetailRepository orderDetailRepository,
            IPaymentRepository paymentRepository
            )
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _paymentRepository = paymentRepository;
        }
        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            // Begin transaction
            await _customerRepository.BeginTransactionAsync();
            try
            {
                if (request.CustomerId != null)
                {
                    // Xử lý đặt hàng cho khách đa đăng ký 
                }

                // Add customer
                var customer = new Customer
                {
                    FullName = request.FullName,
                    PhoneNumber = request.PhoneNumber,
                    Address = request.Address,
                    Email = request.Email
                };

                await _customerRepository.AddCustomerAsync(customer);
                await _customerRepository.SaveChangesAsync();

                // Add order
                if (!await _paymentRepository.IsPaymentExitAsync(request.PaymentId))
                {
                    throw new ValidationException($"PaymentId {request.PaymentId} không tồn tại.");
                }

                var order = new Order
                {
                    CustomerId = customer.CustomerId,
                    PaymentId = request.PaymentId,
                    OrderNote = request.OrderNote,
                    OrderDate = DateTime.Now,
                    OrderStatus = "Pending",
                    Total = 0,
                };

                var orderDetails = new List<OrderDetail>();
                foreach (var item in request.OrderDetails)
                {
                    var product = await _productRepository.GetProductByIdAsync(item.ProductId);
                    var unitPrice = product.ProductPrice * item.Quantity;
                    var orderDetail = new OrderDetail
                    {
                        ProductId = product.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = unitPrice
                    };
                    orderDetails.Add(orderDetail);
                }

                order.Total = orderDetails.Sum(od => od.UnitPrice);
                await _orderRepository.AddOrderAsync(order);
                await _orderRepository.SaveChangesAsync();

                // Add order details
                foreach (var orderDetail in orderDetails)
                {
                    orderDetail.OrderId = order.OrderId;
                    await _orderDetailRepository.AddOrderDetailsAsync(orderDetail);
                    await _orderDetailRepository.SaveChangesAsync();
                }

                // Commit transaction
                await _customerRepository.CommitTransactionAsync();

                return order.OrderId;
            }
            catch (ValidationException valEx)
            {
                await _customerRepository.RollbackTransactionAsync();
                throw;
            }
            catch (Exception ex)
            {
                await _customerRepository.RollbackTransactionAsync();
                throw;
            }

        }
    }
}
