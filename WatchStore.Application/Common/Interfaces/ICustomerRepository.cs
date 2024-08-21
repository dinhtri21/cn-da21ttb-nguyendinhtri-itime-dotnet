﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface ICustomerRepository : IBaseRepository
    {
        Task AddCustomerAsync(Customer customer);
        Task<IEnumerable<Customer>> GetAllCustomerAsync();
    }
}
