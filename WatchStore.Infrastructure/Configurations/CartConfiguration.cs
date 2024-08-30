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
            builder.HasKey(x => x.CartId);
            
            // Configure properties
            builder.Property(c => c.CartId)
                   .HasColumnName("CartId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CustomerId)
                   .HasColumnName("CustomerId")
                   .IsRequired();

            builder.Property(c => c.ProductId)
                   .HasColumnName("ProductId")
                   .IsRequired();

            builder.Property(c => c.Quantity)
                   .HasColumnName("Quantity")
                   .IsRequired();

            builder.Property(c => c.UnitPrice)
                   .HasColumnName("UnitPrice")
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            // Configure relationships
            // 1 - n : Customer - Cart
            builder.HasOne(c => c.Customer)
                   .WithMany(c => c.Carts)
                   .HasConstraintName("FK_Cart_Customer")
                   .OnDelete(DeleteBehavior.Cascade)
                   .HasForeignKey(c => c.CustomerId);

            // 1 - n : Product - Cart
            builder.HasOne(c => c.Product)
                   .WithMany(p => p.Carts)
                   .HasConstraintName("FK_Cart_Product")
                   .OnDelete(DeleteBehavior.Cascade)
                   .HasForeignKey(c => c.ProductId);
        }
    }
}
