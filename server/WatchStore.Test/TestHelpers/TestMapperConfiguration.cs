using AutoMapper;
using WatchStore.Application.Common.Mappings;

namespace WatchStore.Test.TestHelpers
{
    public static class TestMapperConfiguration
    {
        public static IMapper GetMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<CustomerMappingProfile>();
            });

            return config.CreateMapper();
        }
    }
}