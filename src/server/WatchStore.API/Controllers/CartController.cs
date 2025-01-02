using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Carts.Commands.CreateCart;

namespace WatchStore.API.Controllers
{
    [Route("api/carts")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpPost]
        public async Task<IActionResult> CreateCart ([FromBody] CreateCartCommand command)
        {
                var cartId = await _mediator.Send(command);
                if (cartId == 0)
                {
                    return BadRequest(new { message = "Tạo giỏ hàng không thành công!" });
                }
                return Ok(new { message = $"Tạo giỏ hàng mới cho thành công", cartId });
        }
    }
}
