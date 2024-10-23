using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Carrier
    {
        public int CarrierId { get; set; } 
        public string CarrierName { get; set; } 
        public string Website { get; set; } 

        // Navigation property
        public ICollection<Shipping> Shippings { get; set; } // Danh sách các đơn hàng đã vận chuyển

        public Carrier()
        {
            Shippings = new HashSet<Shipping>(); // Khởi tạo danh sách vận chuyển
        }
    }
}
