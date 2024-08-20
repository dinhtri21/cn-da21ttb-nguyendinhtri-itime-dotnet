using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Material
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }

        // Navigation properties
        public ICollection<Product> Products { get; set; }
    }
}
