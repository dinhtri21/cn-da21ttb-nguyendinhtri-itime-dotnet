using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Products.Commands.CreateProduct;

namespace WatchStore.Application.Products.Commands.ImportExcelProduct
{
    public class ImportExcelProductCommandValidator : AbstractValidator<ImportExcelProductCommand>
    {
        public ImportExcelProductCommandValidator()
        {
            RuleFor(x => x.File)
                .NotNull().WithMessage("File không được để trống.")
                .Must(file => file.FileName.EndsWith(".xlsx")).WithMessage("File phải có định dạng .xlsx.");
        }
    }
}
