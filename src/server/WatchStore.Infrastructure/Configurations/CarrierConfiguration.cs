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
    public class CarrierConfiguration : IEntityTypeConfiguration<Carrier>
    {
        public void Configure(EntityTypeBuilder<Carrier> builder)
        {
            // Create table
            builder.ToTable("Carrier");

            // Primary key
            builder.HasKey(c => c.CarrierId);

            // Configure properties
            builder.Property(c => c.CarrierId)
                   .HasColumnName("CarrierId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CarrierName)
                   .HasColumnName("CarrierName")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(c => c.Website)
                   .HasColumnName("Website")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired()
                   .HasMaxLength(255);


        }
    }
}
