using Microsoft.OpenApi.Models;

namespace WatchStore.API.Configuration.Swagger
{
    public static class SwaggerConfig
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "WatchStore API",
                    Version = "v1",
                    Description = "API documentation for WatchStore project",
                    Contact = new OpenApiContact
                    {
                        Name = "Your Name",
                        Email = "your.email@example.com",
                    }
                });

                // Cấu hình nút Authorize
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "Nhập JWT Token ở định dạng: Bearer {token}"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "WatchStore API v1");
                c.RoutePrefix = string.Empty; // Hiển thị Swagger ở root URL
            });

            return app;
        }
    }
}
