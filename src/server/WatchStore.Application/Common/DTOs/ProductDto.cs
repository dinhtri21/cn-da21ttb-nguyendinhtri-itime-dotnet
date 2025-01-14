﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.DTOs
{
    public class ProductDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductDescription { get; set; }
        public int QuantityInStock { get; set; }
        public IEnumerable<string> ImageUrls { get; set; }
        public BrandDto Brand { get; set; }
        public MaterialDto Material { get; set; }
        public DateTime CreatedAt { get; set; }
    }

}
