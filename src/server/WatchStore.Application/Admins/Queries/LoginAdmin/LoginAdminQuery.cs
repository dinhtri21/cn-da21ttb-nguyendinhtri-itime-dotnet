using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Admins.Queries.LoginAdmin
{
    public class LoginAdminQuery : IRequest<LoginAdminDto>
    {
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }
    }
    
}
