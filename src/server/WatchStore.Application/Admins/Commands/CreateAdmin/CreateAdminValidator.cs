using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Admins.Commands.CreateAdmin
{
    public class CreateAdminValidator : AbstractValidator<CreateAdminCommand>
    {
        public CreateAdminValidator() {

            RuleFor(x => x.AdminName)
                .NotEmpty()
                .WithMessage("Tên quản trị viên là bắt buộc.")
                .MaximumLength(50)
                .WithMessage("Tên quản trị viên không được vượt quá 50 ký tự.");

            RuleFor(x => x.AdminPhone)
                .NotEmpty()
                .WithMessage("Số điện thoại quản trị viên là bắt buộc.")
                .MaximumLength(20)
                .WithMessage("Số điện thoại quản trị viên không được vượt quá 20 ký tự.");

            RuleFor(x => x.AdminEmail)
                .NotEmpty()
                .WithMessage("Email quản trị viên là bắt buộc.")
                .EmailAddress()
                .WithMessage("Email quản trị viên không đúng định dạng.")
                .MaximumLength(50)
                .WithMessage("Email quản trị viên không được vượt quá 50 ký tự.");

            RuleFor(x => x.AdminPassword)
                .NotEmpty()
                .WithMessage("Mật khẩu quản trị viên là bắt buộc.")
                .MaximumLength(50)
                .WithMessage("Mật khẩu quản trị viên không được vượt quá 50 ký tự.");

            RuleFor(x => x.RoleIds)
                .NotEmpty()
                .WithMessage("Danh sách Role Id là bắt buộc.")
                .Must(x => x.Count > 0)
                .WithMessage("Danh sách Role Id phải có ít nhất một mục.");
        }
    }
}
