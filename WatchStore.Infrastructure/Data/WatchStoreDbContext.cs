using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Configurations;

namespace WatchStore.Infrastructure.Data
{
    public class WatchStoreDbContext : DbContext
    {
        public WatchStoreDbContext(DbContextOptions<WatchStoreDbContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Cấu hình API Fluent
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
        }

        internal async Task ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
