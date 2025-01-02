using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Brands.Commands.CreateBrand;
using WatchStore.Application.Brands.Commands.DeleteBrand;
using WatchStore.Application.Brands.Commands.UpdateBrand;
using WatchStore.Application.Brands.Queries.GetBrands;
using WatchStore.Application.Common.Interfaces;

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
            try
            {
                int Skip = skip ?? 0;
                int Limit = limit ?? 9;
                var brands = await _mediator.Send(new GetBrandsQuery(Skip, Limit, filters));
                return Ok(brands);
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
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> CreateBrand([FromForm] CreateBrandCommand command)
        {
            try
            {
                var brand = await _mediator.Send(command);
                return Ok(brand);
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

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteBrand([FromRoute] int id)
        {
            try
            {
                await _mediator.Send(new DeleteBrandCommand(id));
                return Ok();
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

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateBrand([FromRoute] int id, [FromForm] UpdateBrandCommand command)
        {
            try
            {
                if (command.BrandId != id)
                {
                    return BadRequest("Brand id không khớp");
                }
                var brand = await _mediator.Send(command);
                return Ok(brand);
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
