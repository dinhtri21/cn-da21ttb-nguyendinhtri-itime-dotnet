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
    public class ShippingConfiguration : IEntityTypeConfiguration<Shipping>
    {
        public void Configure(EntityTypeBuilder<Shipping> builder)
        {
            // Create table
            builder.ToTable("Shipping");

            // Primary key
            builder.HasKey(s => s.ShippingId);

            // Configure properties
            builder.Property(s => s.ShippingId)
                   .HasColumnName("ShippingId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(s => s.OrderId)
                   .HasColumnName("OrderId")
                   .IsRequired();

            builder.Property(s => s.CarrierId)
                   .HasColumnName("CarrierId")
                   .IsRequired();

            builder.Property(s => s.TrackingNumber)
                   .HasColumnName("TrackingNumber")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(s => s.ShippingStatus)
                   .HasColumnName("ShippingStatus")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(s => s.ShippingFee)
                   .HasColumnName("ShippingFee")
                   .HasColumnType("int")
                   .IsRequired();

            builder.Property(s => s.EstimatedDelivery)
                   .HasColumnName("EstimatedDelivery")
                   .HasColumnType("datetime");

            builder.Property(s => s.AddressLine)
                   .HasColumnName("AddressLine")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(s => s.CreatedAt)
                   .HasColumnName("CreatedAt")
                   .HasColumnType("datetime")
                   .IsRequired()
                   .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure relationships
            // 1 - n : Carrier - Shipping
            builder.HasOne(s => s.Carrier)
                   .WithMany(c => c.Shippings)
                   .HasForeignKey(s => s.CarrierId)
                   .OnDelete(DeleteBehavior.Restrict) 
                   .HasConstraintName("FK_Carrier_Shipping");

            // 1 - 1 : Order - Shipping
            builder.HasOne(s => s.Order) 
                   .WithOne() 
                   .HasForeignKey<Shipping>(s => s.OrderId)  // OrderId is FK in Shipping
                   .OnDelete(DeleteBehavior.Cascade) 
                   .HasConstraintName("FK_Order_Shipping");

        }
    }
}
