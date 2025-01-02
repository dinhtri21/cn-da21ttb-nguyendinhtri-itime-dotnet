using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards
{
    public class GetWardResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public List<Ward> Data { get; set; }
    }
    public class Ward
    {
        [JsonProperty("WardCode")]
        public string WardCode { get; set; }

        [JsonProperty("DistrictID")]
        public int DistrictID { get; set; }

        [JsonProperty("WardName")]
        public string WardName { get; set; }

    }
}
