using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetService
{
    public class GetServiceResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public List<Service> Data { get; set; }
    }

    public class Service
    {
        [JsonProperty("service_id")]
        public int ServiceID { get; set; }

        [JsonProperty("short_name")]
        public string ShortName { get; set; }

        [JsonProperty("service_type_id")]
        public int ServiceTypeID { get; set; }
       
    }
}
