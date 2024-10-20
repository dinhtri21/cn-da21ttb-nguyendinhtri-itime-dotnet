using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.DTOs
{
    public class AdminDto
    {
        public int AdminId { get; set; }
        public string AdminName { get; set; }
        public string AdminPhone { get; set; }
        public string AdminEmail { get; set; }
        public IEnumerable<RoleDto> AdminRoles { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
