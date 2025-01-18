using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using WatchStore.Application.Customers.Commands.CreateCustomer;
using FluentValidation;
using WatchStore.Application.Customers.Queries.GetAllCustomers;
using WatchStore.Application.Customers.Commands.UpdateCustomer;
using WatchStore.Application.Customers.Queries.LoginCustomer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WatchStore.Application.Customers.Queries.GetCustomerById;
using WatchStore.Application.Customers.Queries.GetCustomerCount;

namespace WatchStore.API.Controllers
{
    [Route("api/customers")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IAuthorizationService _authorizationService;

        public CustomerController(IMediator mediator, IAuthorizationService authorizationService)

        {
            _mediator = mediator;
            _authorizationService = authorizationService;
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {

            var query = new GetAllCustomersQuery();
            var customers = await _mediator.Send(query);
            if (customers.Count() == 0)
            {
                return BadRequest(new { message = "Không có khách hàng nào!" });
            }
            return Ok(customers);

        }

        [HttpGet("{id}")]
        [Authorize(Policy = "CustomerAndAdminPolicy")]
        public async Task<IActionResult> GetCustomerById(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token
            var role = User.FindFirst(ClaimTypes.Role)?.Value;  // Lấy role từ token

            if (userId != id.ToString() && role != "Manager" && role != "Staff")

            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            var query = new GetCustomerByIdQuery(id);
            var customer = await _mediator.Send(query);
            if (customer == null)
            {
                return BadRequest(new { message = "Không tìm thấy khách hàng!" });
            }
            return Ok(customer);
        }

        [HttpGet("count")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> GetCustomerCount()
        {
            var query = new GetCustomersCountQuery();
            var count = await _mediator.Send(query);
            return Ok(new { totalCount = count });
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer(CreateCustomerCommand command)
        {
            var customerId = await _mediator.Send(command);
            if (customerId == null)
            {
                return BadRequest(new { message = "Thêm khách hàng không thành công!" });
            }
            return Ok(new { message = "Thêm khách hàng thành công!", customerId });
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> UpdateCustomer(int id, UpdateCustomerCommand command)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;  // Lấy userId từ token

            if (userId != id.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            if (id != command.CustomerId)
            {
                return BadRequest(new { message = "Id không khớp!" });
            }

            var result = await _mediator.Send(command);

            if (!result)
            {
                return BadRequest(new { message = "Cập nhật thông tin khách hàng không thành công!" });
            }
            return Ok(new { message = "Cập nhật thông tin khách hàng thành công!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCustomerQuery query)
        {
            var loginData = await _mediator.Send(query);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                Expires = DateTime.UtcNow.AddHours(12),
                SameSite = SameSiteMode.None,
                MaxAge = TimeSpan.FromHours(12),
            };
            Response.Cookies.Append("accessToken", loginData.Token, cookieOptions);

            return Ok(loginData);
        }

        [HttpPost("logout")]
        //[Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> Logout()
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != null)
            {
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false,
                    Expires = DateTime.UtcNow.AddHours(-1),
                    SameSite = SameSiteMode.None,
                    MaxAge = TimeSpan.FromHours(-1),
                };

                Response.Cookies.Append("accessToken", "", cookieOptions);  // Ghi đè cookie với thời gian hết hạn
            }

            // Nếu bạn có cơ chế blacklist cho access token
            //var accessToken = Request.Cookies["accessToken"];  // Lấy token từ cookie (nếu có)
            //if (!string.IsNullOrEmpty(accessToken))
            //{
            //    // Gọi service hoặc repository để thêm token vào blacklist (nếu có)
            //    await _mediator.Send(new BlacklistTokenCommand(accessToken));
            //}

            return Ok(new { message = "Đăng xuất thành công!" });

        }

    }
}
