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
    public class AdminConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {
            // Create table
            builder.ToTable("Admin");

            // Primary key
            builder.HasKey(a => a.AdminId);

            // Configure properties
            builder.Property(a => a.AdminId)
                   .HasColumnName("AdminId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(a => a.AdminName)
                   .HasColumnName("AdminName")
                   .HasColumnType("nvarchar(255)")
                   .IsRequired();

            builder.Property(a => a.AdminEmail)
                   .HasColumnName("AdminEmail")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(a => a.AdminPassword)
                   .HasColumnName("AdminPassword")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(a => a.AdminPhone)
                   .HasColumnName("AdminPhone")
                   .HasColumnType("nvarchar(255)")
                   .HasMaxLength(255)
                   .IsRequired();

            builder.Property(a => a.CreatedAt)
                   .HasColumnName("CreatedAt")
                   .HasColumnType("datetime")
                   .IsRequired()
                   .HasDefaultValueSql("CURRENT_TIMESTAMP"); 
        }
    }
}
