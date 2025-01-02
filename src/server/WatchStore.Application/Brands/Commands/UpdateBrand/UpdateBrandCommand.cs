using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Brands.Commands.UpdateBrand
{
    public class UpdateBrandCommand : IRequest<BrandDto>
    { 
        public int BrandId { get; set; }
        public string? BrandName { get; set; }
        public string? BrandDescription { get; set; }
        public IFormFile? BrandImage { get; set; }
    }
}
