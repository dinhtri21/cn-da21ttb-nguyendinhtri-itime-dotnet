using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.Customers.Queries.GetCustomerCount;

namespace WatchStore.Application.Customers.Queries.GetCustomersCount
{
    public class GetCustomersCountQueryHandler : IRequestHandler<GetCustomersCountQuery, int>, IApplicationMarker
    {
        private readonly ICustomerRepository _customerRepository;
        public GetCustomersCountQueryHandler(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }
        public async Task<int> Handle(GetCustomersCountQuery request, CancellationToken cancellationToken)
        {
            var count = await _customerRepository.GetCustomerCountAsync();
            return count;
        }
    }
}
