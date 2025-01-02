using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class LoginCustomerDto
    {
        public string Token { get; set; }
        public CustomerDto Customer { get; set; }
    }
}
