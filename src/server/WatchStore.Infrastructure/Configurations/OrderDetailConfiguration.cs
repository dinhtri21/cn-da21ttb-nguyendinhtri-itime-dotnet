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
    public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
    {
        public void Configure(EntityTypeBuilder<OrderDetail> builder)
        {
           // Create table
           builder.ToTable("OrderDetail");

           // Primary key
           builder.HasKey(od => od.OrderDetailId);

           // Configure properties
           builder.Property(od => od.OrderDetailId)
                    .HasColumnName("OrderDetailId")
                    .IsRequired()
                    .ValueGeneratedOnAdd();
           
           builder.Property(od => od.OrderId)
                   .HasColumnName("OrderId")
                   .IsRequired();

           builder.Property(od => od.ProductId)
                  .HasColumnName("ProductId")
                  .IsRequired();

           builder.Property(od => od.Quantity)
                  .HasColumnName("Quantity")
                  .IsRequired();

           builder.Property(od => od.UnitPrice)
                  .HasColumnName("UnitPrice")
                  .HasColumnType("decimal(18,2)")
                  .IsRequired();
           

           // 1 - n: Order - OrderDetail
           builder.HasOne(od => od.Order)
                  .WithMany(o => o.OrderDetails)
                  .HasForeignKey(od => od.OrderId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .HasConstraintName("FK_OrderDetail_Order");

            // 1 - n: Product - OrderDetail
            builder.HasOne(od => od.Product)
                   .WithMany(p => p.OrderDetails)
                   .HasForeignKey(od => od.ProductId)
                   .OnDelete(DeleteBehavior.Restrict)
                   .HasConstraintName("FK_OrderDetail_Product");
        }
    }
}
