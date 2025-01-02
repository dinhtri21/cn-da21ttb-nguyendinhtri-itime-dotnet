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
    public class AdminMappingProfile : Profile
    {
        public AdminMappingProfile()
        {
            CreateMap<Admin, AdminDto>()
                .ForMember(dest => dest.AdminId, opt => opt.MapFrom(src => src.AdminId))
                .ForMember(dest => dest.AdminName, opt => opt.MapFrom(src => src.AdminName))
                .ForMember(dest => dest.AdminPhone, opt => opt.MapFrom(src => src.AdminPhone))
                .ForMember(dest => dest.AdminEmail, opt => opt.MapFrom(src => src.AdminEmail))
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt))
                .ForMember(dest => dest.AdminRoles, opt => opt.MapFrom(src => src.AdminRoles.Select(ar => new RoleDto
                {
                    RoleId = ar.Role.RoleId,
                    RoleName = ar.Role.RoleName
                }).ToList()));
        }
    }
}
