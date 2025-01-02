using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Orders.Commands.CreateOrder
{
    public class CreateOrderValidatior : AbstractValidator<CreateOrderCommand>
    {
        public CreateOrderValidatior()
        {
            RuleFor(x => x.CustomerId)
               .NotEmpty()
               .WithMessage("CustomerId is required");

            //RuleFor(x => x.FullName)
            //    .NotEmpty()
            //    .WithMessage("FullName is required");

            //RuleFor(x => x.PhoneNumber)
            //    .NotEmpty()
            //    .WithMessage("PhoneNumber is required");

            //RuleFor(x => x.Address)
            //    .NotEmpty()
            //    .WithMessage("Address is required");

            //RuleFor(x => x.Email)
            //    .NotEmpty()
            //    .WithMessage("Email là bắt buộc.")
            //    .MaximumLength(255)
            //    .WithMessage("Email không được vượt quá 200 ký tự.")
            //    .EmailAddress()
            //    .WithMessage("Email không hợp lệ.");


            RuleFor(x => x.PaymentId)
                .NotEmpty()
                .WithMessage("PaymentId is required");

        }

    }

}
