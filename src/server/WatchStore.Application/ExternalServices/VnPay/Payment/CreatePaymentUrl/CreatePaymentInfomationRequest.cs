using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.VnPay.Payment.CreatePaymentUrl
{
    public class CreatePaymentInfomationRequest
    {

    }
    public class PaymentInformation
    {
        public string OrderType { get; set; }
        public double Amount { get; set; }
        public string OrderDescription { get; set; }
        public string Name { get; set; }
    }
}
