using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Brands.Queries.GetBrands;
using WatchStore.Application.Materials.Queries;

namespace WatchStore.API.Controllers
{
    [Route("api/materials")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMediator _mediator;
        public MaterialController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetMaterias([FromQuery] int? skip, [FromQuery] int? limit, [FromQuery(Name = "filters")] Dictionary<string, string>? filters)
        {
            int Skip = skip ?? 0;
            int Limit = limit ?? 9;
            var Materials = await _mediator.Send(new GetMaterialsQuery(Skip, Limit, filters));
            return Ok(Materials);
        }
    }
}
