using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Payment
    {
        public int PaymentId { get; set; }
        public string PaymentName { get; set; }

        // Navigation properties
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }

        public Payment()
        {
            Orders = new HashSet<Order>();
        }
    }
}
