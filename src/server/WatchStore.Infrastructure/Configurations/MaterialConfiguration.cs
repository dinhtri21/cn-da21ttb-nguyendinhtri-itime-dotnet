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
            // Create table
            builder.ToTable("Material");

            // Primary key
            builder.HasKey(m => m.MaterialId);

            // Configure properties
            builder.Property(m => m.MaterialId)
                   .HasColumnName("MaterialId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(m => m.MaterialName)
                   .HasColumnName("MaterialName")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();
        }
    }
}
