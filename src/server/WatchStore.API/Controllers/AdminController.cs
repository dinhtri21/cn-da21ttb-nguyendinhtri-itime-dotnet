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

            var adminId = await _mediator.Send(command);
            if (adminId == 0)
            {
                return BadRequest(new { message = "Tạo tài khoản admin không thành công!" });
            }
            return Ok(new { message = "Tạo tài khoản admin thành công!", adminId });

        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAdmin([FromBody] LoginAdminQuery query)
        {

            var loginData = await _mediator.Send(query);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                Expires = DateTime.UtcNow.AddHours(7),
                SameSite = SameSiteMode.None,
                MaxAge = TimeSpan.FromHours(7),

            };
            Response.Cookies.Append("accessToken", loginData.AccessToken, cookieOptions);

            return Ok(loginData);
        }

    }
}
