using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Products.Queries.GetProductsCount;
using WatchStore.Application.Shippings.Queries;
using WatchStore.Application.Shippings.Queries.GetCalculateFee;

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
                var fee = await _mediator.Send(getCalculateFeeQuery);
                return Ok(fee);
        }
    }
}
