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
    public class CartConfiguration : IEntityTypeConfiguration<Cart>
    {
        public void Configure(EntityTypeBuilder<Cart> builder)
        {
            // Create table
            builder.ToTable("Cart");

            // Primary key
            builder.HasKey(c => c.CartId);

            // Configure properties
            builder.Property(c => c.CartId)
                   .HasColumnName("CartId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CustomerId)
                   .HasColumnName("CustomerId")
                   .IsRequired();

            builder.HasIndex(c => c.CustomerId)
                   .IsUnique()
                   .HasDatabaseName("IX_Cart_CustomerId");

            builder.Property(c => c.CreatedAt)
                    .HasColumnName("CreatedAt")
                    .HasColumnType("datetime")
                    .IsRequired()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Configure relationships
            // 1 - n : Customer - Cart
            builder.HasOne(c => c.Customer)
                   .WithMany(c => c.Carts)
                   .HasConstraintName("FK_Customer_Cart")
                   .HasForeignKey(c => c.CustomerId);
        }
    }
}
