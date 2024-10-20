using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Admin
    {
        public int AdminId { get; set; }
        public string AdminName { get; set; }
        public string AdminPhone { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<AdminRole> AdminRoles { get; set; }
        public Admin()
        {
            AdminRoles = new HashSet<AdminRole>();
        }
    }
}
