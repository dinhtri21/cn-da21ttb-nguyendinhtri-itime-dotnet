using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface ICustomerAddressRepository
    {
        Task<CustomerAddress> CreateCustomerAddressAsync(CustomerAddress customerAddress);
        Task<IEnumerable<CustomerAddress>> GetCustomerAddressesByCustomerIdAsync(int customerId);
        Task<CustomerAddress> GetCustomerAddressByIdAsync(int addressId);
        Task<int> DeleteCustomerAddressById(int addressId);
    }
}
