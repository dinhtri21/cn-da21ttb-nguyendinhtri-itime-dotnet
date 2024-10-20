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
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public Brand Brand { get; set; }
        public Material Material { get; set; }

        public ICollection<ProductImage> ProductImages { get; set; } 
        public ICollection<ProductCategory> ProductCategories { get; set; } 
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<CartItem> Carts { get; set; }

        public Product()
        {
            ProductImages = new HashSet<ProductImage>();
            ProductCategories = new HashSet<ProductCategory>();
            OrderDetails = new HashSet<OrderDetail>();
            Carts = new HashSet<CartItem>();
        }

    }
}
