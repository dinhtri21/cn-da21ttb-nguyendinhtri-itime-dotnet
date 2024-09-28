using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Customers.Queries.GetCustomerById
{
    public class GetCustomerByIdQuery : IRequest<CustomerDto> 
    {
        public int CustomerId { get; set; }
        public GetCustomerByIdQuery(int customerId)
        {
            CustomerId = customerId;
        }
    }
}
