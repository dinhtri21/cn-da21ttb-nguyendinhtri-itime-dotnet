using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryDescription { get; set; }

        // Navigation properties
        public ICollection<ProductCategory> ProductCategories { get; set; }
        public Category()
        {
            ProductCategories = new HashSet<ProductCategory>();
        }
    }
}
