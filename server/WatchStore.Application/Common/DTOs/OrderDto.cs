using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.DTOs
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public int PaymentId { get; set; }
        public decimal Total { get; set; }
        public Shipping Shipping { get; set; }
        public DateTime CreatedAt { get; set; }

    }
    public class OrderListDto
    {
        public List<OrderShippingDto> Orders { get; set; }
        public int Total { get; set; }
        public int Skip { get; set; }
        public int Limit { get; set; }
    }

    public class OrderShippingDto
    {
        public int OrderId { get; set; }
        public Payment Payment { get; set; }
        public string TrackingNumber { get; set; }
        public int CustomerId { get; set; }
        public int PaymentId { get; set; }
        public decimal Total { get; set; }
        public string EstimatedDeliveryTime { get; set; }
        public string ShippingStatus { get; set; }
        public int ShippingFee { get; set; }
        public string AddressLine { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
