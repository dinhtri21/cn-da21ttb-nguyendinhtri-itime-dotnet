﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Commands.CreateProduct
{
    public record CreateProductCommand : IRequest<int>
    {
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductDescription { get; set; }
        public int QuantityInStock { get; set; }
        public int BrandId { get; set; }
        public int MaterialId { get; set; }
        public List<string> ImageUrls { get; set; }

    }
}
