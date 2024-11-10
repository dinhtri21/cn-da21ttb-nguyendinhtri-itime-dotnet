using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.OrderDetails.Queries.GetOrderDetailsByOrderId
{
    public class GetOrderDetailsByOrderIdQuery : IRequest<IList<OrderDetailDto>>
    {
        public int OrderId { get; set; }
        //public int CustomerId { get; set; }
        public GetOrderDetailsByOrderIdQuery(int orderId)
        {
            OrderId = orderId;
            //CustomerId = customerId;
        }
    }
}
