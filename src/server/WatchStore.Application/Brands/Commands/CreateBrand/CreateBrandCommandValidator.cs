using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Brands.Commands.CreateBrand
{
    public class CreateBrandCommandValidator  : AbstractValidator<CreateBrandCommand>
    {
        public CreateBrandCommandValidator()
        {
            RuleFor(x => x.BrandName)
                .NotEmpty().WithMessage("Brand Name is required.")
                .MaximumLength(50).WithMessage("Brand Name must not exceed 50 characters.");

            RuleFor(x => x.BrandDescription)
                .NotEmpty().WithMessage("Brand Description is required.")
                .MaximumLength(255).WithMessage("Brand Description must not exceed 255 characters.");
        }
    }
}
