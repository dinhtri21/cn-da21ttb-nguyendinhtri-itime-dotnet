using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class Role
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        // Navigation properties
        public ICollection<AdminRole> AdminRoles { get; set; }
        public Role()
        {
            AdminRoles = new HashSet<AdminRole>();
        }
    }
}
