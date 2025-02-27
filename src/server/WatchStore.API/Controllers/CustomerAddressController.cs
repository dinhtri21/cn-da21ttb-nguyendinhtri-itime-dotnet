﻿using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WatchStore.Application.CustomerAddresses.Commands.CreateCustomerAddress;
using WatchStore.Application.CustomerAddresses.Commands.DeleteCustomerAddress;
using WatchStore.Application.CustomerAddresses.Commands.UpdateCustomerAddress;
using WatchStore.Application.CustomerAddresses.Queries.GetCustomerAddress;
using WatchStore.Application.CustomerAddresses.Queries.GetDistrict;
using WatchStore.Application.CustomerAddresses.Queries.GetProvince;
using WatchStore.Application.CustomerAddresses.Queries.GetWard;
using WatchStore.Domain.Entities;

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

        [HttpGet("provinces")]
        public async Task<IActionResult> GetProvince()
        {

            var provinces = await _mediator.Send(new GetProvinceQuery());

            if (provinces == null)
            {
                return NotFound(new { message = "Không tìm thấy tỉnh nào!" });
            }

            return Ok(provinces);

        }

        [HttpGet("districts")]
        public async Task<IActionResult> GetDistrict([FromQuery] int provinceId)
        {

            var districts = await _mediator.Send(new GetDistrictQuery() { ProvinceID = provinceId });

            if (districts == null)
            {
                return NotFound(new { message = "Không tìm thấy quận/huyện nào!" });
            }

            return Ok(districts);

        }

        [HttpGet("wards")]
        public async Task<IActionResult> GetWard([FromQuery] int districtId)
        {

            var wards = await _mediator.Send(new GetWardQuery() { DistrictID = districtId });

            if (wards == null)
            {
                return NotFound(new { message = "Không tìm thấy phường/xã nào!" });
            }

            return Ok(wards);

        }


        [HttpPost]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> CreateCustomerAddressAsync([FromBody] CreateCustomerAddressCommand command)
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

        [HttpPut("{id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> UpdateCustomerAddressAsync([FromRoute(Name = "id")] int id, [FromBody] UpdateCustomerAddressCommand command)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId != command.CustomerId.ToString())
            {
                return Unauthorized(new { message = "Bạn không có quyền truy cập tài nguyên này!" });
            }

            if (id != command.AddressId)
            {
                return BadRequest(new { message = "Id không khớp!" });
            }

            var result = await _mediator.Send(command);

            if (result == null)
            {
                return BadRequest(new { message = "Cập nhật địa chỉ khách hàng không thành công!" });
            }

            return Ok(new { message = "Cập nhật địa chỉ thành công!", customerAddress = result });

        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "CustomerPolicy")]
        public async Task<IActionResult> DeleteCustomerAddressAsync([FromRoute(Name = "id")] int id)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _mediator.Send(new DeleteCustomerAddressCommand(id, int.Parse(userId)));

            if (result == 0)
            {
                return BadRequest(new { message = "Xóa địa chỉ khách hàng không thành công!" });
            }

            return Ok(new { message = "Xoá địa chỉ thành công!", customerAddress = result });
        }

    }
}
