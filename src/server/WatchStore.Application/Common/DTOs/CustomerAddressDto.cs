using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class CustomerAddressDto
    {
        public int AddressId { get; set; }
        public int CustomerId { get; set; }
        public string AddressLine { get; set; } 
        public string Province { get; set; }   
        public int ProvinceId { get; set; }
        public string District { get; set; }    
        public int DistrictId { get; set; }
        public string Ward { get; set; }   
        public int WardId { get; set; }
        public string ZipCode { get; set; }    
        public bool IsDefault { get; set; }
    }
}
