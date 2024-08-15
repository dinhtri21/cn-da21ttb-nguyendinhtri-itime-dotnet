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
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            // Tên bảng 
            builder.ToTable("Category");
            
            // Khóa chính
            builder.HasKey(c => c.CategoryId);
            
            // Cấu hình các thuộc tính
            builder.Property(c => c.CategoryId)
                   .HasColumnName("categoryId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CategoryName)
                   .HasColumnName("categoryName")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(c => c.CategoryDescription)
                   .HasColumnName("categoryDescription")
                   .HasMaxLength(255);
        }

    }
}
