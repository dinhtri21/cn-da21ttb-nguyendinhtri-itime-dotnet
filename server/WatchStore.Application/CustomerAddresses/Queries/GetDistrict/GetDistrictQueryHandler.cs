using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.DTOs;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Application.ExternalServices.GiaoHangNhanh.Address.GetDistrict;

namespace WatchStore.Application.CustomerAddresses.Queries.GetDistrict
{
    public class GetDistrictQueryHandler : IRequestHandler<GetDistrictQuery, List<GHNDistrictDto>>, IApplicationMarker
    {
        private readonly IGiaoHanhNhanhService _giaoHanhNhanhService;
        private readonly IMapper _mapper;
        public GetDistrictQueryHandler(IGiaoHanhNhanhService giaoHanhNhanhService, IMapper mapper)
        {
            _giaoHanhNhanhService = giaoHanhNhanhService;
            _mapper = mapper;
        }
        public async Task<List<GHNDistrictDto>> Handle(GetDistrictQuery request, CancellationToken cancellationToken)
        {
           var reposnse = await _giaoHanhNhanhService.GetDistrictAsync(new GetDistrictRequest
           {
               ProvinceID = request.ProvinceID
           });

            if (reposnse.Data == null)
            {
                throw new Exception(reposnse.Message);
            }

            return _mapper.Map<List<GHNDistrictDto>>(reposnse.Data);
        }
    }
}
