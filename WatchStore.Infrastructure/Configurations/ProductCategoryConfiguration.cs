using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Infrastructure.Configurations
{
    public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
    {
        public void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            // Cấu hình tên bảng
            builder.ToTable("ProductCategory");

            // Cấu hình khóa chính
            builder.HasKey(pc => pc.ProductCategoryId);        

            // Cấu hình các thuộc tính
            builder.Property(pc => pc.ProductCategoryId)
                   .HasColumnName("productCategoryId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(pc => pc.ProductId)
                   .HasColumnName("productId")
                   .IsRequired();

            builder.Property(pc => pc.CategoryId)
                   .HasColumnName("categoryId")
                   .IsRequired();

            // Cấu hình các khóa ngoại
            builder.HasOne(pc => pc.Product)          // Một nhiều với product
                   .WithMany(p => p.ProductCategory) // assuming Product has ICollection<ProductCategory> ProductCategory
                   .HasForeignKey(pc => pc.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(pc => pc.Category)         // Một nhiều với category
                   .WithMany(c => c.ProductCategory) // assuming Category has ICollection<ProductCategory> ProductCategory
                   .HasForeignKey(pc => pc.CategoryId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
