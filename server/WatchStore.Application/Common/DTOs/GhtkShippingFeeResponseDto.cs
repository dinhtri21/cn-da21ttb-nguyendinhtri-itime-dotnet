using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class GhtkShippingFeeResponseDto
    {
        public bool success { get; set; }
        public FeeDto fee { get; set; }
        public string message { get; set; }
    }

    public class FeeDto
    {
        public string name { get; set; }
        public decimal fee { get; set; }
        public decimal insurance_fee { get; set; }
        public int include_vat { get; set; }
        public int cost_id { get; set; }
        public string delivery_type { get; set; }
        public string dt { get; set; }
        public List<ExtFeeDto> extFees { get; set; }
        public bool delivery { get; set; }
        public decimal ship_fee_only { get; set; }
        public double distance { get; set; }
        public OptionsDto options { get; set; }
    }

    public class ExtFeeDto
    {
        public string display { get; set; }
        public string title { get; set; }
        public decimal amount { get; set; }
        public string type { get; set; }
        public int tag_id { get; set; }
    }

    public class OptionsDto
    {
        public string name { get; set; }
        public string title { get; set; }
        public decimal shipMoney { get; set; }
        public string shipMoneyText { get; set; }
        public string vatText { get; set; }
        public string desc { get; set; }
        public string coupon { get; set; }
        public int maxUses { get; set; }
        public int maxDates { get; set; }
        public string maxDateString { get; set; }
        public string content { get; set; }
        public string activatedDate { get; set; }
        public string couponTitle { get; set; }
        public string discount { get; set; }
    }
}
