﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IBrandRepository
    {
        Task<List<Brand>?> GetBrandsAsync(int? skip, int? limit, Dictionary<string, string>? filters);
        Task<Brand?> GetBrandByIdAsync(int brandId);
        Task<Brand?> CreateBrandAsync(Brand brand);
        Task DeleteBrandAsync(int brandId);
        Task<Brand?> UpdateBrandAsync(Brand brand);
    }
}
