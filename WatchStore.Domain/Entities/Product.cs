using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Product
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductDescription { get; set; }
        public int QuantityInStock { get; set; }
        public int BrandId { get; set; }

        public int MaterialId { get; set; }

        // Các thuộc tính điều hướng cho các mối quan hệ
        public Brand Brand { get; set; }
        public Material Material { get; set; }

        public ICollection<ProductImage> ProductImage { get; set; } 
        public ICollection<ProductCategory> ProductCategory { get; set; } 

    }
}
