using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetProvince;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService;

namespace WatchStore.Infrastructure.Services.GiaoHanhNhanhService
{
    public class GiaoHangNhanhService : IGiaoHanhNhanhService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GiaoHangNhanhService(HttpClient httpClient , IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }
       
        public async Task<CalculateFeeResponse> CalculateFeeAsync(CalculateFeeRequest request)
        {
            _httpClient.DefaultRequestHeaders.Add("ShopId", _configuration["GHNService:ShopId"]);
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/shiip/public-api/v2/shipping-order/fee", content);


            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error when calling GHN API: {response.StatusCode} - {errorContent}");
            }

            var result = JsonConvert.DeserializeObject<CalculateFeeResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }

        public async Task<GetDistrictResponse> GetDistrictAsync(GetDistrictRequest request)
        {
            // Chuyển request thành json
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Tạo HttpRequestMessage
            var httpRequest = new HttpRequestMessage(HttpMethod.Get, "shiip/public-api/master-data/district")
            {
                Content = content // Thêm body vào yêu cầu get
            };

            // Gửi yêu cầu
            var response = await _httpClient.SendAsync(httpRequest);

            // Xử lý kết quả
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error when calling GetProvince API: {response.StatusCode} - {errorContent}");
            }

            var result = JsonConvert.DeserializeObject<GetDistrictResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }

        public async Task<GetProvinceResponse> GetProvinceAsync()
        {
            var response = await _httpClient.GetAsync("/shiip/public-api/master-data/province");

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error when calling GetProvince API: {response.StatusCode} - {errorContent}");
            }

            var result = JsonConvert.DeserializeObject<GetProvinceResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }

        public async Task<GetServiceResponse> GetServiceAsync(GetServiceRequest request)
        {
            _httpClient.DefaultRequestHeaders.Add("ShopId", _configuration["GHNService:ShopId"]);
            request.ShopID = Convert.ToInt32(_configuration["GHNService:ShopId"]);

            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("/shiip/public-api/v2/shipping-order/available-services", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error when calling GetServiceAsync API: {response.StatusCode} - {errorContent}");
            }

            var result = JsonConvert.DeserializeObject<GetServiceResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }

        public async Task<GetWardResponse> GetWardAsync(GetWardRequest request)
        {
            // Chuyển request thành json
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            // Tạo HttpRequestMessage
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, $"/shiip/public-api/master-data/ward?district_id={request.DistrictID}")
            {
                Content = content
            };

            // Gửi yêu cầu
            var response = await _httpClient.SendAsync(httpRequest);

            // Xử lý kết quả
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error when calling GetWard API: {response.StatusCode} - {errorContent}");
            }

            var result = JsonConvert.DeserializeObject<GetWardResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }
    }
}
