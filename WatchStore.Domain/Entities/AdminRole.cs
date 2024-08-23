using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class AdminRole
    {
        public int RoleId { get; set; }
        public int AdminId { get; set; }
        public Role Role { get; set; }
        public Admin Admin { get; set; }
    }
}
