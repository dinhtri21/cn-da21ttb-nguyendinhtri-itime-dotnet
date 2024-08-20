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
    public class ProductCategoryConfiguration : IEntityTypeConfiguration<ProductCategory>
    {
        public void Configure(EntityTypeBuilder<ProductCategory> builder)
        {
            // Create table
            builder.ToTable("ProductCategory");

            // Primary key
            builder.HasKey(pc => pc.ProductCategoryId);        

            // Configure properties
            builder.Property(pc => pc.ProductCategoryId)
                   .HasColumnName("ProductCategoryId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();
                   
            builder.Property(pc => pc.ProductId)
                   .HasColumnName("ProductId")
                   .IsRequired();

            builder.Property(pc => pc.CategoryId)
                   .HasColumnName("CategoryId")
                   .IsRequired();
            
            // 1 - n : Product - ProductCategory
            builder.HasOne(pc => pc.Product)        
                   .WithMany(p => p.ProductCategories) 
                   .HasForeignKey(pc => pc.ProductId)
                   .HasConstraintName("FK_ProductCategory_Product")
                   .OnDelete(DeleteBehavior.Cascade);

            // 1 - n : Category - ProductCategory
            builder.HasOne(pc => pc.Category)         
                   .WithMany(c => c.ProductCategories)
                   .HasConstraintName("FK_ProductCategory_Category")
                   .HasForeignKey(pc => pc.CategoryId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
