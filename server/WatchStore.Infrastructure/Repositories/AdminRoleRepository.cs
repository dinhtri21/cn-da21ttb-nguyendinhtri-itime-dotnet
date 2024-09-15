using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;

namespace WatchStore.Infrastructure.Repositories
{
    public class AdminRoleRepository : IAdminRoleRepository
    {
        private readonly WatchStoreDbContext _context;
        public AdminRoleRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task CreateAdminRoleAsync(AdminRole adminRole)
        {
            await _context.AdminRoles.AddAsync(adminRole);
            await _context.SaveChangesAsync();
        }
    }
}
