using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WatchStore.Application.Interfaces;
using WatchStore.Application.DTOs;

namespace WatchStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCustomer()
        {
            var customers = await _customerService.GetAllCustomerAsync();
            return Ok(customers);
        }
        [HttpPost]
        public async Task<IActionResult> AddCustomer(CustomerDto customer)
        {
            await _customerService.CreateCustomerAsync(customer);
            return StatusCode(StatusCodes.Status201Created);
        }

    }
}
