using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Products.Commands.CreateProduct
{
    public record CreateProductCommand : IRequest<ProductDto>
    {
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductDescription { get; set; }
        public int QuantityInStock { get; set; }
        public int BrandId { get; set; }
        public int MaterialId { get; set; }
        public List<IFormFile> Images { get; set; }

    }
}
