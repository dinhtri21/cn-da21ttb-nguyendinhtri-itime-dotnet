using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CustomerAddresses.Queries.GetCustomerAddress
{
    public class CustomerAddressQueryHandler : IRequestHandler<CustomerAddressQuery, IEnumerable<CustomerAddressDto>>, IApplicationMarker
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IMapper _mapper;
        public CustomerAddressQueryHandler(ICustomerAddressRepository customerAddressRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CustomerAddressDto>> Handle(CustomerAddressQuery request, CancellationToken cancellationToken)
        {
            var customerAddresses = await _customerAddressRepository.GetCustomerAddressesByCustomerIdAsync(request.CustomerId);

            return _mapper.Map<IEnumerable<CustomerAddressDto>>(customerAddresses);
        }


    }

}
