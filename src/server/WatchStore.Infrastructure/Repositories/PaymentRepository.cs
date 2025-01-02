using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Infrastructure.Data;

namespace WatchStore.Infrastructure.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly WatchStoreDbContext _context;
        public PaymentRepository(WatchStoreDbContext context) { 
            _context = context;
        }
        public async Task<bool> IsPaymentExitAsync(int paymentId)
        {
            return await _context.Payments.AnyAsync(p => p.PaymentId == paymentId);
        }
    }
}
