using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CustomerAddresses.Commands.CreateCustomerAddress
{
    public class CreateCustomerAddressCommand : IRequest<CustomerAddressDto>
    {
        public int CustomerId { get; set; }
        public string AddressLine { get; set; }
        public string Ward { get; set; }
        public string District { get; set; }
        public string Province { get; set; }
        public bool IsDefault { get; set; }
    }
}
