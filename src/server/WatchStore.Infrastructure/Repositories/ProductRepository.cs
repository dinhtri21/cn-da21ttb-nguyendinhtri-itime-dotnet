﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;

namespace WatchStore.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly WatchStoreDbContext _context;
        public ProductRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task<Product> AddProductAsync(Product product)
        {
            _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public async Task<List<Product>> AddListProductsAsync(List<Product> products)
        {
            await _context.Products.AddRangeAsync(products); 
            await _context.SaveChangesAsync();
            return products; 
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await _context.Products
                                         .Include(p => p.ProductImages)
                                         .Include(p => p.OrderDetails)
                                         .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
            {
                return false;
            }

            if (product.OrderDetails.Any())
            {
                throw new InvalidOperationException("Không thể xóa sản phẩm đã được đặt hàng.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Product>?> GetAllProductsAsync()
        {
            return await _context.Products.Include(p => p.ProductImages)
                                          .Include(p => p.Brand)
                                          .Include(p => p.Material)
                                          .ToListAsync();
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(List<int> brandIds, List<int> materialIds, int skip,
            int limit, string sortOrder, Dictionary<string, string> filters, string search)
        {
            var query = _context.Products.Include(p => p.ProductImages)
                                         .Include(p => p.Brand)
                                         .Include(p => p.Material)
                                         .AsQueryable();

            // Lọc theo brand và material 
            if (brandIds != null && brandIds.Any())
            {
                query = query.Where(p => brandIds.Contains(p.BrandId));
            }

            if (materialIds != null && materialIds.Any())
            {
                query = query.Where(p => materialIds.Contains(p.MaterialId));
            }

            // Lọc theo từng trường 
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    var filterValue = filter.Value;

                    if (filterValue.StartsWith("\"") && filterValue.EndsWith("\""))
                    {
                        filterValue = filterValue.Trim('"');
                        query = query.Where($"{filter.Key}.Contains(@0)", filterValue);
                    }
                    else
                    {
                        query = query.Where($"{filter.Key} == @0", filterValue);
                    }
                }
            }

            // Tìm kiếm theo từ khóa
            if (!string.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                query = query.Where(p =>
                    p.ProductName.ToLower().Contains(search) ||
                    p.ProductDescription.ToLower().Contains(search) ||
                    p.Brand.BrandName.ToLower().Contains(search) ||
                    p.Material.MaterialName.ToLower().Contains(search));
            }

            // Sắp xếp
            switch (sortOrder)
            {
                case "price_asc": // Sắp xếp theo giá tăng dần
                    query = query.OrderBy(p => p.ProductPrice);
                    break;
                case "price_desc": // Sắp xếp theo giá giảm dần
                    query = query.OrderByDescending(p => p.ProductPrice);
                    break;
                case "date_asc": // Sắp xếp theo ngày tạo cũ nhất
                    query = query.OrderBy(p => p.CreatedAt);
                    break;
                case "date_desc": // Sắp xếp theo ngày tạo mới nhất
                    query = query.OrderByDescending(p => p.CreatedAt);
                    break;
                default: // Nếu không có sortOrder, mặc định không sắp xếp
                    query = query.OrderBy(p => p.ProductId);
                    break;
            }

            return await query.Skip(skip * limit)
                              .Take(limit)
                              .ToListAsync();
        }

        public async Task<int> GetTotalProductCountAsync(List<int>? brandIds = null, List<int>? materialIds = null, int? month = null, int? year = null)
        {
            var query = _context.Products.AsQueryable();

            // Lọc theo tháng và năm nếu có
            if (month.HasValue && year.HasValue)
            {
                query = query.Where(p => p.CreatedAt.Month == month.Value && p.CreatedAt.Year == year.Value);
            }
            else if (month.HasValue)
            {
                throw new ArgumentException("Vui lòng cung cấp cả năm nếu lọc theo tháng.");
            }
            else if (year.HasValue)
            {
                query = query.Where(p => p.CreatedAt.Year == year.Value);
            }

            // Lọc theo brandIds nếu có
            if (brandIds != null && brandIds.Any())
            {
                query = query.Where(p => brandIds.Contains(p.BrandId));
            }

            // Lọc theo materialIds nếu có
            if (materialIds != null && materialIds.Any())
            {
                query = query.Where(p => materialIds.Contains(p.MaterialId));
            }

            return await query.CountAsync();
        }
        public async Task<Product> GetProductByIdAsync(int productId)
        {
            var product = await _context.Products
                                  .Include(p => p.ProductImages)
                                  .Include(p => p.Brand)
                                  .Include(p => p.Material)
                                  .FirstOrDefaultAsync(p => p.ProductId == productId);
            return product;
        }

        public async Task<List<Product>> GetRandomProductsAsync(int limit)
        {
            return await _context.Products
                 .FromSqlRaw("SELECT * FROM product ORDER BY RAND() LIMIT {0}", limit)
                .Include(p => p.ProductImages)
                .Include(p => p.Brand)
                .Include(p => p.Material)
                .Take(limit)                 
                .ToListAsync();              
        }

        public async Task<bool> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsBrandExistsAsync(int brandId)
        {
            return await _context.Brands.AnyAsync(b => b.BrandId == brandId);
        }

        public async Task<bool> IsMaterialExistsAsync(int materialId)
        {
            return await _context.Materials.AnyAsync(m => m.MaterialId == materialId);
        }

        public async Task<Product?> GetProductByNameAsync(string productName)
        {
            return await _context.Products.FirstOrDefaultAsync(p => p.ProductName == productName);
        }
    }
}
