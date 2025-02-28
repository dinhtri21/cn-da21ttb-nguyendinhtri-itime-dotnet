using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetLeadTime
{
    public class GetLeadTimeRequest
    {
        //[JsonProperty("shop_id")]
        //public int ShopId { get; set; }

        //[JsonProperty("from_district_id")]
        //public int FromDistrictId { get; set; }

        //[JsonProperty("from_ward_code")]
        //public string FromWardCode { get; set; }

        [JsonProperty("to_district")]
        public int ToDistrict { get; set; }

        [JsonProperty("to_district_id")]
        public int ToDistrictId { get; set; }

        [JsonProperty("to_ward_code")]
        public string ToWardCode { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("service_id")]
        public int ServiceId { get; set; }

        [JsonProperty("items")]
        public ItemsLeadTime[] Items { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

    }
    public class ItemsLeadTime
    {
        [JsonProperty("name")]
        public string name { get; set; }
        [JsonProperty("quantity")]
        public int quantity { get; set; }
        [JsonProperty("height")]
        public int height { get; set; }
        [JsonProperty("weight")]
        public int weight { get; set; }
        [JsonProperty("length")]
        public int length { get; set; }
        [JsonProperty("width")]
        public int width { get; set; }
    }
}
