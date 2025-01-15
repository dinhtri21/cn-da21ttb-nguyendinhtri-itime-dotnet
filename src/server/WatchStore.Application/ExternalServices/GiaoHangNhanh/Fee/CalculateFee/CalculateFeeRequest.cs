using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee
{
    public class CalculateFeeRequest
    {
        [JsonProperty("service_id")]
        public int ServiceId { get; set; }

        [JsonProperty("service_type_id")]
        public int? ServiceTypeId { get; set; }

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

        [JsonProperty("items")]
        public Items[] Items { get; set; }

    }

    public class Items
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
