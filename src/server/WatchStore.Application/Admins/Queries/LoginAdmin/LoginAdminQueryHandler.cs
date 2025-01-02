using AutoMapper;
using MediatR;
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


namespace WatchStore.Application.Admins.Queries.LoginAdmin
{
    public class LoginAdminQueryHandler : IRequestHandler<LoginAdminQuery, LoginAdminDto>, IApplicationMarker
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public LoginAdminQueryHandler(IAdminRepository adminRepository, IConfiguration configuration, IMapper mapper)
        {
            _adminRepository = adminRepository;
            _configuration = configuration;
            _mapper = mapper;
        }
        public async Task<LoginAdminDto> Handle(LoginAdminQuery request, CancellationToken cancellationToken)
        {
            var admin = await _adminRepository.GetAdminByEmailAsync(request.AdminEmail);

            if (admin == null )
            {
                throw new UnauthorizedAccessException("Email chưa đăng ký.");
            }
            // Kiểm tra mật khẩu
            if (!BCrypt.Net.BCrypt.Verify(request.AdminPassword, admin.AdminPassword))
            {
                throw new UnauthorizedAccessException("Email hoặc mật khẩu không đúng.");
            }

            // Lấy danh sách role của admin
            var roles = admin.AdminRoles.Select(ar => ar.Role.RoleName).ToList();

            // Tạo Claims cho các roles
            var roleClaims = roles.Select(role => new Claim(ClaimTypes.Role, role)).ToList();

            // Create Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] // Claim to store
              {
                new Claim(ClaimTypes.Name, admin.AdminId.ToString()),
                new Claim(ClaimTypes.Email, admin.AdminEmail),
              }.Concat(roleClaims)), // Add roles to claim
                Expires = DateTime.UtcNow.AddHours(1), // Time to expire
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature) // Key to sign
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new LoginAdminDto
            {
                Admin = _mapper.Map<AdminDto>(admin),
                AccessToken = tokenString
            };
        }
    }
}
