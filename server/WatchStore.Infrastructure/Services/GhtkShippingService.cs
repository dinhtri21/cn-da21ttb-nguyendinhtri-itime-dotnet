using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Infrastructure.Services
{
    public class GhtkShippingService : IShippingService
    {
        private readonly HttpClient _httpClient;

        public GhtkShippingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<GhtkShippingFeeResponseDto> GetShippingFeeAsync(
            string address, string province, string district,
            string pickProvince, string pickDistrict, int weight, int value,
            string deliverOption)
        {
            var uri = $"services/shipment/fee?" +
                        $"address={Uri.EscapeDataString(address)}" +
                        $"&province={Uri.EscapeDataString(province)}" +
                        $"&district={Uri.EscapeDataString(district)}" +
                        $"&pick_province={Uri.EscapeDataString(pickProvince)}" +
                        $"&pick_district={Uri.EscapeDataString(pickDistrict)}" +
                        $"&weight={weight}&value={value}&deliver_option={deliverOption}";

            var response = await _httpClient.GetAsync(uri);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<GhtkShippingFeeResponseDto>(content, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Convert property name to camelCase
                PropertyNameCaseInsensitive = true                  // Ignore case when deserializing
            });
        }
    }
}

