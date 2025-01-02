using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Brands.Commands.DeleteBrand
{
    public class DeleteBrandCommand : IRequest
    {
        public int BrandId { get; set; }
        public DeleteBrandCommand(int id)
        {
            BrandId = id;
        }
    }
}
