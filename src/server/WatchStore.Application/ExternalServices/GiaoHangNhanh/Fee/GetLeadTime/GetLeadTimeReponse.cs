using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.GetLeadTime
{
    public class GetLeadTimeReponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public LeadTimeData Data { get; set; }
    }
    public class LeadTimeData
    {
        [JsonProperty("lead_time")]
        public int LeadTime { get; set; }

        [JsonProperty("leadtime_order")]
        public LeadTimeOrder LeadTimeOrder { get; set; }
    }
    public class LeadTimeOrder
    {
        [JsonProperty("from_estimate_date")]
        public string FromEstimateDate { get; set; }
        [JsonProperty("to_estimate_date")]
        public string ToEstimateDate { get; set; }
    }
}
