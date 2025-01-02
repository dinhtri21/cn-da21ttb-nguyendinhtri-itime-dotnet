using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict
{
    public class GetDistrictRequest
    {
        [JsonProperty("province_id")]
        public int ProvinceID { get; set; }
    }
}
