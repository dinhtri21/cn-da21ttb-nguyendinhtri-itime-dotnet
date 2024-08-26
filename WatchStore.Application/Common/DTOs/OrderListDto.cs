using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class OrderListDto
    {
        public IEnumerable<OrderDto> Orders { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages { get; set; }
    }
}
