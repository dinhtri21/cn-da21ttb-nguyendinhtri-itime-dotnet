using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CustomerAddresses.Commands.UpdateCustomerAddress
{
    public class UpdateCustomerAddressCommandHandler : IRequestHandler<UpdateCustomerAddressCommand, CustomerAddressDto>, IApplicationMarker
    {
        private readonly ICustomerAddressRepository _customerAddressRepository;
        private readonly IMapper _mapper;
        public UpdateCustomerAddressCommandHandler(ICustomerAddressRepository customerAddressRepository, IMapper mapper)
        {
            _customerAddressRepository = customerAddressRepository;
            _mapper = mapper;
        }
        
        public async Task<CustomerAddressDto> Handle(UpdateCustomerAddressCommand request, CancellationToken cancellationToken)
        {
           var customerAddress = await _customerAddressRepository.GetCustomerAddressByIdAsync(request.AddressId);
            if (customerAddress == null)
            {
                throw new Exception("Không tìm thấy địa chỉ");
            }

            customerAddress.AddressLine = request.AddressLine;
            customerAddress.Province = request.Province;
            customerAddress.ProvinceId = request.ProvinceId;
            customerAddress.District = request.District;
            customerAddress.DistrictId = request.DistrictId;
            customerAddress.Ward = request.Ward;
            customerAddress.WardId = request.WardId;
            customerAddress.IsDefault = request.IsDefault;

            await _customerAddressRepository.UpdateCustomerAddressAsync(customerAddress);

            return _mapper.Map<CustomerAddressDto>(customerAddress);
        }
    }
}
