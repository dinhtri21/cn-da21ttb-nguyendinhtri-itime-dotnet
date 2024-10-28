using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class GhtkProvinceDto
    {
        //"ProvinceID": 269,
        //    "ProvinceName": "Lào Cai",
        //    "CountryID": 1,
        //    "Code": "20",
        //    "NameExtension": [
        //        "Lào Cai",
        //        "Tỉnh Lào Cai",
        //        "T.Lào Cai",
        //        "T Lào Cai",
        //        "laocai"
        //    ],
        //    "IsEnable": 1,
        //    "RegionID": 6,
        //    "RegionCPN": 5,
        //    "UpdatedBy": 1718600,
        //    "CreatedAt": "2019-12-05 15:41:26.891384 +0700 +07 m=+0.010448463",
        //    "UpdatedAt": "2019-12-05 15:41:26.891384 +0700 +07 m=+0.010449016",
        //    "AreaID": 1,
        //    "CanUpdateCOD": false,
        //    "Status": 1,
        //    "UpdatedIP": "103.191.145.200",
        //    "UpdatedEmployee": 209749,
        //    "UpdatedSource": "internal",
        //    "UpdatedDate": "2024-06-19T10:40:21.091Z"

        public int ProvinceID { get; set; }
        public string ProvinceName { get; set; }
        public int CountryID { get; set; }
    }

    public class GhtkProvinceResponseDto
    {
        public int code { get; set; }
        public List<GhtkProvinceDto> data { get; set; }
        public string message { get; set; }
    }
}
