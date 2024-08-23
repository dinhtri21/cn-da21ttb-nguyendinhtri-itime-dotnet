using Microsoft.EntityFrameworkCore;
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
    public class AdminRepository : IAdminRepository
    {
        private readonly WatchStoreDbContext _context;
        public AdminRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task CreateAdminAsync(Admin admin)
        {
            await _context.Admins.AddAsync(admin);
            await _context.SaveChangesAsync();
        }

        public async Task<Admin> GetAdminByEmailAsync(string email)
        {
           var admin = await _context.Admins.FirstOrDefaultAsync(a => a.AdminEmail == email);
           return admin;
        }
    }
}
