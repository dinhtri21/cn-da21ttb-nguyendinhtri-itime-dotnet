using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Admins.Commands.CreateAdmin
{
    public class CreateAdminCommand : IRequest<int>
    {
        public string AdminName { get; set; }
        public string AdminPhone { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }
        public List<int> RoleIds { get; set; }
    }
}
