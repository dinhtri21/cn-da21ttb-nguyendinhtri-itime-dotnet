﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class GHNCalculateFeeDto
    {
        public int Total { get; set; }
        public int Leadtime { get; set; }
        public string FromEstimateDate { get; set; }
        public string ToEstimateDate { get; set; }
    }
}
