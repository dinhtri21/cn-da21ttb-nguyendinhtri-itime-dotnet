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
    internal class CustomerAddressConfiguration : IEntityTypeConfiguration<CustomerAddress>
    {
        public void Configure(EntityTypeBuilder<CustomerAddress> builder)
        {
            // Table Name
            builder.ToTable("CustomerAddress");

            // Primary Key
            builder.HasKey(ca => ca.AddressId);

            // Configure properties
            builder.Property(ca => ca.AddressId)
                   .HasColumnName("AddressId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(ca => ca.CustomerId)
                   .HasColumnName("CustomerId")
                   .IsRequired();

            builder.Property(ca => ca.Province)
                   .HasColumnName("Province")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(ca => ca.District)
                   .HasColumnName("District")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(ca => ca.Ward)
                   .HasColumnName("Ward")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(ca => ca.AddressLine)
                   .HasColumnName("AddressLine")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(ca => ca.CreatedAt)
                   .HasColumnName("CreatedAt")
                   .HasColumnType("datetime")
                   .IsRequired()
                   .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure relationships
            // 1 - n : Customer - CustomerAddress
            builder.HasOne(ca => ca.Customer)
                   .WithMany(c => c.CustomerAddresses)
                   .HasConstraintName("FK_Customer_CustomerAddress")
                   .HasForeignKey(ca => ca.CustomerId);

        }
    }
}
