using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Queries.GetProductsCount
{
    public class GetProductsCountQuery : IRequest<int>
    {
        public int? month { get; set; }
        public int? year { get; set; }

        public GetProductsCountQuery(int? month, int? year)
        {
            this.month = month;
            this.year = year;
        }
    }
}
