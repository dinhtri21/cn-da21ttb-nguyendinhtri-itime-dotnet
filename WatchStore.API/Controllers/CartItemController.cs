using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.CartItems.Commands.CreateCartItem;
using WatchStore.Application.CartItems.Commands.DeleteCartItem;
using WatchStore.Application.CartItems.Commands.UpdateCartItem;
using WatchStore.Application.CartItems.Queries.GetCartItems;

namespace WatchStore.API.Controllers
{
    [Route("api/cart-items")]
    [ApiController]
    public class CartItemController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CartItemController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("customer/{customer-id}")]
        public async Task<IActionResult> GetCartItems([FromRoute(Name = "customer-id")] int customerId)
        {
            try
            {
                var cartItems = await _mediator.Send(new GetCartItemsQuery(customerId));
                if (cartItems.Count() == 0)
                {
                    return BadRequest(new { message = "Không có sản phẩm nào trong giỏ hàng!" });
                }
                return Ok(cartItems);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddProductToCart([FromBody] CreateCartItemCommand command)
        {
            try
            {
                var cartItemId = await _mediator.Send(command);
                if (cartItemId == 0)
                {
                    return BadRequest(new { message = "Thêm sản phẩm vào giỏ hàng không thành công!" });
                }
                return Ok(new { message = $"Thêm sản phẩm vào giỏ hàng thành công", cartItemId });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {
            try
            {
                var result = await _mediator.Send(new DeleteCartItemCommand { CartItemId = id });
                if (result == false)
                {
                    return BadRequest(new { message = "Xóa sản phẩm khỏi giỏ hàng không thành công!" });
                }
                return Ok(new { message = $"Xóa sản phẩm khỏi giỏ hàng thành công", id });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemCommand command)
        {
            try
            {
                if (command.CartItemId != id)
                {
                    return BadRequest(new { message = "Id không khớp!" });
                }

                var result = await _mediator.Send(command);

                if (result == false)
                {
                    return BadRequest(new { message = "Cập nhật sản phẩm trong giỏ hàng không thành công!" });
                }
                return Ok(new { message = "Cập nhật sản phẩm trong giỏ hàng thành công!" });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
