﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommand : IRequest<bool>
    {
        public int OrderId { get; set; }
        public DeleteOrderCommand (int orderId)
        {
            OrderId = orderId;
        }   
    }
}
