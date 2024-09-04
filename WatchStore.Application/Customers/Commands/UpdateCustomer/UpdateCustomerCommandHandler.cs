using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Customers.Commands.UpdateCustomer
{
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, bool>
    {
        private readonly ICustomerRepository _customerRepository;

        public UpdateCustomerCommandHandler(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public async Task<bool> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepository.GetCustomerByIdAsync(request.CustomerId);

            if(customer == null)
            {
                throw new Exception("Customer not found");
            }

            // Cập nhật các thuộc tính của khách hàng
            customer.FullName = request.FullName;
            customer.PhoneNumber = request.PhoneNumber;
            customer.Address = request.Address;
            customer.Email = request.Email;

            // Nếu password có được cung cấp, cập nhật password mới sau khi đã hash
            if (!string.IsNullOrEmpty(request.Password))
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
                customer.Password = hashedPassword;
            }

            await _customerRepository.UpdateCustomerAsync(customer);
            return true;
        }
    }
}

