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
            // Chuyển đổi CreateCustomerCommand thành Customer entity
            var customer = new Customer
            {
                FullName = request.FullName,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                Email = request.Email
            };

            // Thêm khách hàng vào repository
            await _customerRepository.AddCustomerAsync(customer);

            // Trả về ID của khách hàng mới tạo nếu có
            return customer.CustomerId;
        }
    }
}
