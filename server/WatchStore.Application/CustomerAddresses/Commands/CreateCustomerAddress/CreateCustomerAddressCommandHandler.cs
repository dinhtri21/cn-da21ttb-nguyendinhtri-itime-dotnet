using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;


namespace WatchStore.Application.CustomerAddresses.Commands.CreateCustomerAddress
{
    public class CreateCustomerAddressCommandHandler : IRequestHandler<CreateCustomerAddressCommand, CustomerAddressDto>, IApplicationMarker
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CreateCustomerAddressCommandHandler(ICustomerAddressRepository customerAddressRepository, ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<CustomerAddressDto> Handle(CreateCustomerAddressCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(request.CustomerId);

            if (customer == null)
            {
                throw new Exception("Không tìm thấy khách hàng");
            }

            var customerAddress = new CustomerAddress
            {
                CustomerId = request.CustomerId,
                AddressLine = request.AddressLine,
                Province = request.Province,
                District = request.District,
                Ward = request.Ward,
                ZipCode = request.ZipCode
            };

            var result = await _customerAddressRepository.CreateCustomerAddressAsync(customerAddress);

            return _mapper.Map<CustomerAddressDto>(result);
        }
    }
}
