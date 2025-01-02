using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Brand
    {
        public int BrandId { get; set; }
        public string BrandName { get; set; }
        public string BrandDescription { get; set; }
        public string BrandImageUrl { get; set; }

        // Navigation properties
        public ICollection<Product> Products { get; set; }
        public Brand()
        {
            Products = new HashSet<Product>();
        }
    }
}
