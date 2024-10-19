using MediatR;
using Microsoft.AspNetCore.Authorization;
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

        //[Authorize(Policy = "ManagerPolicy")]
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

            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
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
                var loginData = await _mediator.Send(query);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    Expires = DateTime.UtcNow.AddHours(1),
                    SameSite = SameSiteMode.None,
                    MaxAge = TimeSpan.FromHours(1),

                };
                Response.Cookies.Append("accessToken", loginData.AccessToken, cookieOptions);

                return Ok(loginData);
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
