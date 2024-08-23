using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Admins.Commands.CreateAdmin
{
    public class CreateAdminCommandHandler : IRequestHandler<CreateAdminCommand, int>, IApplicationMarker
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IAdminRoleRepository _adminRoleRepository;
        private readonly IBaseRepository _baseRepository;
        public CreateAdminCommandHandler(IAdminRepository adminRepository, IAdminRoleRepository adminRoleRepository, IBaseRepository baseRepository)
        {
            _adminRepository = adminRepository;
            _adminRoleRepository = adminRoleRepository;
            _baseRepository = baseRepository;
        }
        public async Task<int> Handle(CreateAdminCommand request, CancellationToken cancellationToken)
        {
            await _baseRepository.BeginTransactionAsync();
            try
            {
                var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.AdminPassword);

                var admin = new Admin
                {
                    AdminName = request.AdminName,
                    AdminPhone = request.AdminPhone,
                    AdminEmail = request.AdminEmail,
                    AdminPassword = hashedPassword
                };

                await _adminRepository.CreateAdminAsync(admin);

                foreach (var roleId in request.RoleIds)
                {
                    var adminRole = new AdminRole
                    {
                        AdminId = admin.AdminId,
                        RoleId = roleId
                    };
                    await _adminRoleRepository.CreateAdminRoleAsync(adminRole);
                }

                await _baseRepository.CommitTransactionAsync();
                return admin.AdminId;
            }
            catch (Exception)
            {
                await _baseRepository.RollbackTransactionAsync();
                throw;
            }

        }
    }
}
