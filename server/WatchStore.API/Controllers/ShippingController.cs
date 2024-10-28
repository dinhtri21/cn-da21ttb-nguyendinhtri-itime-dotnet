using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Products.Queries.GetProductsCount;
using WatchStore.Application.Shipping.Queries;

namespace WatchStore.API.Controllers
{
    [Route("api/shippings")]
    [ApiController]
    public class ShippingController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ShippingController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("fee")]
        public async Task<IActionResult> GetShippingFee( 
            [FromQuery] string address, 
            [FromQuery] string province,
            [FromQuery] string district,
            [FromQuery] int weight,
            [FromQuery] string deliverOption)
        {
            try
            {
                var query = new GetShippingFeeQuery
                {
                    Address = address,
                    Province = province,
                    District = district,
                    Weight = weight,
                    DeliverOption = deliverOption
                };

                var fee = await _mediator.Send(query);
                return Ok(fee);
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
