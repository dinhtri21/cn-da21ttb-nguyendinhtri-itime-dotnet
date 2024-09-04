using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Customers.Queries.LoginCustomer
{
    public class LoginCustomerQuery : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
       
    }
}
