using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Orders.Commands.CreateOrder;
using WatchStore.Application.Orders.Commands.DeleteOrder;
using WatchStore.Application.Orders.Queries.GetOrder;
using WatchStore.Application.Orders.Queries.GetOrdersByCustomerId;
using WatchStore.Application.Orders.Queries.GetOrdersCount;
using WatchStore.Domain.Entities;

namespace WatchStore.API.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrderController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetOrders([FromQuery] int? skip, [FromQuery] int? limit, [FromQuery(Name = "filters")] Dictionary<string, string> filters)
        {
            try
            {
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
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("count")]
        public async Task<IActionResult> GetOrdersCount([FromQuery] int? month, [FromQuery] int? year)
        {
            try
            {
                var count = await _mediator.Send(new GetOrdersCountQuery(year, month));
                return Ok(new { totalCount = count });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpGet("customer/{customer-id}")]
        public async Task<IActionResult> GetOrdersByCustomer([FromQuery] int? skip, [FromQuery] int? limit, [FromRoute(Name = "customer-id")] int customerId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != customerId.ToString())
            {
                return Forbid("Bạn không có quyền truy cập tài nguyên này!");
            }
            try
            {
                int Skip = skip ?? 0;
                int Limit = limit ?? 9;
                var listOrders = await _mediator.Send(new GetOrdersByCustomerIdQuery(customerId, Skip, Limit));
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
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderCommand command)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != command.CustomerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }
            try
            {
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
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [Authorize(Policy = "ManagerPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
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
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
