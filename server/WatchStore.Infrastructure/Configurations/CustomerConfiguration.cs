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
    internal class CustomerConfiguration : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            // Create table
            builder.ToTable("Customer");

            // Primary key
            builder.HasKey(c => c.CustomerId);

            // Configure properties
            builder.Property(c => c.CustomerId)
                   .HasColumnName("CustomerId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.FullName)
                   .HasColumnName("FullName")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired()
                   .HasMaxLength(255);

            builder.Property(c => c.PhoneNumber)
                   .IsRequired()
                   .HasColumnName("PhoneNumber")
                   .HasMaxLength(20);

            builder.Property(c => c.Email)
                   .IsRequired()
                   .HasColumnName("Email")
                   .HasMaxLength(255);

            builder.Property(c => c.Password)
                   .IsRequired()
                   .HasColumnName("Password")
                   .HasMaxLength(255);

            builder.Property(c => c.Address)
                   .HasColumnName("Address")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired()
                   .HasMaxLength(255);

            // Add unique constraints
            builder.HasIndex(c => c.Email).IsUnique();
            builder.HasIndex(c => c.PhoneNumber).IsUnique();
        }
    }
}
