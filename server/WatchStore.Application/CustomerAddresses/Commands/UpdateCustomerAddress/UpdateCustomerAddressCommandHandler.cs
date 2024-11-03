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
        private readonly IBaseRepository _baseRepository;
        public UpdateCustomerAddressCommandHandler(ICustomerAddressRepository customerAddressRepository, IMapper mapper, IBaseRepository baseRepository)
        {
            _customerAddressRepository = customerAddressRepository;
            _mapper = mapper;
            _baseRepository = baseRepository;
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

            var listCustomerAddresses = await _customerAddressRepository.GetCustomerAddressesByCustomerIdAsync(request.CustomerId);

            // Nếu cập nhật default address thì cập nhật lại tất cả các địa chỉ khác của khách hàng là false
            if (request.IsDefault == true && listCustomerAddresses.Count() > 1)
            {
                foreach (var address in listCustomerAddresses)
                {
                    address.IsDefault = false;
                }
                await _baseRepository.SaveChangesAsync();
            }

            if(request.IsDefault == false && listCustomerAddresses.Count() == 1)
            {
                throw new Exception("Chỉ có một địa chỉ thì không được cập nhật mặc định là false");
            }

            customerAddress.IsDefault = request.IsDefault;
            await _customerAddressRepository.UpdateCustomerAddressAsync(customerAddress);

            return _mapper.Map<CustomerAddressDto>(customerAddress);
        }
    }
}
