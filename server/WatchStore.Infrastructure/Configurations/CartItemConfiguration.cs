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
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            // Create table
            builder.ToTable("CartItem");
            
            // Primary key
            builder.HasKey(x => x.CartItemId);
            
            // Configure properties
            builder.Property(c => c.CartItemId)
                   .HasColumnName("CartItemId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.CartId)
                   .HasColumnName("CartId")
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
            // 1 - n : Cart - CartItem
            builder.HasOne(c => c.Cart)
                   .WithMany(c => c.CartItems)
                   .HasConstraintName("FK_Cart_CartItem")
                   .HasForeignKey(c => c.CartId);

            // 1 - n : Product - CartItem
            builder.HasOne(c => c.Product)
                   .WithMany(p => p.Carts)
                   .HasConstraintName("FK_Product_CartItem")
                   .HasForeignKey(c => c.ProductId);
        }
    }
}
