using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.GetOrderInfo
{
    public class GetOrderInfoRequest
    {
        [JsonProperty("order_code")]
        public string OrderCode { get; set; }
    }
}
