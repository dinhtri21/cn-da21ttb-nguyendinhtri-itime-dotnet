using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Common.Interfaces
{
    public interface IGhtkService
    {
        Task<GhtkShippingFeeResponseDto> GetGhtkFeeAsync(
           string address, string province, string district,
           string pickProvince, string pickDistrict, int weight,
           string deliverOption);
    }
}
