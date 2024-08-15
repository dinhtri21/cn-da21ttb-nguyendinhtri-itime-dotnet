﻿// <auto-generated />
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

            modelBuilder.Entity("WatchStore.Domain.Entities.Brand", b =>
                {
                    b.Property<int>("BrandId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("brandId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("BrandId"));

                    b.Property<string>("BrandDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("brandDescription");

                    b.Property<string>("BrandName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("brandName");

                    b.HasKey("BrandId");

                    b.ToTable("brand", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("categoryId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CategoryId"));

                    b.Property<string>("CategoryDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("categoryDescription");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("categoryName");

                    b.HasKey("CategoryId");

                    b.ToTable("Category", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("customerId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CustomerId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("address");

                    b.Property<string>("Email")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasDefaultValue("Unknown")
                        .HasColumnName("email");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasDefaultValue("Unknown")
                        .HasColumnName("fullName");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("varchar(20)")
                        .HasColumnName("phoneNumber");

                    b.HasKey("CustomerId");

                    b.ToTable("Customers", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Material", b =>
                {
                    b.Property<int>("MaterialId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("materialId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("MaterialId"));

                    b.Property<string>("MaterialName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)");

                    b.HasKey("MaterialId");

                    b.ToTable("Material", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("productId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<int>("BrandId")
                        .HasColumnType("int")
                        .HasColumnName("brandId");

                    b.Property<int>("MaterialId")
                        .HasColumnType("int")
                        .HasColumnName("materialId");

                    b.Property<string>("ProductDescription")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("productDescription");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("productName");

                    b.Property<decimal>("ProductPrice")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("productPrice");

                    b.Property<int>("QuantityInStock")
                        .HasColumnType("int")
                        .HasColumnName("quantityInStock");

                    b.HasKey("ProductId");

                    b.HasIndex("BrandId");

                    b.HasIndex("MaterialId");

                    b.ToTable("product", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductCategory", b =>
                {
                    b.Property<int>("ProductCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("productCategoryId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductCategoryId"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int")
                        .HasColumnName("categoryId");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("productId");

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
                        .HasColumnName("productImageId");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ProductImageId"));

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("imageUrl");

                    b.Property<int>("ProductId")
                        .HasColumnType("int")
                        .HasColumnName("productId");

                    b.HasKey("ProductImageId");

                    b.HasIndex("ProductId");

                    b.ToTable("productImage", (string)null);
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Brand", "Brand")
                        .WithMany("Product")
                        .HasForeignKey("BrandId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired()
                        .HasConstraintName("FK_Product_Brand");

                    b.HasOne("WatchStore.Domain.Entities.Material", "Material")
                        .WithMany()
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
                        .WithMany("ProductCategory")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WatchStore.Domain.Entities.Product", "Product")
                        .WithMany("ProductCategory")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Product_ProductCategory");

                    b.Navigation("Category");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.ProductImage", b =>
                {
                    b.HasOne("WatchStore.Domain.Entities.Product", "Product")
                        .WithMany("ProductImage")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Product_ProductImage");

                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Brand", b =>
                {
                    b.Navigation("Product");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Category", b =>
                {
                    b.Navigation("ProductCategory");
                });

            modelBuilder.Entity("WatchStore.Domain.Entities.Product", b =>
                {
                    b.Navigation("ProductCategory");

                    b.Navigation("ProductImage");
                });
#pragma warning restore 612, 618
        }
    }
}
