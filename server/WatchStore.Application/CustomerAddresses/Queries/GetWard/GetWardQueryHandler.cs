using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetWards;

namespace WatchStore.Application.CustomerAddresses.Queries.GetWard
{
    public class GetWardQueryHandler : IRequestHandler<GetWardQuery, List<GHNWardDto>>, IApplicationMarker
    {
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IMapper _mapper;
        public GetWardQueryHandler(IGiaoHanhNhanhService giaoHanhNhanhService, IMapper mapper)
        {
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _mapper = mapper;
        }
        public async Task<List<GHNWardDto>> Handle(GetWardQuery request, CancellationToken cancellationToken)
        {
            var response = await _giaoHanhNhanhService.GetWardAsync(new GetWardRequest { DistrictID = request.DistrictID });

            if (response == null)
            {
                throw new Exception("Lõi khi lấy dữ liệu từ GHN");
            }

            return _mapper.Map<List<GHNWardDto>>(response.Data);
        }
    }
}
