using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.DTOs;
using WatchStore.Application.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        public CustomerService(ICustomerRepository customerRepository, IMapper mapper) { 
            _customerRepository = customerRepository;      
            _mapper = mapper;
        }
        // Tạo Customer
        public async Task CreateCustomerAsync(CustomerDto customerDto)
        {
            var customer = _mapper.Map<Customer>(customerDto);
            await _customerRepository.AddCustomerAsync(customer);
        }
        // Lấy tất cả Customer
        public async Task<IEnumerable<CustomerDto>> GetAllCustomerAsync()
        {
            var customers = await _customerRepository.GetAllCustomerAsync();
            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }
    }
}
