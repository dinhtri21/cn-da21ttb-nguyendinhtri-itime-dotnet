using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.OrderDetails.Queries.GetOrderDetailById
{
    public class GetOrderDetailByIdQuery  : IRequest<OrderDetailDto>
    {
        public int OrderDetailId { get; set; }
        public int CustomerId { get; set; }

        public GetOrderDetailByIdQuery(int orderDetailId, int customerId)
        {
            OrderDetailId = orderDetailId;
            CustomerId = customerId;
        }
    }
}
