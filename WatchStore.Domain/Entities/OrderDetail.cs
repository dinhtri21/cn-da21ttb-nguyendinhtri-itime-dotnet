﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class OrderDetail
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }

        // Navigation properties
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
