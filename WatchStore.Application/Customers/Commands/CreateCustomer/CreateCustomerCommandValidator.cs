using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;
using WatchStore.Application.Common.Interfaces;


namespace WatchStore.Application.Customers.Commands.CreateCustomer
{
    public class CreateCustomerCommandValidator : AbstractValidator<CreateCustomerCommand>, IValidatorMarker
    {
        public CreateCustomerCommandValidator()
        {
            RuleFor(v => v.FullName)
            .NotEmpty()
            .WithMessage("FullName là bắt buộc.")
            .MaximumLength(200)
            .WithMessage("FullName không được vượt quá 200 ký tự.");

            RuleFor(v => v.PhoneNumber)
                .NotEmpty()
                .WithMessage("PhoneNumber là bắt buộc.")
                .MaximumLength(20)
                .WithMessage("PhoneNumber không được vượt quá 20 ký tự.");

            RuleFor(v => v.Address)
                .NotEmpty()
                .WithMessage("Address là bắt buộc.")
                .MaximumLength(200)
                .WithMessage("Address không được vượt quá 200 ký tự.");

            RuleFor(v => v.Email)
                .NotEmpty()
                .WithMessage("Email là bắt buộc.")
                .MaximumLength(200)
                .WithMessage("Email không được vượt quá 200 ký tự.")
                .EmailAddress()
                .WithMessage("Email không hợp lệ.");
        }
    }
}
