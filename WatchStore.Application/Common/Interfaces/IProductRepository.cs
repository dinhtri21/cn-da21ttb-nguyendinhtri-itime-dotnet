using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductAsync(int pageNumber, int pageSize);
        Task AddProductAsync(Product product);
        Task<bool> IsBrandExistsAsync(int brandId);
        Task<bool> IsMaterialExistsAsync(int materialId);
        Task<bool> DeleteProductAsync(int productId);
        Task<bool> UpdateProductAsync(Product product);
        Task<Product> GetProductByIdAsync(int productId);
        Task<IEnumerable<Product>> GetProductsAsync(List<int> brandIds, List<int> materialIds, int pageNumber, int pageSize);
    }
}
