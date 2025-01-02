using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetProvince
{
    public class GetProvinceResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public List<Province> Data { get; set; }
    }
    public class Province
    {
        [JsonProperty("ProvinceID")]
        public int ProvinceID { get; set; }

        [JsonProperty("ProvinceName")]
        public string ProvinceName { get; set; }

        [JsonProperty("CountryID")]
        public int CountryID { get; set; }

        [JsonProperty("Code")]
        public string Code { get; set; }

        [JsonProperty("NameExtension")]
        public List<string> NameExtension { get; set; }

        [JsonProperty("IsEnable")]
        public int IsEnable { get; set; }

        [JsonProperty("RegionID")]
        public int RegionID { get; set; }

        [JsonProperty("RegionCPN")]
        public int RegionCPN { get; set; }

        [JsonProperty("UpdatedBy")]
        public int UpdatedBy { get; set; }

        [JsonProperty("CreatedAt")]
        public string CreatedAt { get; set; }

        [JsonProperty("UpdatedAt")]
        public string UpdatedAt { get; set; }

        [JsonProperty("AreaID")]
        public int? AreaID { get; set; }  // Nullable vì không phải tất cả bản ghi đều có

        [JsonProperty("CanUpdateCOD")]
        public bool CanUpdateCOD { get; set; }

        [JsonProperty("Status")]
        public int Status { get; set; }

        [JsonProperty("UpdatedIP")]
        public string UpdatedIP { get; set; }

        [JsonProperty("UpdatedEmployee")]
        public int? UpdatedEmployee { get; set; }  // Nullable vì không phải lúc nào cũng có giá trị

        [JsonProperty("UpdatedSource")]
        public string UpdatedSource { get; set; }

        [JsonProperty("UpdatedDate")]
        public string? UpdatedDate { get; set; }  // Nullable vì không phải mọi bản ghi đều chứa giá trị này
    }
}
