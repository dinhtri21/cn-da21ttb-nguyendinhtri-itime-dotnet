using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CreateOrder;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IOrderDetailRepository _orderDetailRepository;
        private readonly IPaymentRepository _paymentRepository;
        private readonly IBaseRepository _baseRepository;
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IGiaoHanhNhanhService _ghnService;
        private readonly IShippingRepository _shippingRepository;
        private readonly ICartItemRepository _cartItemRepository;
        private readonly ICartRepository _cartRepository;
        public CreateOrderCommandHandler(IOrderRepository orderRepository,
            IProductRepository productRepository,
            ICustomerRepository customerRepository,
            IOrderDetailRepository orderDetailRepository,
            IPaymentRepository paymentRepository,
            IBaseRepository baseRepository,
            ICustomerAddressRepository customerAddressRepository,
            IGiaoHanhNhanhService ghnService,
            IShippingRepository shippingRepository,
            ICartRepository cartRepository,
            ICartItemRepository cartItemRepository
            )
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _customerRepository = customerRepository;
            _orderDetailRepository = orderDetailRepository;
            _paymentRepository = paymentRepository;
            _baseRepository = baseRepository;
            _customerAddressRepository = customerAddressRepository;
            _ghnService = ghnService;
            _shippingRepository = shippingRepository;
            _cartItemRepository = cartItemRepository;
            _cartRepository = cartRepository;
        }
        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            // Begin transaction
            await _baseRepository.BeginTransactionAsync();
            try
            {
                // Get customer, customer address, payment
                var customer = await _customerRepository.GetCustomerByIdAsync(request.CustomerId);
                var customerAddress = await _customerAddressRepository.GetCustomerAddressByIdAsync(request.CustomerAddressId);

                if (customer == null)
                {
                    throw new ValidationException($"CustomerId {request.CustomerId} không tồn tại.");
                }

                if (!await _paymentRepository.IsPaymentExitAsync(request.PaymentId))
                {
                    throw new ValidationException($"PaymentId {request.PaymentId} không tồn tại.");
                }

                // GHN fee
                var res = await _ghnService.GetServiceAsync(new GetServiceRequest() { ShopID = 1, FromDistrict = 1560, ToDistrict = customerAddress.DistrictId });
                var service = res.Data.FirstOrDefault(x => x.ShortName == "Hàng nhẹ");
                if (service == null)
                {
                    service = res.Data[0];
                }
                var calculateFeeRequest = new CalculateFeeRequest
                {
                    ServiceId = service.ServiceID,
                    ServiceTypeId = service.ServiceTypeID,
                    ToDistrictId = customerAddress.DistrictId,
                    ToWardCode = customerAddress.WardId.ToString(),
                    Height = 10,
                    Length = 10,
                    Weight = 2000,
                    Width = 10
                };
                var calculateFeeResponse = await _ghnService.CalculateFeeAsync(calculateFeeRequest);

                // Add order
                var order = new Order
                {
                    CustomerId = customer.CustomerId,
                    PaymentId = request.PaymentId,
                    CreatedAt = DateTime.Now,
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
                //order.Total = order.Total + calculateFeeResponse.Data.Total;
                await _orderRepository.AddOrderAsync(order);

                // Add order details
                foreach (var orderDetail in orderDetails)
                {
                    orderDetail.OrderId = order.OrderId;
                    await _orderDetailRepository.AddOrderDetailsAsync(orderDetail);
                }

                // GHN Order
                var createOrderRequest = new CreateOrderRequest
                {
                    PaymentTypeId = 2,
                    RequiredNote = "CHOXEMHANGKHONGTHU",
                    FromName = "iTime",
                    FromAddress = "Phường 5, TP Trà Vinh, Trà Vinh, Vietnam",
                    ToName = customer.FullName,
                    ToPhone = customer.PhoneNumber,
                    ToAddress = customerAddress.Province + ", " + customerAddress.District + ", " + customerAddress.Ward,
                    ToWardCode = customerAddress.WardId.ToString(),
                    ToDistrictId = customerAddress.DistrictId,
                    CodAmount = (int)order.Total + calculateFeeResponse.Data.Total,
                    Weight = 1000,
                    Length = 10,
                    Width = 10,
                    Height = 10,
                    ServiceId = service.ServiceID,
                    ServiceTypeId = service.ServiceTypeID,
                    Items = orderDetails.Select(od => new OrderGHNItem
                    {
                        Name = od.Product.ProductName,
                        Quantity = od.Quantity,
                        Weight = 10,
                        Length = 10,
                        Width = 10,
                        Height = 10,
                        Category = new CategoryGHN { Level1 = "Watch" }
                    }).ToList()

                };

                var createOrderResponse = await _ghnService.CreateOrderAsync(createOrderRequest);

                // Save shippingdb
                var shipping = await _shippingRepository.CreateShippingAsync(new Shipping
                {
                    CarrierId = 1,
                    OrderId = order.OrderId,
                    TrackingNumber = createOrderResponse.Data.OrderCode,
                    ShippingStatus = "picking",
                    ShippingFee = createOrderResponse.Data.TotalFee,
                    EstimatedDelivery = createOrderResponse.Data.ExpectedDeliveryTime,
                    AddressLine = createOrderRequest.ToAddress
                });

                // Delete cart item
                var cart = await _cartRepository.GetCartByIdCutomerAsync(request.CustomerId);
                await _cartItemRepository.DeleteAllCartItemByCartIdAsync(cart.CartId);

                // Update QuantityInStock of product
                foreach (var orderDetail in orderDetails)
                {
                    var product = await _productRepository.GetProductByIdAsync(orderDetail.ProductId);
                    product.QuantityInStock -= orderDetail.Quantity;
                    await _productRepository.UpdateProductAsync(product);
                }

                // Commit transaction
                await _baseRepository.CommitTransactionAsync();

                //return Convert.ToInt32(createOrderResponse.Data.OrderCode);
                return order.OrderId;
            }
            catch (ValidationException valEx)
            {
                await _baseRepository.RollbackTransactionAsync();
                throw;
            }
            catch (Exception ex)
            {
                await _baseRepository.RollbackTransactionAsync();
                throw;
            }

        }
    }
}
