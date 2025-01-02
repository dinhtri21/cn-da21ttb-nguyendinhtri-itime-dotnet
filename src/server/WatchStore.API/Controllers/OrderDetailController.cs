using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using WatchStore.Application.OrderDetails.Queries.GetOrderDetailById;
using WatchStore.Application.OrderDetails.Queries.GetOrderDetailsByOrderId;
using WatchStore.Application.Orders.Queries.GetOrdersByCustomerId;
using WatchStore.Domain.Entities;

namespace WatchStore.API.Controllers
{
    [Route("api/order-details")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrderDetailController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [Authorize(Policy = "CustomerAndAdminPolicy")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetailById([FromRoute] int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userId == null)
            {
                return Unauthorized(new { message = "Lỗi xác thực!" });
            }

            var OrderDetail = await _mediator.Send(new GetOrderDetailByIdQuery(id, Convert.ToInt32(userId)));
            if (OrderDetail == null)
            {
                return Ok(new { OrderDetail, message = "Không tìm thấy đơn hàng!" });
            }
            return Ok(OrderDetail);

        }
        [Authorize(Policy = "CustomerAndAdminPolicy")]
        [HttpGet("order/{order-id}")]

        public async Task<IActionResult> GetOrderDetailsByOrderId([FromRoute(Name = "order-id")] int id)
        {
            var OrderDetails = await _mediator.Send(new GetOrderDetailsByOrderIdQuery(id));
            if (OrderDetails == null)
            {
                return Ok(new { OrderDetails, message = "Không tìm thấy đơn hàng!" });
            }
            return Ok(OrderDetails);
        }

    }
}
