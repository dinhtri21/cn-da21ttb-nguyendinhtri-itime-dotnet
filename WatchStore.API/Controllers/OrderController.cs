using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Orders.Commands.CreateOrder;
using WatchStore.Application.Orders.Commands.DeleteOrder;
using WatchStore.Application.Orders.Queries.GetOrder;
using WatchStore.Domain.Entities;

namespace WatchStore.API.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrderController(IMediator mediator) { 
            _mediator = mediator;
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] int? skip, [FromQuery] int? limit)
        {
            try {
                int Skip = skip ?? 0;
                int Limit = limit ?? 9;
                var listOrders = await _mediator.Send(new GetOrdersQuery(Skip, Limit));
                if (listOrders.Orders.Count() == 0)
                {
                    return Ok(new { listOrders.Orders, message = "Giỏ hàng trống!" });
                }
                return Ok(listOrders);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ValidationException ex) {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand command)
        {
           try {
                var orderId = await _mediator.Send(command);
                if (orderId == 0)
                {
                    return BadRequest(new { message = "Đặt hàng không thành công!" });
                }
                return Ok(new { message = "Đặt hàng thành công!", orderId });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ValidationException ex) {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
          
        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try {
                var result = await _mediator.Send(new DeleteOrderCommand(id));
                if (!result)
                {
                    return BadRequest(new { message = "Xóa đơn hàng không thành công!" });
                }
                return Ok(new { message = $"Xóa đơn hàng Id = {id}  thành công!" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ValidationException ex) {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
