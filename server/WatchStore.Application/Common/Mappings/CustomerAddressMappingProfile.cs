using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Common.Mappings
{
    public class CustomerAddressMappingProfile : Profile
    {
        public CustomerAddressMappingProfile()
        {
            CreateMap<CustomerAddress, CustomerAddressDto>()
                .ForMember(dest => dest.AddressId, opt => opt.MapFrom(src => src.AddressId))
                .ForMember(dest => dest.CustomerId, opt => opt.MapFrom(src => src.CustomerId))
                .ForMember(dest => dest.AddressLine, opt => opt.MapFrom(src => src.AddressLine))
                .ForMember(dest => dest.Ward, opt => opt.MapFrom(src => src.Ward))
                .ForMember(dest => dest.District, opt => opt.MapFrom(src => src.District))
                .ForMember(dest => dest.Province, opt => opt.MapFrom(src => src.Province));
           
        }
    }
}
