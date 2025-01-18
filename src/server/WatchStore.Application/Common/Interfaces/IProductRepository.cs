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
        Task<Product> AddProductAsync(Product product);
        Task<List<Product>> AddListProductsAsync(List<Product> products);
        Task<bool> IsBrandExistsAsync(int brandId);
        Task<bool> IsMaterialExistsAsync(int materialId);
        Task<bool> DeleteProductAsync(int productId);
        Task<bool> UpdateProductAsync(Product product);
        Task<IEnumerable<Product>> GetProductsAsync(List<int> brandIds, List<int> materialIds, int pageNumber, int pageSize, string sortOrder,
                                                    Dictionary<string, string> filters, string search);
        Task<int> GetTotalProductCountAsync(List<int>? brandIds = null, List<int>? materialIds = null, int? month = null, int? year = null);
        Task<Product> GetProductByIdAsync(int productId);
        Task<Product?> GetProductByNameAsync(string productName);
        Task<IEnumerable<Product>?> GetAllProductsAsync();
        Task<List<Product>> GetRandomProductsAsync(int limit);
    }
}
