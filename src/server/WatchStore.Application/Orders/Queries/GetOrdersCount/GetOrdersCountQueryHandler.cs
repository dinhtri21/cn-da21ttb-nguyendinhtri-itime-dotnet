using FluentValidation;
using MediatR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace WatchStore.Application.Orders.Queries.GetOrdersCount
{
    public class GetOrdersCountQueryHandler : IRequestHandler<GetOrdersCountQuery, int>, IApplicationMarker
    {
        private readonly IOrderRepository _orderRepository;
         private readonly IValidator<GetOrdersCountQuery> _validator;
        public GetOrdersCountQueryHandler(IOrderRepository orderRepository, IValidator<GetOrdersCountQuery> validator)
        {
            _orderRepository = orderRepository;
            _validator = validator;
        }
        public async Task<int> Handle(GetOrdersCountQuery request, CancellationToken cancellationToken)
        {
            //Không truyền tháng và năm → Đếm tất cả các đơn hàng.
            //Chỉ truyền năm → Lọc theo năm.
            //Chỉ truyền tháng -> Lỗi, yêu cầu cần có năm
            //Truyền cả tháng và năm → Lọc theo cả hai.

            // Gọi validator thủ công cho GetOrdersCountQuery (Vì validator chỉ app dụng cho post)
            var query = new GetOrdersCountQuery(request.year, request.month);
            var validationResult = await _validator.ValidateAsync(query);
            if (!validationResult.IsValid)
            {
                throw new Exception(validationResult.ToString());
            }

            int count = await _orderRepository.GetOrderCountByMonthAndYearAsync(request.month, request.year);
            return count;
        }
    }
}
