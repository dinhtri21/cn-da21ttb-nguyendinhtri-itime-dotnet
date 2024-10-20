using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PaymentId { get; set; }
        public string OrderStatus { get; set; }
        public decimal Total { get; set; }
        public string OrderNote { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
