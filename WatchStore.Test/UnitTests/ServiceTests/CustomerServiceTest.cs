using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Domain.Entities;
using Moq;
using WatchStore.Test.TestHelpers;
using System.Net.Sockets;
using WatchStore.Application.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.Common.Services;
using WatchStore.Application.Common.Mappings;


namespace WatchStore.Test.UnitTests
{
    public class CustomerServiceTest
    {
        private readonly Mock<ICustomerRepository> _mockCustomerRepository;
        private readonly IMapper _mapper;
        private readonly CustomerService _customerService;

        public CustomerServiceTest()
        {
            // Cấu hình AutoMapper
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<CustomerMappingProfile>();
            });
            _mapper = config.CreateMapper();

            // Tạo đối tượng mock cho ICustomerRepository
            _mockCustomerRepository = new Mock<ICustomerRepository>();

            // Tạo instance của CustomerService
            _customerService = new CustomerService(_mockCustomerRepository.Object, _mapper);
        }

        [Fact]
        public async Task GetAllCustomerAsync_ShouldReturnAllCustomers()
        {
            // 1. Arrange - Bố trí
            //Tạo danh sách các khách hàng giả lập(mocked data)
            var customers = new List<Customer>
            {
                new Customer { CustomerId = 1, FullName = "Customer 1", PhoneNumber = "0123456789", Address = "Address 1", Email = "abc@" },
                new Customer { CustomerId = 2, FullName = "Customer 2", PhoneNumber = "0987654321", Address = "Address 2", Email = "def@" }
            };

            // Cấu hình mock repository trả về danh sách này khi gọi phương thức GetAllCustomerAsync
            _mockCustomerRepository.Setup(repo => repo.GetAllCustomerAsync()).ReturnsAsync(customers);

            // 2. Act - Hành động
            var result = await _customerService.GetAllCustomerAsync();

            // 3. Assert - Kiểm tra
            Assert.NotNull(result); // Đảm bảo không null
            Assert.Equal(2, result.Count()); // Đảm bảo số lượng khách trả về là 2 
            Assert.Equal("Customer 1", result.First().FullName); // Đảm bảo đúng khách hàng đầu tiên
            Assert.Equal("Customer 2", result.Last().FullName); // Đảm bảo đúng khách hàng cuối cùng
        }
        [Fact]
        public async Task CreateCustomerAsync_ShouldCreateNewCustomer()
        {
            // Arrange
            var customerDto = new CustomerDto
            {
                FullName = "Customer 1",
                PhoneNumber = "0123456789",
                Address = "Address 1",
                Email = "abc@"
            };
            
            // Act
            await _customerService.CreateCustomerAsync(customerDto);

            // Assert
            //đảm bảo rằng khi phương thức CreateCustomerAsync của CustomerService được gọi,
            //nó sẽ gọi AddCustomerAsync của ICustomerRepository đúng một lần với một đối tượng Customer
            //có các thuộc tính giống như customerDto.
            // => Tóm lại CreateCustomerAsync có gọi AddCustomerAsync của
            // ICustomerRepository một lần với đúng đối tượng Customer.
            _mockCustomerRepository.Verify(repo => repo.AddCustomerAsync(It.Is<Customer>(c =>
               c.FullName == customerDto.FullName &&
               c.PhoneNumber == customerDto.PhoneNumber &&
               c.Address == customerDto.Address &&
               c.Email == customerDto.Email
           )), Times.Once);
        }       
    }
}
