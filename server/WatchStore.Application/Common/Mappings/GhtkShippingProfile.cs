using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Common.Mappings
{
    public class GhtkShippingProfile : Profile
    {
        public GhtkShippingProfile()
        {
            CreateMap<GhtkShippingFeeResponseDto, GhtkShippingFeeDto>()
                .ForMember(dest => dest.name, opt => opt.MapFrom(src => src.fee.name))
                .ForMember(dest => dest.fee, opt => opt.MapFrom(src => src.fee.fee))
                .ForMember(dest => dest.insurance_fee, opt => opt.MapFrom(src => src.fee.insurance_fee))
                .ForMember(dest => dest.delivery, opt => opt.MapFrom(src => src.fee.delivery));
        }
    }
}
