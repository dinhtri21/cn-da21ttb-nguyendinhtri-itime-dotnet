using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetProvince;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CancelOrder;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CreateOrder;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.GetOrderInfo;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IGiaoHanhNhanhService
    {
        Task<CalculateFeeResponse> CalculateFeeAsync(CalculateFeeRequest request);
        Task<GetProvinceResponse> GetProvinceAsync();
        Task<GetDistrictResponse> GetDistrictAsync(GetDistrictRequest request);
        Task<GetWardResponse> GetWardAsync(GetWardRequest request);
        Task<GetServiceResponse> GetServiceAsync(GetServiceRequest request);
        Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request);
        Task<GetOrdeInfoResponse> GetOrderInfoAsync(GetOrderInfoRequest request);
        Task<CancelOrderResponse> CancelOrder (CalculateFeeRequest request);

    }
}
