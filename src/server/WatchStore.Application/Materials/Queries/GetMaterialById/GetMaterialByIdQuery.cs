using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;

namespace WatchStore.Application.Materials.Queries.GetMaterialById
{
    public class GetMaterialByIdQuery : IRequest<MaterialDto>
    {
        public int id { get; set; }
    }
}
