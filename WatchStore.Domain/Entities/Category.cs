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

        // Thuộc tính điều hướng để thiết lập mối quan hệ nhiều-nhiều với Product
        public ICollection<ProductCategory> ProductCategory { get; set; }
    }
}
