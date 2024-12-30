﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Brands.Queries.GetBrands
{
    public class GetBrandsQuery : IRequest<BrandsResponse>
    {
        public int Skip { get; set; }
        public int Limit { get; set; } 
        public Dictionary<string, string>? Filters { get; }
        public GetBrandsQuery(int skip, int limit, Dictionary<string, string>? filters)
        {
            Skip = skip;
            Limit = limit;
            Filters = filters;
        }
    }
}
