using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<bool>
    {
        public int ProductId { get; set; }

        public DeleteProductCommand(int id)
        {
            ProductId = id;
        }
    }
}
