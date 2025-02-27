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
using WatchStore.API.Configuration.Repository;
using WatchStore.API.Configuration.HttpClient;
using WatchStore.API.Configuration.Swagger;
using WatchStore.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// FluentValidation
builder.Services.AddControllers()
 .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<IValidatorMarker>());

// DbContext
builder.Services.AddDbContext<WatchStoreDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 28))));

// CORS
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policy =>
        {
            policy.WithOrigins(allowedOrigins ?? new string[] { })
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
});

// Environment
builder.Services.AddSingleton<IWebHostEnvironment>(builder.Environment);

// MediatR
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IApplicationMarker).Assembly));

// Repository
builder.Services.AddRepositories();

// AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// HttpClient
builder.Services.AddGiaoHangNhanhHttpClient(builder.Configuration);

// Authentication
builder.Services.AddJwtAuthentication(builder.Configuration["Jwt:key"]);

// Authorization
builder.Services.AddAuthorizationPolicy();

// Swagger
builder.Services.AddSwaggerDocumentation();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
    app.UseSwaggerUI();
}

// Static Files
app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin"); 
app.UseAuthentication(); 
app.UseAuthorization(); 
app.MapControllers();
app.Run();
