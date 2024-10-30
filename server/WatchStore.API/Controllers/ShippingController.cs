using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Products.Queries.GetProductsCount;
using WatchStore.Application.Shipping.Queries;
using WatchStore.Application.Shipping.Queries.GetCalculateFee;

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

        [HttpGet("calculate-fee")]
        public async Task<IActionResult> GetShippingFee([FromQuery]GetCalculateFeeQuery getCalculateFeeQuery)
        {
            try
            {
                var fee = await _mediator.Send(getCalculateFeeQuery);
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
