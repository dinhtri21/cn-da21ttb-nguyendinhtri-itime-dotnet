using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Materials.Commands.CreateMaterial
{
    public class CreateMaterialCommand : IRequest<MaterialDto>
    {
        public string MaterialName { get; set; }
    }
}
