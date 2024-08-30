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
    public class AdminRoleConfiguration : IEntityTypeConfiguration<AdminRole>
    {
        public void Configure(EntityTypeBuilder<AdminRole> builder)
        {
            // Create table
            builder.ToTable("AdminRole");
            
            // Primary key
            builder.HasKey(ar => new {ar.RoleId, ar.AdminId});
         
            // Configure properties
            builder.Property(ar => ar.RoleId)
                   .HasColumnName("RoleId")
                   .IsRequired();

            builder.Property(ar => ar.AdminId)
                   .HasColumnName("AdminId")
                   .IsRequired();

            // 1 - n : Role - AdminRole
            builder.HasOne(ar => ar.Role)
                   .WithMany(r => r.AdminRoles)
                   .HasForeignKey(ar => ar.RoleId)
                   .OnDelete(DeleteBehavior.Cascade);

            // 1 - n : Admin - AdminRole
            builder.HasOne(ar => ar.Admin)
                   .WithMany(a => a.AdminRoles)
                   .HasForeignKey(ar => ar.AdminId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
