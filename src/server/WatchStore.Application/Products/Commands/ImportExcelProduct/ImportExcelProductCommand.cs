using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Commands.ImportExcelProduct
{
    public class ImportExcelProductCommand : IRequest
    {
        public IFormFile File { get; set; }
        public ImportExcelProductCommand() { }
        public ImportExcelProductCommand(IFormFile file)
        {
            File = file;
        }
    }
}
