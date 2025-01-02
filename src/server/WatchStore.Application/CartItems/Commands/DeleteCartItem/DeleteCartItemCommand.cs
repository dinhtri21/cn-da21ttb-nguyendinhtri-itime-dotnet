﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.CartItems.Commands.DeleteCartItem
{
    public class DeleteCartItemCommand : IRequest<bool>
    {
        public int CartItemId { get; set; }
    }
}