﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderCommand : IRequest<int>
    {
        // Customer
        public int CustomerId { get; set; }
        public int CustomerAddressId { get; set; }
        // Order
        public int PaymentId { get; set; }
        // OrderDetail
        public List<OrderItem> OrderDetails { get; set; }
    }
    public class OrderItem
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
