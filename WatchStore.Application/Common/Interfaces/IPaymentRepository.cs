using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IPaymentRepository
    {
        Task<bool> IsPaymentExitAsync(int paymentId);
    }
}
