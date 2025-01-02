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

            var customerAddresses = await _customerAddressRepository.GetCustomerAddressesByCustomerIdAsync(request.CustomerId);

            if (customerAddresses != null && customerAddresses.Count() > 0)
            {
                foreach (var address in customerAddresses)
                {
                    if (address.ProvinceId == request.ProvinceId && address.DistrictId == request.DistrictId && address.WardId == request.WardId)
                    {
                        throw new Exception("Địa chỉ đã tồn tại");
                    }
                }
            }

            if(customerAddresses.Count() >= 3   )
            {
                throw new Exception("Bạn chỉ có tối đa 4 địa chỉ !");
            }

            var customerAddress = new CustomerAddress
            {
                CustomerId = request.CustomerId,
                AddressLine = request.AddressLine,
                Province = request.Province,
                ProvinceId = request.ProvinceId,
                District = request.District,
                DistrictId = request.DistrictId,
                Ward = request.Ward,
                WardId = request.WardId,
            };

            // Nếu không có địa chỉ nào thì đặt địa chỉ đó là mặc định
            if (customerAddresses == null || customerAddresses.Count() == 0)
            {
                customerAddress.IsDefault = true;
            }

            var result = await _customerAddressRepository.CreateCustomerAddressAsync(customerAddress);

            return _mapper.Map<CustomerAddressDto>(result);
        }
    }
}
