using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.ExternalServices.GiaoHangNhanh.Order.GetOrderInfo
{
    public class GetOrdeInfoResponse
    {
        [JsonProperty("code")]
        public int Code { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("data")]
        public OrderData Data { get; set; }
    }

    public class OrderData
    {
        [JsonProperty("shop_id")]
        public int ShopId { get; set; }

        [JsonProperty("client_id")]
        public int ClientId { get; set; }

        [JsonProperty("return_name")]
        public string ReturnName { get; set; }

        [JsonProperty("return_phone")]
        public string ReturnPhone { get; set; }

        [JsonProperty("return_address")]
        public string ReturnAddress { get; set; }

        [JsonProperty("return_ward_code")]
        public string ReturnWardCode { get; set; }

        [JsonProperty("return_district_id")]
        public int ReturnDistrictId { get; set; }

        [JsonProperty("return_location")]
        public Location ReturnLocation { get; set; }

        [JsonProperty("from_name")]
        public string FromName { get; set; }

        [JsonProperty("from_phone")]
        public string FromPhone { get; set; }

        [JsonProperty("from_hotline")]
        public string FromHotline { get; set; }

        [JsonProperty("from_address")]
        public string FromAddress { get; set; }

        [JsonProperty("from_ward_code")]
        public string FromWardCode { get; set; }

        [JsonProperty("from_district_id")]
        public int FromDistrictId { get; set; }

        [JsonProperty("from_location")]
        public Location FromLocation { get; set; }

        [JsonProperty("to_name")]
        public string ToName { get; set; }

        [JsonProperty("to_phone")]
        public string ToPhone { get; set; }

        [JsonProperty("to_address")]
        public string ToAddress { get; set; }

        [JsonProperty("to_ward_code")]
        public string ToWardCode { get; set; }

        [JsonProperty("to_district_id")]
        public int ToDistrictId { get; set; }

        [JsonProperty("to_location")]
        public Location ToLocation { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("converted_weight")]
        public int ConvertedWeight { get; set; }

        [JsonProperty("calculate_weight")]
        public int CalculateWeight { get; set; }

        [JsonProperty("service_type_id")]
        public int ServiceTypeId { get; set; }

        [JsonProperty("service_id")]
        public int ServiceId { get; set; }

        [JsonProperty("payment_type_id")]
        public int PaymentTypeId { get; set; }

        [JsonProperty("cod_amount")]
        public int CodAmount { get; set; }

        [JsonProperty("required_note")]
        public string RequiredNote { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("pickup_time")]
        public DateTime PickupTime { get; set; }

        [JsonProperty("items")]
        public List<Item> Items { get; set; }

        [JsonProperty("order_code")]
        public string OrderCode { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("leadtime")]
        public DateTime Leadtime { get; set; }

        [JsonProperty("log")]
        public List<LogEntry> Log { get; set; }
    }

    public class Location
    {
        [JsonProperty("lat")]
        public double Latitude { get; set; }

        [JsonProperty("long")]
        public double Longitude { get; set; }

        [JsonProperty("trust_level")]
        public int TrustLevel { get; set; }
    }

    public class Item
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("quantity")]
        public int Quantity { get; set; }

        [JsonProperty("length")]
        public int Length { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }

        [JsonProperty("weight")]
        public int Weight { get; set; }

        [JsonProperty("item_order_code")]
        public string ItemOrderCode { get; set; }
    }

    public class LogEntry
    {
        [JsonProperty("status")]
        public string Status { get; set; }

        [JsonProperty("updated_date")]
        public DateTime UpdatedDate { get; set; }
    }
}
    