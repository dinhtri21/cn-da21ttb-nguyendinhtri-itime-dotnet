using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.CartItems.Commands.CreateCartItem
{
    public class CreateCartItemValidatior : AbstractValidator<CreateCartItemCommand>
    {
        public CreateCartItemValidatior() {
            RuleFor(x => x.CustomerId)
                .NotEmpty()
                .WithMessage("CustomerId là bắt buộc");

            RuleFor(x => x.ProductId)
                .NotEmpty()
                .WithMessage("ProductId là bắt buộc");

            RuleFor(x => x.Quantity)
                .GreaterThan(0)
                .WithMessage("Quantity phải lớn hơn 0")
                .LessThan(100)
                .WithMessage("Quantity không được lớn hơn 100")
                .NotEmpty()
                .WithMessage("Quantity là bắt buộc");
        }
    }
}
