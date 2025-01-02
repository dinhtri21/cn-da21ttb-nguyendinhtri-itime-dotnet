using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Cart
    {
        public int CartId { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public List<CartItem> CartItems { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
