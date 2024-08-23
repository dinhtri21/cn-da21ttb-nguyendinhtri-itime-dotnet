﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WatchStore.Infrastructure.Data;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    [DbContext(typeof(WatchStoreDbContext))]
    partial class WatchStoreDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("WatchStore.Domain.Entities.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("AdminId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("AdminId"));

                    b.Property<string>("AdminEmail")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("AdminEmail");

                    b.Property<string>("AdminName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("AdminName");

                    b.Property<string>("AdminPassword")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("AdminPassword");

                    b.Property<string>("AdminPhone")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("AdminPhone");

                    b.HasKey("AdminId");

                    b.ToTable("Admin", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.AdminRole", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnType("int")
                        .HasColumnName("RoleId");

                    b.Property<int>("AdminId")
                        .HasColumnType("int")
                        .HasColumnName("AdminId");

                    b.HasKey("RoleId", "AdminId");

                    b.HasIndex("AdminId");

                    b.ToTable("AdminRole", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Brand", b =>
                {
                    b.Property<int>("BrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("BrandId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BrandId"));

                    b.Property<string>("BrandDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("BrandDescription");

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("BrandName");

                    b.HasKey("BrandId");

                    b.ToTable("Brand", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CategoryId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("CategoryDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("CategoryDescription");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("CategoryName");

                    b.HasKey("CategoryId");

                    b.ToTable("Category", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("CustomerId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("Address");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("Email");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("FullName");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)")
                        .HasColumnName("PhoneNumber");

                    b.HasKey("CustomerId");

                    b.ToTable("Customer", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Material", b =>
                {
                    b.Property<int>("MaterialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("MaterialId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("MaterialId"));

                    b.Property<string>("MaterialName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("MaterialName");

                    b.HasKey("MaterialId");

                    b.ToTable("Material", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("OrderId"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("int");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime(6)")
                        .HasColumnName("OrderDate");

                    b.Property<string>("OrderNote")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("OrderNote");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("OrderStatus");

                    b.Property<int>("PaymentId")
                        .HasColumnType("int");

                    b.Property<decimal>("Total")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("Total");

                    b.HasKey("OrderId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("PaymentId");

                    b.ToTable("Order", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.OrderDetail", b =>
                {
                    b.Property<int>("OrderDetailId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("OrderDetailId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("OrderDetailId"));

                    b.Property<int>("OrderId")
                        .HasColumnType("int")
                        .HasColumnName("OrderId");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("ProductId");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("Quantity");

                    b.Property<decimal>("UnitPrice")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("UnitPrice");

                    b.HasKey("OrderDetailId");

                    b.HasIndex("OrderId");

                    b.HasIndex("ProductId");

                    b.ToTable("OrderDetail", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Payment", b =>
                {
                    b.Property<int>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("PaymentId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("PaymentId"));

                    b.Property<string>("PaymentName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("PaymentName");

                    b.HasKey("PaymentId");

                    b.ToTable("Payment", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProductId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<int>("BrandId")
                        .HasColumnType("int")
                        .HasColumnName("BrandId");

                    b.Property<int>("MaterialId")
                        .HasColumnType("int")
                        .HasColumnName("MaterialId");

                    b.Property<string>("ProductDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("ProductDescription");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("ProductName");

                    b.Property<decimal>("ProductPrice")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("ProductPrice");

                    b.Property<int>("QuantityInStock")
                        .HasColumnType("int")
                        .HasColumnName("QuantityInStock");

                    b.HasKey("ProductId");

                    b.HasIndex("BrandId");

                    b.HasIndex("MaterialId");

                    b.ToTable("Product", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductCategory", b =>
                {
                    b.Property<int>("ProductCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProductCategoryId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductCategoryId"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("CategoryId");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("ProductId");

                    b.HasKey("ProductCategoryId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductCategory", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductImage", b =>
                {
                    b.Property<int>("ProductImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("ProductImageId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductImageId"));

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("ImageUrl");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("ProductId");

                    b.HasKey("ProductImageId");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductImage", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("RoleId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("RoleName");

                    b.HasKey("RoleId");

                    b.ToTable("Role", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.AdminRole", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Admin", "Admin")
                        .WithMany("AdminRoles")
                        .HasForeignKey("AdminId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchStore.Domain.Entities.Role", "Role")
                        .WithMany("AdminRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Admin");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Order", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Customer", "Customer")
                        .WithMany("Orders")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Order_Customer");

                    b.HasOne("WatchStore.Domain.Entities.Payment", "Payment")
                        .WithMany("Orders")
                        .HasForeignKey("PaymentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Order_Payment");

                    b.Navigation("Customer");

                    b.Navigation("Payment");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.OrderDetail", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Order", "Order")
                        .WithMany("OrderDetails")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_OrderDetail_Order");

                    b.HasOne("WatchStore.Domain.Entities.Product", "Product")
                        .WithMany("OrderDetails")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_OrderDetail_Product");

                    b.Navigation("Order");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Brand", "Brand")
                        .WithMany("Products")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Product_Brand");

                    b.HasOne("WatchStore.Domain.Entities.Material", "Material")
                        .WithMany("Products")
                        .HasForeignKey("MaterialId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Product_Material");

                    b.Navigation("Brand");

                    b.Navigation("Material");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductCategory", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Category", "Category")
                        .WithMany("ProductCategories")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_ProductCategory_Category");

                    b.HasOne("WatchStore.Domain.Entities.Product", "Product")
                        .WithMany("ProductCategories")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_ProductCategory_Product");

                    b.Navigation("Category");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductImage", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Product", "Product")
                        .WithMany("ProductImages")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Product_ProductImage");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Admin", b =>
                {
                    b.Navigation("AdminRoles");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Brand", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Category", b =>
                {
                    b.Navigation("ProductCategories");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Customer", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Material", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Order", b =>
                {
                    b.Navigation("OrderDetails");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Payment", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.Navigation("OrderDetails");

                    b.Navigation("ProductCategories");

                    b.Navigation("ProductImages");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Role", b =>
                {
                    b.Navigation("AdminRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
