using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CustomerAddresses.Commands.DeleteCustomerAddress
{
    public class DeleteCustomerAddressCommandHandler : IRequestHandler<DeleteCustomerAddressCommand, int>, IApplicationMarker
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        public DeleteCustomerAddressCommandHandler(ICustomerAddressRepository customerAddressRepository)
        {
            _customerAddressRepository = customerAddressRepository;
        }
        public async Task<int> Handle(DeleteCustomerAddressCommand request, CancellationToken cancellationToken)
        {
            var addRess = await _customerAddressRepository.GetCustomerAddressByIdAsync(request.AddressId);

            if (addRess.CustomerId != request.CustomerId)
            {
                throw new UnauthorizedAccessException("Bạn không có quyền truy cập tài nguyên này!");
            }

            var AddressId = _customerAddressRepository.DeleteCustomerAddressById(request.AddressId);
            return await AddressId;
        }
    }
}
