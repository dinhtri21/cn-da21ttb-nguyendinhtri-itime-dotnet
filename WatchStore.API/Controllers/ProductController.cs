using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Products.Commands.CreateProduct;
using WatchStore.Application.Products.Commands.DeleteProduct;
using WatchStore.Application.Products.Commands.UpdateProduct;
using WatchStore.Application.Products.Queries.GetProducts;

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
        public async Task<IActionResult> GetProducts([FromQuery] List<int> brandIds, [FromQuery] List<int> materialIds, [FromQuery] int? pageNumber, [FromQuery] int? pageSize)
        {
            try {
                int currentPageNumber = pageNumber ?? 1;
                int currentPageSize = pageSize ?? 9;
                var productListDto = await _mediator.Send(new GetProductsQuery(brandIds, materialIds, currentPageNumber, currentPageSize));
                if (productListDto.Products.Count() == 0)
                {
                    return BadRequest(new { message = "Không có sản phẩm nào!" });
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
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                var result = await _mediator.Send(new DeleteProductCommand(id));
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
