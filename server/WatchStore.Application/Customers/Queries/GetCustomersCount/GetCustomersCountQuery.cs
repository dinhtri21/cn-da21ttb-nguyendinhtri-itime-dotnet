using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Customers.Queries.GetCustomerCount
{
    public class GetCustomersCountQuery : IRequest<int>
    {
        public GetCustomersCountQuery() { }
    }
}
