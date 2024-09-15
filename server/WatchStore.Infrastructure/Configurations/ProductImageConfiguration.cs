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
    internal class ProductImageConfiguration : IEntityTypeConfiguration<ProductImage>
    {
        public void Configure(EntityTypeBuilder<ProductImage> builder)
        {
            // Create table
            builder.ToTable("ProductImage");

            // Primary key
            builder.HasKey(pi => pi.ProductImageId);

            // Configure properties
            builder.Property(pi => pi.ProductImageId)
                   .HasColumnName("ProductImageId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(pi => pi.ImageUrl)
                   .HasColumnName("ImageUrl")
                   .HasMaxLength(255)
                   .IsRequired();

           builder.Property(pi => pi.ProductId)
                   .HasColumnName("ProductId")
                   .IsRequired();

            // 1 - n : Product - ProductImage
            builder.HasOne(pi => pi.Product)
                   .WithMany(p => p.ProductImages)
                   .HasForeignKey(pi => pi.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
