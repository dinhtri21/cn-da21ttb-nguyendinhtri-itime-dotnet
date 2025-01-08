using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Brands.Commands.CreateBrand;
using WatchStore.Application.Brands.Commands.DeleteBrand;
using WatchStore.Application.Brands.Commands.UpdateBrand;
using WatchStore.Application.Brands.Queries.GetBrandById;
using WatchStore.Application.Brands.Queries.GetBrands;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.API.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IMediator _mediator;
        public BrandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetBrands([FromQuery] int? skip, [FromQuery] int? limit, [FromQuery(Name = "filters")] Dictionary<string, string>? filters)
        {
            int Skip = skip ?? 0;
            int Limit = limit ?? 9;
            var brands = await _mediator.Send(new GetBrandsQuery(Skip, Limit, filters));
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandById([FromRoute] int id)
        {
            var brand = await _mediator.Send(new GetBrandByIdQuery(id));
            return Ok(brand);
        }

        [HttpPost]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> CreateBrand([FromForm] CreateBrandCommand command)
        {
            var brand = await _mediator.Send(command);
            return Ok(
                 new
                 {
                     message = "Thêm thương hiệu thành công!",
                     data = brand
                 }
            );
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteBrand([FromRoute] int id)
        {
            await _mediator.Send(new DeleteBrandCommand(id));
            return Ok(
                  new
                  {
                      message = "Xoá thương hiệu thành công!",
                  }
            );
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateBrand([FromRoute] int id, [FromForm] UpdateBrandCommand command)
        {
            if (command.BrandId != id)
            {
                return BadRequest("Brand id không khớp");
            }
            var brand = await _mediator.Send(command);
            return Ok(
                new
                {
                    message = "Cập nhật thương hiệu thành công!",
                    data = brand
                }
             );
        }
    }
}
