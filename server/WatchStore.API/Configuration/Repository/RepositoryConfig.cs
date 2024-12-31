using WatchStore.Application.Common.Interfaces;
using WatchStore.Infrastructure.Repositories;
using WatchStore.Infrastructure.Services.GiaoHanhNhanhService;

namespace WatchStore.API.Configuration.Repository
{
    public static class RepositoryConfig
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderDetailRepository, OrderDetailRepository>();
            services.AddScoped<IPaymentRepository, PaymentRepository>();
            services.AddScoped<IBaseRepository, BaseRepository>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IAdminRoleRepository, AdminRoleRepository>();
            services.AddScoped<ICartRepository, CartRepository>();
            services.AddScoped<ICartItemRepository, CartItemRepository>();
            services.AddScoped<ICustomerAddressRepository, CustomerAddressRepository>();
            services.AddScoped<IGiaoHanhNhanhService, GiaoHangNhanhService>();
            services.AddScoped<IShippingRepository, ShippingRepository>();
            services.AddScoped<IBrandRepository, BrandRepository>();
            services.AddScoped<IMaterialRepository, MaterialRepository>();
            return services;
        }
    }
}
