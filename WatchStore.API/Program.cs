﻿using Microsoft.EntityFrameworkCore;
using WatchStore.Infrastructure.Data;
using WatchStore.Infrastructure.Repositories;
using WatchStore.Application.Common.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using WatchStore.API.Configuration.Authentication;
using WatchStore.API.Configuration.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Đăng ký với DI container
builder.Services.AddControllers()
 .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IValidatorMarker>());

builder.Services.AddDbContext<WatchStoreDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 28))));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IApplicationMarker).Assembly));
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IBaseRepository, BaseRepository>();
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IAdminRoleRepository, AdminRoleRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseHttpsRedirection();

app.UseAuthentication(); // Xác thực

app.UseAuthorization(); // Phân quyền

app.MapControllers();

app.Run();
