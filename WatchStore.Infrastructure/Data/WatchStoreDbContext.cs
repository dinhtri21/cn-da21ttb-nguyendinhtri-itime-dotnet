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
       public WatchStoreDbContext()
        {

        }
        public WatchStoreDbContext(DbContextOptions<WatchStoreDbContext> options) : base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Brand> Brand { get; set; }
        public DbSet<Category> Categorie { get; set; }
        public DbSet<Material> Material { get; set; }
        public DbSet<ProductImage> ProductImage { get; set; }
        public DbSet<ProductCategory> ProductCategory { get; set; }
      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Cấu hình API Fluent
            modelBuilder.ApplyConfiguration(new CustomerConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryConfiguration());
            modelBuilder.ApplyConfiguration(new BrandConfiguration());
            modelBuilder.ApplyConfiguration(new MaterialConfiguration());
            modelBuilder.ApplyConfiguration(new ProductImageConfiguration());
            modelBuilder.ApplyConfiguration(new ProductCategoryConfiguration());
        }

        internal async Task ToListAsync()
        {
            throw new NotImplementedException();
        }
    }
}
