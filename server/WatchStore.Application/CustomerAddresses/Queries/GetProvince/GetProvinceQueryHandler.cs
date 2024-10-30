using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.CustomerAddresses.Queries.GetProvince
{
    public class GetProvinceQueryHandler : IRequestHandler<GetProvinceQuery, List<GHNProvinceDto>>, IApplicationMarker
    {
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IMapper _mapper;

        public GetProvinceQueryHandler(IGiaoHanhNhanhService giaoHanhNhanhService, IMapper mapper)
        {
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _mapper = mapper;
        }

        public async Task<List<GHNProvinceDto>> Handle(GetProvinceQuery request, CancellationToken cancellationToken)
        {
            var response = await _giaoHanhNhanhService.GetProvinceAsync();

            if (response.Data == null)
            {
                throw new Exception(response.Message);
            }

            return _mapper.Map<List<GHNProvinceDto>>(response.Data);
        }
    }
}
