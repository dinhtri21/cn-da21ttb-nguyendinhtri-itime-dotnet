using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Shipping
    {
        public int ShippingId { get; set; }
        public int CarrierId { get; set; } 
        public int OrderId { get; set; } 
        public string TrackingNumber { get; set; }
        public string ShippingStatus { get; set; } 
        public int ShippingFee { get; set; } 
        public DateTime EstimatedDelivery { get; set; } 
        public string AddressLine { get; set; } 
        public DateTime CreatedAt { get; set; } = DateTime.Now; 

        // Navigation properties
        public Carrier Carrier { get; set; } 
        public Order Order { get; set; } 
    }
}
