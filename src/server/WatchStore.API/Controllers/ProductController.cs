﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Products.Commands.CreateProduct;
using WatchStore.Application.Products.Commands.DeleteProduct;
using WatchStore.Application.Products.Commands.ImportExcelProduct;
using WatchStore.Application.Products.Commands.UpdateProduct;
using WatchStore.Application.Products.Queries.GetExcelProductsFile;
using WatchStore.Application.Products.Queries.GetProductById;
using WatchStore.Application.Products.Queries.GetProducts;
using WatchStore.Application.Products.Queries.GetProductsCount;
using WatchStore.Application.Products.Queries.GetRandomProducts;

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
            [FromQuery] int? skip, [FromQuery] int? limit, [FromQuery] string? sortOrder, [FromQuery(Name = "filters")] Dictionary<string, string>? filters, [FromQuery] string? search)
        {
            int Skip = skip ?? 0;
            int Limit = limit ?? 9;
            var productListDto = await _mediator.Send(new GetProductsQuery(brandIds, materialIds, Skip, Limit, sortOrder, filters, search));
            if (productListDto.Products.Count() == 0)
            {
                return Ok(new { productListDto.Products, message = "Không tìm thấy sản phẩm nào" });
            }
            return Ok(productListDto);
        }

        [HttpGet("count")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> GetProductsCount([FromQuery] int? month, [FromQuery] int? year)
        {
            var count = await _mediator.Send(new GetProductsCountQuery(month, year));
            return Ok(new { totalCount = count });
        }

        [HttpGet("random")]
        public async Task<IActionResult> GetRandomProducts([FromQuery] int limit)
        {
            var products = await _mediator.Send(new GetRandomProductsQuery(limit));
            if (products.Count() == 0)
            {
                return Ok(new { products, message = "Không có sản phẩm nào!" });
            }
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById([FromRoute] int id)
        {
            var productDto = await _mediator.Send(new GetProductByIdQuery(id));
            if (productDto == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm!" });
            }
            return Ok(productDto);

        }

        [HttpPost]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> AddProduct([FromForm] CreateProductCommand command)
        {

            var product = await _mediator.Send(command);
            if (product == null)
            {
                return BadRequest(new { message = "Thêm sản phẩm không thành công!" });
            }
            return Ok(new
            {
                message = "Thêm sản phẩm thành công!",
                product = product
            });

        }

        [HttpPost("import")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> ImportExcelProduct([FromForm] ImportExcelProductCommand command)
        {

            await _mediator.Send(command);
            //if (product == null)
            //{
            //    return BadRequest(new { message = "Thêm sản phẩm không thành công!" });
            //}
            return Ok(new
            {
                message = "Thêm sản phẩm thành công!",
                //product = product
            });

        }
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteProduct([FromRoute] int id)
        {
            var command = new DeleteProductCommand(id);
            var result = await _mediator.Send(command);

            if (!result)
            {
                return BadRequest(new { message = "Xóa sản phẩm không thành công!" });
            }
            return Ok(new { message = "Xóa sản phẩm thành công!" });

        }
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] UpdateProductCommand command)
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

        [HttpGet("export")]
        public async Task<IActionResult> ExportProductsWithImages()
        {
            var result = await _mediator.Send(new GetExcelProductsFileQuery());
            return File(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "DanhSachSanPhamWatchStore.xlsx");
        }
    }
}
