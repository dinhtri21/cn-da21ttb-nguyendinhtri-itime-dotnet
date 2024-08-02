using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.DTOs;

namespace WatchStore.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllCustomerAsync();

        Task CreateCustomerAsync(CustomerDto customerDto);
    }
}
