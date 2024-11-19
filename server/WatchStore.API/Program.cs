using Microsoft.EntityFrameworkCore;
using WatchStore.Infrastructure.Data;
using WatchStore.Infrastructure.Repositories;
using WatchStore.Application.Common.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using WatchStore.API.Configuration.Authentication;
using WatchStore.API.Configuration.Authorization;
using WatchStore.Infrastructure.Services.GiaoHanhNhanhService;
using Microsoft.AspNetCore.Hosting;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký FluentValidation
builder.Services.AddControllers()
 .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IValidatorMarker>());

// Đăng ký DbContext
builder.Services.AddDbContext<WatchStoreDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 28))));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                   .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
        });
});

builder.Services.AddSingleton<IWebHostEnvironment>(builder.Environment);


// Đăng ký MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IApplicationMarker).Assembly));

// Đăng ký Repository
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IBaseRepository, BaseRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IAdminRoleRepository, AdminRoleRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();
builder.Services.AddScoped<ICartItemRepository, CartItemRepository>();
builder.Services.AddScoped<ICustomerAddressRepository, CustomerAddressRepository>();
builder.Services.AddScoped<IGiaoHanhNhanhService, GiaoHangNhanhService>();
builder.Services.AddScoped<IShippingRepository, ShippingRepository>();

// Đăng ký AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Đăng ký Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đăng ký HttpClient
builder.Services.AddHttpClient<IGiaoHanhNhanhService, GiaoHangNhanhService>(client =>
{
    client.BaseAddress = new Uri(builder.Configuration["GHNService:BaseUrl"]);
    client.DefaultRequestHeaders.Add("Token", builder.Configuration["GHNService:Token"]);
});

// Authentication
builder.Services.AddJwtAuthentication(builder.Configuration["Jwt:key"]);
// Authorization
builder.Services.AddAuthorizationPolicy();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Cấu hình để phục vụ các tệp tĩnh từ wwwroot
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin"); // CORS
app.UseAuthentication(); // Xác thực
app.UseAuthorization(); // Phân quyền
app.MapControllers();
app.Run();
