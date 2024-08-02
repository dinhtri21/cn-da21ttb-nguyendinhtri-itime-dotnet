using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Interfaces
{
    public interface ICustomerRepository
    {
        Task AddCustomerAsync(Customer customer);
        Task<IEnumerable<Customer>> GetAllCustomerAsync();
    }
}
