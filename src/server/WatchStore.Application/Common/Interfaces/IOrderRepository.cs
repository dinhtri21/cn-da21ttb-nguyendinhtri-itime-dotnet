﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IOrderRepository 
    {
        Task<IEnumerable<Order>> GetOrdersAsync(int Skip, int Limit, Dictionary<string, string> filters);
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<Order>> GetOrdersByCustomerIdAsync(int customerId, int Skip, int Limit);
        Task<int> GetTotalOrderCountByCustomerIdAsync(int customerId);
        Task AddOrderAsync(Order order);
        Task DeleteOrderAsync(int orderId);
        Task<int> GetTotalOrderCountAsync();
        Task<int> GetOrderCountByMonthAndYearAsync(int? month, int? year);
        Task<List<Order>> GetOrdersByMonthAndYearAsync(int? month, int? year);
    }
}
