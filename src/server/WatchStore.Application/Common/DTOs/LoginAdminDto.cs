using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.DTOs
{
    public class LoginAdminDto
    {
        public string AccessToken { get; set; }
        public AdminDto Admin { get; set; }
    }
}
