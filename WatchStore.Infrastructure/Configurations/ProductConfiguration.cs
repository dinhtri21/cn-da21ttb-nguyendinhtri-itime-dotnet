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
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // Tạo bảng
            builder.ToTable("product");
            // Khóa chính
            builder.HasKey(p => p.ProductId);
            
            // Cấu hình các thuộc tính
            builder.Property(p => p.ProductId)
                   .HasColumnName("productId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.ProductName)
                   .HasColumnName("productName")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(p => p.ProductPrice)
                   .HasColumnName("productPrice")
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(p => p.QuantityInStock)
                   .HasColumnName("quantityInStock")
                   .IsRequired();

            builder.Property(p => p.ProductDescription)
                   .HasColumnName("productDescription")
                   .HasMaxLength(255);

            builder.Property(p => p.BrandId)
                   .HasColumnName("brandId")
                   .IsRequired();

            builder.Property(p => p.MaterialId)
                   .HasColumnName("materialId")
                   .IsRequired();

            // Cấu hình mối quan hệ với Brand
            builder.HasOne(p => p.Brand)
                   .WithMany(b => b.Product)
                   .HasForeignKey(p => p.BrandId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Product_Brand");


            // Cấu hình mối quan hệ với Material
            builder.HasOne(p => p.Material)
                   .WithMany()
                   .HasForeignKey(p => p.MaterialId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Product_Material");

            // Cấu hình mối quan hệ với ProductImage
            builder.HasMany(p => p.ProductImage)
                   .WithOne(pi => pi.Product)
                   .HasForeignKey(pi => pi.ProductId)
                   .OnDelete(DeleteBehavior.Cascade) // Khi xoá sản phẩm thì các ảnh liên quan id cũng bị xoá
                   .HasConstraintName("FK_Product_ProductImage");

            // Cấu hình mối quan hệ với ProductCategory (nhiều-nhiều)
            builder.HasMany(p => p.ProductCategory)
                   .WithOne(pc => pc.Product)
                   .HasForeignKey(pc => pc.ProductId)
                   .OnDelete(DeleteBehavior.Cascade)
                   .HasConstraintName("FK_Product_ProductCategory");
        }

    
    }
}
