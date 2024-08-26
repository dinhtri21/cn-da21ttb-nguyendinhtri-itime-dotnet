﻿namespace WatchStore.API.Configuration.Authorization
{
    public static class AuthorizationConfiguration
    {
        public static void AddAuthorizationPolicy (this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("ManagerPolicy", policy => policy.RequireRole("Manager"));
                options.AddPolicy("StaffPolicy", policy => policy.RequireRole("Staff"));
                options.AddPolicy("AdminPolicy", policy => policy.RequireRole("Manager", "Staff"));
                options.AddPolicy("CustomerPolicy", policy => policy.RequireRole("Customer"));
            });
        }
    }
}
