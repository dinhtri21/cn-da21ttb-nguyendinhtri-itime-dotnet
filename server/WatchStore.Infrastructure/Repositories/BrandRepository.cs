using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace WatchStore.Infrastructure.Repositories
{
    public class BrandRepository : IBrandRepository
    {
        private readonly WatchStoreDbContext _context;
        public BrandRepository(WatchStoreDbContext context)
        {
            _context = context;
        }

        public async Task<Brand?> CreateBrandAsync(Brand brand)
        {
            await _context.Brands.AddAsync(brand);
            await _context.SaveChangesAsync();
            return brand;
        }

        public async Task DeleteBrandAsync(int brandId)
        {
            var brand = await _context.Brands.FirstOrDefaultAsync(b => b.BrandId == brandId);

            if (brand == null)
            {
                throw new InvalidOperationException("Không tìm thấy thương hiệu.");
            }
            if (brand.Products.Any())
            {
                throw new InvalidOperationException("Không thể xóa thương hiệu đã có sản phẩm.");
            }
            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();
        }

        public async Task<Brand?> GetBrandByIdAsync(int brandId)
        {
            return await _context.Brands.FirstOrDefaultAsync(b => b.BrandId == brandId);
        }

        public async Task<List<Brand>?> GetBrandsAsync(int? skip, int? limit, Dictionary<string, string>? filters)
        {
            var query = _context.Brands.AsQueryable();

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

            if (skip.HasValue && limit.HasValue)
            {
                return await query.Skip(skip.Value * limit.Value)
                                  .Take(limit.Value)
                                  .ToListAsync();
            }

            return await query.ToListAsync();

        }

        public async Task<Brand?> UpdateBrandAsync(Brand brand)
        {
            _context.Brands.Update(brand);
            await _context.SaveChangesAsync();
            return brand;
        }
    }
}
