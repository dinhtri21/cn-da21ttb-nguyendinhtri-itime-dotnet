using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Queries.GetExcelProductsFile
{
    public class GetExcelProductsFileQuery : IRequest<byte[]>
    {
    }
}
