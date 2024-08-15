using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using WatchStore.Application.Customers.Commands.CreateCustomer;
using FluentValidation;
using WatchStore.Application.Customers.Queries.GetAllCustomers;

namespace WatchStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)

        {
            _mediator = mediator;
        }

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
                return Ok(new { message = "Thêm khách hàng thành công!" });


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
