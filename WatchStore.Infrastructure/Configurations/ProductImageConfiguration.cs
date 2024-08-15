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
            builder.ToTable("productImage");

            // Khóa chính
            builder.HasKey(pi => pi.ProductImageId);

            // Cấu hình các thuộc tính
            builder.Property(pi => pi.ProductImageId)
                   .HasColumnName("productImageId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(pi => pi.ImageUrl)
                   .HasColumnName("imageUrl")
                   .HasMaxLength(255)
                   .IsRequired();

           builder.Property(pi => pi.ProductId)
                   .HasColumnName("productId")
                   .IsRequired();

            // Cấu hình mối quan hệ với Product
            builder.HasOne(pi => pi.Product)
                   .WithMany(p => p.ProductImage)
                   .HasForeignKey(pi => pi.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
