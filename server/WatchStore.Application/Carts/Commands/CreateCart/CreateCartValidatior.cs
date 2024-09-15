using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Carts.Commands.CreateCart
{
    public class CreateCartValidatior : AbstractValidator<CreateCartCommand>
    {
        public CreateCartValidatior()
        {
            RuleFor(x => x.CustomerId)
                .NotEmpty()
                .WithMessage("CustomerId là bắt buộc");
        }
    }
}
