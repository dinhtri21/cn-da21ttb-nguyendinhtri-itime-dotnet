using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Customers.Queries.LoginCustomer
{
    public class LoginCustomerQuery : IRequest<LoginCustomerDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
       
    }
}
