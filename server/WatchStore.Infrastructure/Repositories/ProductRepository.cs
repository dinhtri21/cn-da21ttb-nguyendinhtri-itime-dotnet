using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await _context.Products
                                         .Include(p => p.ProductImages)
                                         .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
            {
                return false;
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync(List<int> brandIds, List<int> materialIds, int skip, int limit, string sortOrder)
        {
            var query = _context.Products.Include(p => p.ProductImages)
                                         .Include(p => p.Brand)
                                         .Include(p => p.Material)
                                         .AsQueryable();

            if (brandIds != null && brandIds.Any())
            {
                query = query.Where(p => brandIds.Contains(p.BrandId));
            }

            if (materialIds != null && materialIds.Any())
            {
                query = query.Where(p => materialIds.Contains(p.MaterialId));
            }

            // Áp dụng sắp xếp theo sortOrder
            switch (sortOrder)
            {
                case "price_asc": // Sắp xếp theo giá tăng dần
                    query = query.OrderBy(p => p.ProductPrice);
                    break;
                case "price_desc": // Sắp xếp theo giá giảm dần
                    query = query.OrderByDescending(p => p.ProductPrice);
                    break;
                //case "date_asc": // Sắp xếp theo ngày tạo cũ nhất
                //    query = query.OrderBy(p => p.CreatedDate);
                //    break;
                //case "date_desc": // Sắp xếp theo ngày tạo mới nhất
                //    query = query.OrderByDescending(p => p.CreatedDate);
                //    break;
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


    }
}
