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
    public class ProductRepository : BaseRepository, IProductRepository
    {
        private readonly WatchStoreDbContext _context;
        public ProductRepository(WatchStoreDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await SaveChangesAsync();
        }

        public async Task<bool> DeleteProductAsync(int productId)
        {
            var product = await  _context.Products
                                         .Include(p => p.ProductImages)
                                         .FirstOrDefaultAsync(p => p.ProductId == productId);
            if (product == null)
            {
                return false; 
            }
            _context.Products.Remove(product);
            await SaveChangesAsync();
            return true;          
        }
    
        public async Task<IEnumerable<Product>> GetProductsAsync(List<int> brandIds, List<int> materialIds, int pageNumber, int pageSize)
        {
            var query = _context.Products.Include(p => p.ProductImages).AsQueryable();

            if (brandIds != null && brandIds.Any())
            {
                query = query.Where(p => brandIds.Contains(p.BrandId));
            }

            if (materialIds != null && materialIds.Any())
            {
                query = query.Where(p => materialIds.Contains(p.MaterialId));
            }

            return await query.Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToListAsync();
        }
        public async Task<Product> GetProductByIdAsync(int productId)
        {
            var product = await _context.Products
                                  .Include(p => p.ProductImages)
                                  .FirstOrDefaultAsync(p => p.ProductId == productId);
            return product;
        }

        public async Task<bool> UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await SaveChangesAsync();
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
