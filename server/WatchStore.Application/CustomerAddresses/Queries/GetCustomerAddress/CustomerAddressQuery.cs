using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.CustomerAddresses.Queries.GetCustomerAddress
{
    public class CustomerAddressQuery : IRequest<IEnumerable<CustomerAddressDto>>
    {
        public int CustomerId { get; set; }
        public CustomerAddressQuery(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
