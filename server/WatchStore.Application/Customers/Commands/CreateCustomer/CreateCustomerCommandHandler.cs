using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.Customers.Commands.CreateCustomer;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Customers.Commands.CreateCustomer
{
    public class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, int>
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;

        public CreateCustomerCommandHandler(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<int> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            var isCustomerExist = await _customerRepository.GetCustomerByEmailAsync(request.Email);

            if (isCustomerExist != null) {
                throw new Exception("Email này đã được đăng ký!");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var customer = new Customer
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Password = hashedPassword
            };

            await _customerRepository.AddCustomerAsync(customer);

            return customer.CustomerId;
        }
    }
}
