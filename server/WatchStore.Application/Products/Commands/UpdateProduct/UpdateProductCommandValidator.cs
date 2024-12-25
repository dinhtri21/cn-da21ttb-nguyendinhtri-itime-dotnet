using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
    {
        public UpdateProductCommandValidator() {
            RuleFor(x => x.ProductName)
                .NotEmpty()
                .WithMessage("Product Name là bắt buộc")
                .MaximumLength(50)
                .WithMessage("Product Name không vượt quá 200 ký tự");
            RuleFor(x => x.ProductPrice)
                .NotEmpty()
                .WithMessage("Product Price là bắt buộc")
                .GreaterThan(0)
                .WithMessage("Product Price phải lớn hơn 0");
            RuleFor(x => x.ProductDescription)
                .NotEmpty();
            RuleFor(x => x.QuantityInStock)
                .NotEmpty()
                .WithMessage("Quantity In Stock là bắt buộc")
                .GreaterThan(0)
                .WithMessage("Quantity In Stock phải lớn hơn 0");
            RuleFor(x => x.BrandId)
                .NotEmpty()
                .WithMessage("Brand Id là bắt buộc")
                .GreaterThan(0)
                .WithMessage("Brand Id phải lớn hơn 0");
            RuleFor(x => x.MaterialId)
                .NotEmpty()
                .WithMessage("Material Id là bắt buộc")
                .GreaterThan(0)
                .WithMessage("Material Id phải lớn hơn 0");
          
        }
    }
}
