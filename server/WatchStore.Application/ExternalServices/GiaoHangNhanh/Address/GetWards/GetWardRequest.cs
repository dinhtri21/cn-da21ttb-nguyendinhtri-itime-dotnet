using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards
{
    public class GetWardRequest
    {
        [JsonProperty("district_id")]
        public int DistrictID { get; set; }
    }
}
