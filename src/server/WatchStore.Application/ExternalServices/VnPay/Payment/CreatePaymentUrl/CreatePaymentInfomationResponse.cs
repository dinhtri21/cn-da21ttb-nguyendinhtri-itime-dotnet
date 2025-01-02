using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.VnPay.Payment.CreatePaymentUrl
{
    public class CreatePaymentInfomationResponse
    {
        public string orderDescription { get; set; }
        public string transactionId { get; set; }
        public string orderId { get; set; }
        public string paymentMethod { get; set; }
        public string paymentId { get; set; }
        public bool success { get; set; }
        public string token { get; set; }
        public string vnPayResponseCode { get; set; }
    }
}
