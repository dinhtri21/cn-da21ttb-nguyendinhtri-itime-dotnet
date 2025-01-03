using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Brands.Queries.GetBrands;
using WatchStore.Application.Materials.Commands.CreateMaterial;
using WatchStore.Application.Materials.Commands.DeleteMaterial;
using WatchStore.Application.Materials.Commands.UpdateMaterial;
using WatchStore.Application.Materials.Queries;
using WatchStore.Application.Materials.Queries.GetMaterialById;
using WatchStore.Application.Materials.Queries.GetMaterials;

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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMaterialById([FromRoute] GetMaterialByIdQuery command)
        {
            var material = await _mediator.Send(command);
            return Ok(material);
        }

        [HttpPost]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> CreateMaterial([FromBody] CreateMaterialCommand command)
        {
            var material = await _mediator.Send(command);
            return Ok(material);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteMaterial([FromRoute] DeleteMaterialCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateMaterial([FromRoute] int id, [FromBody] UpdateMaterialCommand command)
        {
            if (command.MaterialId != id)
            {
                return BadRequest("Material id không khớp");
            }
            await _mediator.Send(command);
            return Ok();
        }
    }
}
