using AutoMapper;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Customers.Queries.LoginCustomer
{
    public class LoginCustomerQueryHandler : IRequestHandler<LoginCustomerQuery, LoginCustomerDto>, IApplicationMarker
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public LoginCustomerQueryHandler(ICustomerRepository customerRepository, IConfiguration configuration, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<LoginCustomerDto> Handle(LoginCustomerQuery request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepository.GetCustomerByEmailAsync(request.Email);

            if (customer == null)
            {
                throw new ValidationException("Email hoặc mật khẩu không đúng");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, customer.Password))
            {
                throw new ValidationException("Email hoặc mật khẩu không đúng");
            }

            //Create Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, customer.CustomerId.ToString()),
                    new Claim(ClaimTypes.Email, customer.Email),
                    new Claim(ClaimTypes.Role, "Customer")
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new LoginCustomerDto
            {
                Token = tokenString,
                Customer = _mapper.Map<CustomerDto>(customer)
            };
        }
    }
}
