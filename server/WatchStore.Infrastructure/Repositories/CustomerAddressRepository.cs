using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;
using WatchStore.Infrastructure.Data;

namespace WatchStore.Infrastructure.Repositories
{
    public class CustomerAddressRepository : ICustomerAddressRepository
    {
        private readonly WatchStoreDbContext _context;
        public CustomerAddressRepository(WatchStoreDbContext context)
        {
            _context = context;
        }
        public async Task<CustomerAddress> CreateCustomerAddressAsync(CustomerAddress customerAddress)
        {
            var result = await _context.CustomerAddresses.AddAsync(customerAddress);
            await _context.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<int> DeleteCustomerAddressById(int addressId)
        {
            var customerAddress = await _context.CustomerAddresses.FirstOrDefaultAsync(ca => ca.AddressId == addressId);
            if (customerAddress == null)
            {
                return 0;
            }
            _context.CustomerAddresses.Remove(customerAddress);
            await _context.SaveChangesAsync();
            return customerAddress.AddressId;
        }

        public async Task<CustomerAddress> GetCustomerAddressByIdAsync(int addressId)
        {
            var customerAddress = await _context.CustomerAddresses.FirstOrDefaultAsync(ca => ca.AddressId == addressId);
            return customerAddress;
        }

        public async Task<IEnumerable<CustomerAddress>> GetCustomerAddressesByCustomerIdAsync(int customerId)
        {
            var customerAddresses = await _context.CustomerAddresses.Where(ca => ca.CustomerId == customerId).ToListAsync();
            return customerAddresses;
        }

        public async Task<CustomerAddress> UpdateCustomerAddressAsync(CustomerAddress customerAddress)
        {
            var result = _context.CustomerAddresses.Update(customerAddress);
            await _context.SaveChangesAsync();
            return result.Entity;
        }
    }
}
