using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetProvince;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Fee.CalculateFee;

namespace WatchStore.Application.Common.Mappings
{
    public class GHNMappingProfile : Profile
    {
        public GHNMappingProfile() { 

            CreateMap<CalculateFeeResponse, GHNCalculateFeeDto>()
                .ForMember(dest => dest.Total, opt => opt.MapFrom(src => src.Data.Total));

            CreateMap<Province, GHNProvinceDto>()
                .ForMember(dest => dest.ProvinceID, opt => opt.MapFrom(src => src.ProvinceID))
                .ForMember(dest => dest.ProvinceName, opt => opt.MapFrom(src => src.ProvinceName));

            CreateMap<District, GHNDistrictDto>()
                .ForMember(dest => dest.DistrictID, opt => opt.MapFrom(src => src.DistrictID))
                .ForMember(dest => dest.ProvinceID, opt => opt.MapFrom(src => src.ProvinceID))
                .ForMember(dest => dest.DistrictName, opt => opt.MapFrom(src => src.DistrictName));

            CreateMap<Ward, GHNWardDto>()
                .ForMember(dest => dest.WardCode, opt => opt.MapFrom(src => src.WardCode))
                .ForMember(dest => dest.DistrictID, opt => opt.MapFrom(src => src.DistrictID))
                .ForMember(dest => dest.WardName, opt => opt.MapFrom(src => src.WardName));
        }
    }
}
