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
    internal class BrandConfiguration : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            //Tạo bảng
            builder.ToTable("brand");
            // Khóa chính
            builder.HasKey(b => b.BrandId);

            // Cấu hình các thuộc tính
            builder.Property(b=> b.BrandId)
                   .HasColumnName("brandId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(b => b.BrandName)
                   .HasColumnName("brandName")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(b => b.BrandDescription)
                   .HasColumnName("brandDescription")
                   .HasMaxLength(255);

        }
    }
}
