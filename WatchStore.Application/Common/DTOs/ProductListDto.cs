using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class ProductListDto
    {
        public IEnumerable<ProductDto> Products { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
