using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Materials.Commands.DeleteMaterial
{
    public class DeleteMaterialCommand : IRequest
    {
        public int id { get; set; }
    }
}
