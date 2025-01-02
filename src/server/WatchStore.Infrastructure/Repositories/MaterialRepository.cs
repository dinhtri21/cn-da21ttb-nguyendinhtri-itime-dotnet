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

namespace WatchStore.Infrastructure.Repositories
{
    public class MaterialRepository : IMaterialRepository
    {
        private readonly WatchStoreDbContext _context;
        public MaterialRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task<List<Material>?> GetMaterialsAsync(int? skip, int? limit, Dictionary<string, string>? filters)
        {
            var query = _context.Materials.AsQueryable();

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

        public async Task<Material?> CreateMaterialAsync(Material material)
        {
            await _context.Materials.AddAsync(material);
            await _context.SaveChangesAsync();
            return material;
        }

        public async Task DeleteMaterialAsync(int materialId)
        {
            var material = await _context.Materials.FirstOrDefaultAsync(b => b.MaterialId == materialId);

            if (material == null)
            {
                throw new InvalidOperationException("Không tìm thấy chất liệu.");
            }

            if (material.Products != null && material.Products.Any())
            {
                throw new InvalidOperationException("Không thể xóa chất liệu đã có sản phẩm.");
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();
        }

        public async Task<Material?> GetMaterialByIdAsync(int materialId)
        {
            return await _context.Materials.FirstOrDefaultAsync(b => b.MaterialId == materialId);
        }

        public async Task<Material?> UpdateMaterialAsync(Material material)
        {
            _context.Materials.Update(material);
            await _context.SaveChangesAsync();
            return material;
        }
    }
}
