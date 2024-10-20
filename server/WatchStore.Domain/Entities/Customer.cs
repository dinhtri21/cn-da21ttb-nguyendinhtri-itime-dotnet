using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<Order> Orders { get; set; }
        public ICollection<Cart> Carts { get; set; }

        public Customer()
        {
            Orders = new HashSet<Order>();
            Carts = new HashSet<Cart>();
        }
    }
}
