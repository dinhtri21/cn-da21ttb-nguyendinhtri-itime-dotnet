using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Orders.Queries.GetOrdersCount
{
    public class GetOrdersCountQueryValidator : AbstractValidator<GetOrdersCountQuery>, IValidatorMarker
    {
        public GetOrdersCountQueryValidator()
        {
            // Quy tắc cho năm: phải lớn hơn 0 và không lớn hơn năm hiện tại
            RuleFor(x => x.year)
                .GreaterThan(0).WithMessage("Năm phải lớn hơn 0.")
                .LessThanOrEqualTo(DateTime.Now.Year).WithMessage("Năm không được lớn hơn năm hiện tại.");

            // Quy tắc cho tháng: phải trong khoảng từ 1 đến 12
            RuleFor(x => x.month)
                .GreaterThan(0).WithMessage("Tháng phải lớn hơn 0.")
                .LessThanOrEqualTo(12).WithMessage("Tháng không được lớn hơn 12.");

            // Quy tắc: Nếu năm hiện tại được chọn, thì tháng không được lớn hơn tháng hiện tại
            RuleFor(x => x)
                .Must(query =>
                    !(query.year == DateTime.Now.Year && query.month.HasValue && query.month.Value > DateTime.Now.Month))
                .WithMessage("Tháng không được lớn hơn tháng hiện tại.");

            // Quy tắc: Nếu có tháng, phải có năm
            RuleFor(x => x)
                .Must(query => !(query.month.HasValue && !query.year.HasValue))
                .WithMessage("Vui lòng cung cấp cả năm nếu lọc theo tháng.");
        }
    }
}
