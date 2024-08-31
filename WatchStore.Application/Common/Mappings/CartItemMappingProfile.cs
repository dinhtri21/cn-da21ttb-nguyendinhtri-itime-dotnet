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
    public class CartItemMappingProfile : Profile
    {
        public CartItemMappingProfile()
        {
          CreateMap<CartItem, CartItemDto>()
                   .ForMember(dest => dest.Product, opt => opt.MapFrom(src => src.Product));
        }
    }
}
