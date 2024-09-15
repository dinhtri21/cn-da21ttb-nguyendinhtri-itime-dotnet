using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface ICustomerRepository 
    {
        Task AddCustomerAsync(Customer customer);
        Task<IEnumerable<Customer>> GetAllCustomerAsync();
        Task<Customer> GetCustomerByEmailAsync(string Email);
        Task<bool> UpdateCustomerAsync(Customer customer);
        Task<Customer> GetCustomerByIdAsync(int id);
    }
}
