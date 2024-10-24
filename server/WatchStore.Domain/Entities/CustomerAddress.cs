using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Domain.Entities
{
    public class CustomerAddress
    {
        public int AddressId { get; set; }  
        public int CustomerId { get; set; } 
        public string AddressLine { get; set; } // Số nhà, tên đường
        public string Ward { get; set; }        // Phường/xã
        public string District { get; set; }    // Quận/huyện
        public string Province { get; set; }    // Tỉnh/thành phố
        public string ZipCode { get; set; }     // Mã bưu điện
        public bool IsDefault { get; set; } // Địa chỉ mặc định
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation Property
        public Customer Customer { get; set; }
    }
}
