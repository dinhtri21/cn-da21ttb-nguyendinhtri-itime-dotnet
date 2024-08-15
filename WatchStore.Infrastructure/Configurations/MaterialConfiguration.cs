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
    internal class MaterialConfiguration : IEntityTypeConfiguration<Material>
    {
        public void Configure(EntityTypeBuilder<Material> builder)
        {
            // Tạo bảng
            builder.ToTable("Material");

            // Khóa chính
            builder.HasKey(m => m.MaterialId);

            // Cấu hình các thuộc tính
            builder.Property(m => m.MaterialId)
                   .HasColumnName("materialId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(m => m.MaterialName)
                   .HasMaxLength(255)
                   .IsRequired();
        }
    }
}
