using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Products.Commands.CreateProduct;
using WatchStore.Application.Products.Commands.DeleteProduct;
using WatchStore.Application.Products.Commands.UpdateProduct;
using WatchStore.Application.Products.Queries.GetProductById;
using WatchStore.Application.Products.Queries.GetProducts;
using WatchStore.Application.Products.Queries.GetProductsCount;

namespace WatchStore.API.Controllers
{
    //[Route("api/[controller]")]
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] List<int> brandIds, [FromQuery] List<int> materialIds,
            [FromQuery] int? skip, [FromQuery] int? limit, [FromQuery] string? sortOrder)
        {
            try
            {
                int Skip = skip ?? 0;
                int Limit = limit ?? 9;
                var productListDto = await _mediator.Send(new GetProductsQuery(brandIds, materialIds, Skip, Limit, sortOrder));
                if (productListDto.Products.Count() == 0)
                {
                    return Ok(new { productListDto.Products, message = "Giỏ hàng trống!" });
                }
                return Ok(productListDto);
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

        [HttpGet("count")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> GetProductsCount([FromQuery]int? month, [FromQuery] int? year)
        {
            try
            {
                var count = await _mediator.Send(new GetProductsCountQuery(month, year));
                return Ok(new {totalCount = count});
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

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            try
            {
                var productDto = await _mediator.Send(new GetProductByIdQuery(id));
                if (productDto == null)
                {
                    return NotFound(new { message = "Không tìm thấy sản phẩm!" });
                }
                return Ok(productDto);
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
        public async Task<IActionResult> AddProduct([FromBody] CreateProductCommand command)
        {
            try
            {
                var productId = await _mediator.Send(command);
                if (productId == 0)
                {
                    return BadRequest(new { message = "Thêm sản phẩm không thành công!" });
                }
                return Ok(new { message = "Thêm sản phẩm thành công!" });
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
        public async Task<IActionResult> DeleteProduct([FromRoute] DeleteProductCommand command)
        {
            try
            {
                var result = await _mediator.Send(command);

                if (!result)
                {
                    return BadRequest(new { message = "Xóa sản phẩm không thành công!" });
                }
                return Ok(new { message = "Xóa sản phẩm thành công!" });
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
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] UpdateProductCommand command)
        {
            try
            {
                if (id != command.ProductId)
                {
                    return BadRequest(new { message = "ProductId không khớp." });
                }
                var result = await _mediator.Send(command);
                if (!result)
                {
                    return BadRequest(new { message = "Cập nhật sản phẩm không thành công!" });
                }
                return Ok(new { message = "Cập nhật sản phẩm thành công!" });
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
