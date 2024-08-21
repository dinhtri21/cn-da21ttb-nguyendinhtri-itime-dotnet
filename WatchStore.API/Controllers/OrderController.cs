using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Orders.Commands.CreateOrder;
using WatchStore.Domain.Entities;

namespace WatchStore.API.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;
        public OrderController(IMediator mediator) { 
            _mediator = mediator;
        }

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
            catch (ValidationException ex) {
                return BadRequest(ex.Message);
            }
            catch (Exception ex) {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
          
        }
    }
}
