using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.CancelOrder
{
    public class CancelOrderRequest
    {
        [JsonProperty("order_codes")]
        public List<string> OrderCode { get; set; }
    }
}
