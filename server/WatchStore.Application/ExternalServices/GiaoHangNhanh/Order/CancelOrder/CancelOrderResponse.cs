using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CancelOrder
{
    public class CancelOrderResponse
    {
        [JsonProperty("code")]
        public string Code { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
        [JsonProperty("data")]
        public string Data { get; set; }
    }
    public class Data
    {
        [JsonProperty("order_code")]
        public string OrderCode { get; set; }
        [JsonProperty("result")]
        public string Result { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
