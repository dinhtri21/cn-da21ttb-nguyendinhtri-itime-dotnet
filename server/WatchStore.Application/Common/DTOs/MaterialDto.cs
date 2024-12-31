using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WatchStore.Application.Common.DTOs
{
    public class MaterialDto
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
    }
    public class MaterialResponseDto
    {
        public List<MaterialDto> Materials { get; set; }
        public int total { get; set; }
        public int skip { get; set; }
        public int limit { get; set; }
    }
}
