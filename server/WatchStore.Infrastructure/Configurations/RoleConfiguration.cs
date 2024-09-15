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
    internal class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            // Create table
            builder.ToTable("Role");

            // Primary key
            builder.HasKey(r => r.RoleId);

            // Configure properties
            builder.Property(r => r.RoleId)
                   .HasColumnName("RoleId")
                   .IsRequired()
                   .ValueGeneratedOnAdd();

            builder.Property(r => r.RoleName)
                    .HasColumnName("RoleName")
                    .HasColumnType("nvarchar(255)")
                    .IsRequired();
        }
    }
}
