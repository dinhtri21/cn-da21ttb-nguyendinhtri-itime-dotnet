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
            try
            {
                var query = new GetAllCustomersQuery();
                var customers = await _mediator.Send(query);
                if (customers.Count() == 0)
                {
                    return BadRequest(new { message = "Không có khách hàng nào!" });
                }
                return Ok(customers);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost]
        public async Task<IActionResult> AddCustomer(CreateCustomerCommand command)
        {
            try
            {
                var customerId = await _mediator.Send(command);
                if (customerId == null)
                {
                    return BadRequest(new { message = "Thêm khách hàng không thành công!" });
                }
                return Ok(new { message = "Thêm khách hàng thành công!", customerId });


            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> UpdateCustomer(int id, UpdateCustomerCommand command)
        {
            try
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
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> AdminLogin([FromBody] LoginCustomerQuery query) 
        {
            try
            {
                var token = await _mediator.Send(query);
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTime.UtcNow.AddMinutes(3)
                };
                Response.Cookies.Append("accessToken", token, cookieOptions);
                return Ok(new { message = "Đăng nhập thành công!" });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
