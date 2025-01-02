using WatchStore.Application.Common.Interfaces;
using WatchStore.Infrastructure.Services.GiaoHanhNhanhService;

namespace WatchStore.API.Configuration.HttpClient
{
    public static class HttpClientConfig
    {
        public static IServiceCollection AddGiaoHangNhanhHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient<IGiaoHanhNhanhService, GiaoHangNhanhService>(client =>
            {
                client.BaseAddress = new Uri(configuration["GHNService:BaseUrl"]);
                client.DefaultRequestHeaders.Add("Token", configuration["GHNService:Token"]);
            });

            return services;
        }
    }
}
