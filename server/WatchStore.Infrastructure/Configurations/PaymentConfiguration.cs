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
    internal class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            // Create table
            builder.ToTable("Payment");

            // Primary key
            builder.HasKey(p => p.PaymentId);

            // Configure properties
            builder.Property(p => p.PaymentId)
                   .HasColumnName("PaymentId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.PaymentName)
                   .HasColumnName("PaymentName")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();
        }
    }
}
