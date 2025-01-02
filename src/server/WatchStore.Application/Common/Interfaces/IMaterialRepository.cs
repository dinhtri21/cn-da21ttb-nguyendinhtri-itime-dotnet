using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IMaterialRepository
    {
        Task<List<Material>?> GetMaterialsAsync(int? skip, int? limit, Dictionary<string, string>? filters);
        Task<Material?> GetMaterialByIdAsync(int materialId);
        Task<Material?> CreateMaterialAsync(Material material);
        Task DeleteMaterialAsync(int materialId);
        Task<Material?> UpdateMaterialAsync(Material material);
    }
}
