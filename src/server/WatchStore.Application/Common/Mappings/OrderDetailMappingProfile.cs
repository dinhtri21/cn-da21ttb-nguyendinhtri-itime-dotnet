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
    public class OrderDetailMappingProfile : Profile
    {
        public OrderDetailMappingProfile()
        {
            CreateMap<OrderDetail, OrderDetailDto>()
             .ForMember(dest => dest.OrderDetailId, opt => opt.MapFrom(src => src.OrderDetailId))
             .ForMember(dest => dest.OrderId, opt => opt.MapFrom(src => src.OrderId))
             .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
             .ForMember(dest => dest.Quantity, opt => opt.MapFrom(src => src.Quantity))
             .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.UnitPrice))
             .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product));
        }
    }
}
