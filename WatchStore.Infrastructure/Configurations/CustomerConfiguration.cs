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
            builder.ToTable("Customers");
            builder.HasKey(c => c.CustomerId);
            builder.Property(c => c.CustomerId).HasColumnName("customerId").IsRequired().ValueGeneratedOnAdd();
            builder.Property(c => c.FullName).HasColumnName("fullName").HasMaxLength(255);
            builder.Property(c => c.PhoneNumber).HasColumnName("phoneNumber").HasMaxLength(255);
            builder.Property(c => c.Email).HasColumnName("email").HasMaxLength(255);
            builder.Property(c => c.Address).HasColumnName("address").HasMaxLength(255);
        }
    }
}
