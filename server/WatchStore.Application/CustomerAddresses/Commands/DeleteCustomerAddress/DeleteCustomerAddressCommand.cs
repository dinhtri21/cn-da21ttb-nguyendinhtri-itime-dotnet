using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.CustomerAddresses.Commands.DeleteCustomerAddress
{
    public class DeleteCustomerAddressCommand : IRequest<int>

    {
        public int AddressId { get; set; }
        public int CustomerId { get; set; }
        public DeleteCustomerAddressCommand( int addressId, int customerId)
        {
            AddressId = addressId;
            CustomerId = customerId;
        }
    }
}
