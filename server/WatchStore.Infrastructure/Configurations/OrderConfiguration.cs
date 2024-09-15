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
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            // Create table
            builder.ToTable("Order");

            // Primary key
            builder.HasKey(o => o.OrderId);

            // Configure properties
            builder.Property(o => o.OrderId)
                   .HasColumnName("OrderId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();
            
            builder.Property(o => o.OrderDate)
                   .HasColumnName("OrderDate")
                   .IsRequired();

            builder.Property(o => o.OrderStatus)
                   .HasColumnName("OrderStatus")
                   .HasColumnType("nvarchar(50)")
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(o => o.Total)
                   .HasColumnName("Total")
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(o => o.OrderNote)
                   .HasColumnName("OrderNote")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired(); 
            
            // 1 - N : Customer - Orders
            builder.HasOne(o => o.Customer)
                   .WithMany(c => c.Orders)
                   .HasForeignKey(o => o.CustomerId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Order_Customer");

            // 1 - N : Payment - Orders
            builder.HasOne(o => o.Payment) 
                   .WithMany(p => p.Orders)
                   .HasForeignKey(o => o.PaymentId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_Order_Payment");
        }
    }
}
