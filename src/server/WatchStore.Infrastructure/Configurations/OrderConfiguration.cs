﻿using Microsoft.EntityFrameworkCore;
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

            builder.Property(o => o.CreatedAt)
                   .HasColumnName("CreatedAt")
                   .HasColumnType("datetime")
                   .IsRequired()
                   .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(o => o.Total)
                   .HasColumnName("Total")
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(o => o.Status)
                   .HasColumnName("Status")
                   .HasMaxLength(50)
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

            // 1 - 1 : Shipping - Orders
            builder.HasOne(o => o.Shipping)
                   .WithOne(s => s.Order)
                   .HasForeignKey<Shipping>(s => s.OrderId)
                   .OnDelete(DeleteBehavior.Cascade)
                   .HasConstraintName("FK_Order_Shipping");
        }
    }
}
