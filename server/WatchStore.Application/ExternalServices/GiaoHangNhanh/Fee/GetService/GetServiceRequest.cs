using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService
{
    public class GetServiceRequest
    {
        [JsonProperty("shop_id")]
        public int ShopID { get; set; }

        [JsonProperty("from_district")]
        public int FromDistrict { get; set; }

        [JsonProperty("to_district")]
        public int ToDistrict { get; set; }
    }
}
