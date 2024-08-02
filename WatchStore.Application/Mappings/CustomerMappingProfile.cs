using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.DTOs;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Mappings
{
    internal class CustomerMappingProfile : Profile
    {
        public CustomerMappingProfile()
        {
            CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
