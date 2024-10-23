using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IShippingService
    {
        Task<GhtkShippingFeeResponseDto> GetShippingFeeAsync(
           string address, string province, string district,
           string pickProvince, string pickDistrict, int weight, int value,
           string deliverOption);
    }
}
