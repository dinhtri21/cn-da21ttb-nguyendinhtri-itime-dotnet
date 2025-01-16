using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchStore.Application.Statistics.Queries.GetOrderRevenue;

namespace WatchStore.API.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public StatisticsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet("order/revenue")]
        public async Task<IActionResult> GetOrderRevenue([FromQuery] int? month, [FromQuery] int year)
        {
            var orderRevenueDto = await _mediator.Send(new GetOrderRevenueQuery(month, year));
            return Ok(orderRevenueDto);
        }

    }
}
