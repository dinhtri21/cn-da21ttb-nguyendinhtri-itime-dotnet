using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using WatchStore.Application.CustomerAddresses.Commands.CreateCustomerAddress;
using WatchStore.Application.CustomerAddresses.Commands.DeleteCustomerAddress;
using WatchStore.Application.CustomerAddresses.Queries.GetCustomerAddress;

namespace WatchStore.API.Controllers
{
    [Route("api/customer-address")]
    [ApiController]
    public class CustomerAddressController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CustomerAddressController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpGet("customer/{customer-id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> GetCustomerAddressesByCustomerIdAsync([FromRoute(Name = "customer-id")] int customerId)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId != customerId.ToString())
                {
                    return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
                }

                var customerAddresses = await _mediator.Send(new CustomerAddressQuery(customerId));

                if (customerAddresses == null)
                {
                    return NotFound(new { message = "Không tìm thấy địa chỉ khách hàng!" });
                }

                return Ok(customerAddresses);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        [HttpPost]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> CreateCustomerAddressAsync([FromBody] CreateCustomerAddressCommand command)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId != command.CustomerId.ToString())
                {
                    return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
                }

                var result = await _mediator.Send(command);

                if (result == null)
                {
                    return BadRequest(new { message = "Thêm địa chỉ khách hàng không thành công!" });
                }

                return Ok(new { message = "Thêm địa chỉ thành công!", customerAddress = result });
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

        [HttpDelete("{id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> DeleteCustomerAddressAsync([FromRoute(Name = "id")] int id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var result = await _mediator.Send(new DeleteCustomerAddressCommand(id, int.Parse(userId)));
                if (result == 0)
                {
                    return BadRequest(new { message = "Xóa địa chỉ khách hàng không thành công!" });
                }

                return Ok(new { message = "Xoá địa chỉ thành công!", customerAddress = result });
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
