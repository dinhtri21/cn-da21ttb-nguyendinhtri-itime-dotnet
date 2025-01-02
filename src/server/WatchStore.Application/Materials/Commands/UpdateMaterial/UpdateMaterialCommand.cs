using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Materials.Commands.UpdateMaterial
{
    public class UpdateMaterialCommand : IRequest<MaterialDto>
    {
        public int MaterialId { get; set; }
        public string? MaterialName { get; set; }
    }
}
