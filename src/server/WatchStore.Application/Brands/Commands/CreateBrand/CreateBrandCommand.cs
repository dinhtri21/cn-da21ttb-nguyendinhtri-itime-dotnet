using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Brands.Commands.CreateBrand
{
    public class CreateBrandCommand : IRequest<BrandDto>
    {
        public string BrandName { get; set; }
        public string BrandDescription { get; set; }
        public IFormFile Images { get; set; }

    }
}
