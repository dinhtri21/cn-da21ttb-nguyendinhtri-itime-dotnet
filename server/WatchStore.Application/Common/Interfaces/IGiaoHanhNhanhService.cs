using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetProvince;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IGiaoHanhNhanhService
    {
        Task<CalculateFeeResponse> CalculateFeeAsync(CalculateFeeRequest request);
        Task<GetProvinceResponse> GetProvinceAsync();
        Task<GetDistrictResponse> GetDistrictAsync(GetDistrictRequest request);
    }
}
