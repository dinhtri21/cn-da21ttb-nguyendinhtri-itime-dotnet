using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WatchStore.Application.Admins.Commands.CreateAdmin;
using WatchStore.Application.Admins.Queries.LoginAdmin;

namespace WatchStore.API.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AdminController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminCommand command)
        {
            try
            {
                var adminId = await _mediator.Send(command);
                if (adminId == 0)
                {
                    return BadRequest(new { message = "Tạo tài khoản admin không thành công!" });
                }
                return Ok(new { message = "Tạo tài khoản admin thành công!", adminId });
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

        [HttpPost("login")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginAdminQuery query)
        {
            try
            {
                var message = await _mediator.Send(query);
                return Ok(new { message });
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
