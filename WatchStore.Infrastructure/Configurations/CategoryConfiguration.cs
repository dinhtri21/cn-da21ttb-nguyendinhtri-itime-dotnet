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
            // Create table
            builder.ToTable("Category");
            
            // Primary key
            builder.HasKey(c => c.CategoryId);
            
            // Configure properties
            builder.Property(c => c.CategoryId)
                   .HasColumnName("CategoryId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CategoryName)
                   .HasColumnName("CategoryName")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(c => c.CategoryDescription)
                   .HasColumnName("CategoryDescription")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255);
        }

    }
}
