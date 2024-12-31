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
            // Create table
            builder.ToTable("Brand");
            // Primary key
            builder.HasKey(b => b.BrandId);

            // Configure properties
            builder.Property(b=> b.BrandId)
                   .HasColumnName("BrandId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(b => b.BrandName)
                   .HasColumnName("BrandName")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(b => b.BrandDescription)
                   .HasColumnName("BrandDescription")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255);

            builder.Property(b => b.BrandImageUrl)
                   .HasColumnName("BrandImageUrl")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255);

        }
    }
}
