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
            // Create table
            builder.ToTable("Product");
            // Primary key
            builder.HasKey(p => p.ProductId);
            
            // Configure properties
            builder.Property(p => p.ProductId)
                   .HasColumnName("ProductId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.ProductName)
                   .HasColumnName("ProductName")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(p => p.ProductPrice)
                   .HasColumnName("ProductPrice")
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(p => p.QuantityInStock)
                   .HasColumnName("QuantityInStock")
                   .IsRequired();

            builder.Property(p => p.ProductDescription)
                   .HasColumnName("ProductDescription")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255);

            builder.Property(p => p.BrandId)
                   .HasColumnName("BrandId")
                   .IsRequired();

            builder.Property(p => p.MaterialId)
                   .HasColumnName("MaterialId")
                   .IsRequired();

            builder.Property(p => p.CreatedAt)
                  .HasColumnName("CreatedAt")
                  .HasColumnType("datetime")
                  .IsRequired()
                  .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // 1 - n : Brand - Product
            builder.HasOne(p => p.Brand)
                   .WithMany(b => b.Products)
                   .HasForeignKey(p => p.BrandId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Product_Brand");


            // 1 - n : Material - Product
            builder.HasOne(p => p.Material)
                   .WithMany(m => m.Products)
                   .HasForeignKey(p => p.MaterialId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Product_Material");

            // 1 - n : Product - ProductImage
            builder.HasMany(p => p.ProductImages)
                   .WithOne(pi => pi.Product)
                   .HasForeignKey(pi => pi.ProductId)
                   .OnDelete(DeleteBehavior.Cascade) 
                   .HasConstraintName("FK_Product_ProductImage");
        }
    }
}
