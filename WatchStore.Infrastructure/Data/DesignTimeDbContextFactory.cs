using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<WatchStoreDbContext>
    {
        public WatchStoreDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<WatchStoreDbContext>();
            optionsBuilder.UseMySql("Server=localhost;Database=watchstoredb;User=root;Password=thewings21092003;", new MySqlServerVersion(new Version(8, 0, 28)));

            return new WatchStoreDbContext(optionsBuilder.Options);
        }
    }
}
