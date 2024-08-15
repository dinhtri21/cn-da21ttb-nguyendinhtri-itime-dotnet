using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class ProductCategory
    {
        public int ProductCategoryId { get; set; }
        public int CategoryId { get; set; }
        public int ProductId { get; set; }
        // Các thuộc tính điều hướng
        public Product Product { get; set; }
        public Category Category { get; set; }

    }
}
