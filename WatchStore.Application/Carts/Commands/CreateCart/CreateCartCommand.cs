using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Carts.Commands.CreateCart
{
    public class CreateCartCommand : IRequest<int>
    {
        public int CustomerId { get; set;}
        public CreateCartCommand(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
