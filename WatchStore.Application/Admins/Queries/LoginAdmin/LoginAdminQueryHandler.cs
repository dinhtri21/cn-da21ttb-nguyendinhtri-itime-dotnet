using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Admins.Queries.LoginAdmin
{
    public class LoginAdminQueryHandler : IRequestHandler<LoginAdminQuery, string>, IApplicationMarker
    {
        private readonly IAdminRepository _adminRepository;
        public LoginAdminQueryHandler(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public async Task<string> Handle(LoginAdminQuery request, CancellationToken cancellationToken)
        {
            var admin = await _adminRepository.GetAdminByEmailAsync(request.AdminEmail);
            if (admin == null )
            {
                throw new UnauthorizedAccessException("Email không tồn tại!");
            }
            if (!BCrypt.Net.BCrypt.Verify(request.AdminPassword, admin.AdminPassword))
            {
                throw new UnauthorizedAccessException("Email hoặc mật khẩu không đúng.");
            }

            // Tạo token hoặc xử lý đăng nhập thành công
            return "Đăng nhập thành công!";
        }
    }
}
