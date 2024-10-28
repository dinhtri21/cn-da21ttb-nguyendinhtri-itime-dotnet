using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Infrastructure.Services.GhtkService
{
    public class GhtkShippingService : IGhtkService
    {
        private readonly HttpClient _httpClient;

        public GhtkShippingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<GhtkShippingFeeResponseDto> GetGhtkFeeAsync(
            string address, string province, string district,
            string pickProvince, string pickDistrict, int weight,
            string deliverOption)
        {
            var uri = $"services/shipment/fee?" +
                        $"address={Uri.EscapeDataString(address)}" +
                        $"&province={Uri.EscapeDataString(province)}" +
                        $"&district={Uri.EscapeDataString(district)}" +
                        $"&pick_province={Uri.EscapeDataString(pickProvince)}" +
                        $"&pick_district={Uri.EscapeDataString(pickDistrict)}" +
                        $"&weight={weight}&deliver_option={deliverOption}";

            var response = await _httpClient.GetAsync(uri);

            response.EnsureSuccessStatusCode();

            // Đọc nội dung trả về từ API
            var content = await response.Content.ReadAsStringAsync();

            // Giải mã JSON thành đối tượng GhtkShippingFeeResponseDto
            return JsonSerializer.Deserialize<GhtkShippingFeeResponseDto>(content, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase, // Tên thuộc tính trong JSON sẽ được xử lý theo chuẩn camelCase.
                PropertyNameCaseInsensitive = true                  // Bỏ qua sự phân biệt chữ hoa và chữ thường khi ánh xạ các thuộc tính từ JSON vào đối tượng.
            });
        }
    }
}

