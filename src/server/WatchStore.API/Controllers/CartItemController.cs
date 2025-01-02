using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using WatchStore.Application.CartItems.Commands.CreateCartItem;
using WatchStore.Application.CartItems.Commands.DeleteCartItem;
using WatchStore.Application.CartItems.Commands.UpdateCartItem;
using WatchStore.Application.CartItems.Queries.GetCartItems;
using WatchStore.Application.CartItems.Queries.GetCartItemsCount;
using WatchStore.Application.Common.DTOs;
using WatchStore.Domain.Entities;

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

        [Authorize(Policy = "CustomerPolicy")]
        [HttpGet("customer/{customer-id}")]
        public async Task<IActionResult> GetCartItems([FromRoute(Name = "customer-id")] int customerId)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token

            if (userId != customerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            var cartItems = await _mediator.Send(new GetCartItemsQuery(customerId));
            if (cartItems.Count() == 0)
            {
                return Ok(cartItems);
            }
            return Ok(cartItems);

        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpGet("items-count/customer/{customer-id}")]
        public async Task<IActionResult> GetCartItemsCount([FromRoute(Name = "customer-id")] int customerId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token

            if (userId != customerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            var cartItemsCount = await _mediator.Send(new GetCartItemsCountQuery(customerId));
            return Ok(new { cartItemsCount });

        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpPost]
        public async Task<IActionResult> AddProductToCart([FromBody] CreateCartItemCommand command)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token

            if (userId != command.CustomerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            var cartItem = await _mediator.Send(command);
            if (cartItem == null)
            {
                return BadRequest(new { message = "Thêm sản phẩm vào giỏ hàng không thành công!" });
            }
            return Ok(new { message = $"Thêm sản phẩm vào giỏ hàng thành công", data = cartItem });

        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartItem(int id)
        {


            var result = await _mediator.Send(new DeleteCartItemCommand { CartItemId = id });
            if (result == false)
            {
                return BadRequest(new { message = "Xóa sản phẩm khỏi giỏ hàng không thành công!" });
            }
            return Ok(new { message = $"Xóa sản phẩm khỏi giỏ hàng thành công", id });

        }

        [Authorize(Policy = "CustomerPolicy")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] UpdateCartItemCommand command)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token

            if (userId != command.CustomerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            if (command.CartItemId != id)
            {
                return BadRequest(new { message = "Id không khớp!" });
            }

            var carItem = await _mediator.Send(command);

            if (carItem == null)
            {
                return BadRequest(new { message = "Cập nhật sản phẩm trong giỏ hàng không thành công!" });
            }
            return Ok(new { message = "Cập nhật sản phẩm trong giỏ hàng thành công!", data = carItem });
        }

    }
}
