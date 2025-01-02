using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict
{
    public class GetDistrictResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public List<District> Data { get; set; }
    }

    public class District
    {
        [JsonProperty("DistrictID")]
        public int DistrictID { get; set; }

        [JsonProperty("ProvinceID")]
        public int ProvinceID { get; set; }

        [JsonProperty("DistrictName")]
        public string DistrictName { get; set; }

        //[JsonProperty("Code")]
        //public string Code { get; set; }

        //[JsonProperty("Type")]
        //public int Type { get; set; }

        //[JsonProperty("SupportType")]
        //public int SupportType { get; set; }

        //[JsonProperty("NameExtension")]
        //public List<string> NameExtension { get; set; }

        //[JsonProperty("IsEnable")]
        //public int IsEnable { get; set; }

        //[JsonProperty("CanUpdateCOD")]
        //public bool CanUpdateCOD { get; set; }

        //[JsonProperty("Status")]
        //public int Status { get; set; }

        //[JsonProperty("PickType")]
        //public int PickType { get; set; }

        //[JsonProperty("DeliverType")]
        //public int DeliverType { get; set; }

        //[JsonProperty("WhiteListClient")]
        //public WhiteListClient WhiteListClient { get; set; }

        //[JsonProperty("WhiteListDistrict")]
        //public WhiteListDistrict WhiteListDistrict { get; set; }

        //[JsonProperty("ReasonCode")]
        //public string ReasonCode { get; set; }

        //[JsonProperty("ReasonMessage")]
        //public string ReasonMessage { get; set; }

        //[JsonProperty("OnDates")]
        //public string? OnDates { get; set; } // Nullable vì không phải lúc nào cũng có giá trị

        //[JsonProperty("CreatedIP")]
        //public string CreatedIP { get; set; }

        //[JsonProperty("CreatedEmployee")]
        //public int? CreatedEmployee { get; set; } // Nullable

        //[JsonProperty("CreatedSource")]
        //public string CreatedSource { get; set; }

        //[JsonProperty("CreatedDate")]
        //public string CreatedDate { get; set; }

        //[JsonProperty("UpdatedEmployee")]
        //public int? UpdatedEmployee { get; set; } // Nullable

        //[JsonProperty("UpdatedDate")]
        //public string? UpdatedDate { get; set; } // Nullable
    }

    public class WhiteListClient
    {
        [JsonProperty("From")]
        public List<object> From { get; set; }

        [JsonProperty("To")]
        public List<object> To { get; set; }

        [JsonProperty("Return")]
        public List<object> Return { get; set; }
    }

    public class WhiteListDistrict
    {
        [JsonProperty("From")]
        public object From { get; set; }

        [JsonProperty("To")]
        public object To { get; set; }
    }
}
