using MediatR;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;

namespace WatchStore.Application.Products.Queries.GetExcelProductsFile
{
    public class GetExcelProductsFileQueryHandler : IRequestHandler<GetExcelProductsFileQuery, byte[]>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public GetExcelProductsFileQueryHandler(IProductRepository productRepository, IWebHostEnvironment webHostEnvironment)
        {
            _productRepository = productRepository;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<byte[]> Handle(GetExcelProductsFileQuery request, CancellationToken cancellationToken)
        {
            // Lấy danh sách sản phẩm từ repository
            var products = await _productRepository.GetAllProductsAsync();

            if (products == null || !products.Any())
            {
                throw new KeyNotFoundException("Không tìm thấy sản phẩm nào!");
            }

            // Tạo file Excel
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Products");

            // Tạo tiêu đề
            worksheet.Cells[1, 1].Value = "Tên sản phẩm";
            worksheet.Cells[1, 2].Value = "Giá";
            worksheet.Cells[1, 3].Value = "Mô tả";
            worksheet.Cells[1, 4].Value = "Số lượng tồn";
            worksheet.Cells[1, 5].Value = "Thương hiệu";
            worksheet.Cells[1, 6].Value = "Chất liệu";
            worksheet.Cells[1, 7].Value = "Ngày tạo";
            worksheet.Cells[1, 8].Value = "Ảnh";

            // Style tiêu đề
            worksheet.Row(1).Style.Font.Bold = true;
            // Đặt chiều cao dòng tiêu đề
            worksheet.Row(1).Height = 30;

            // Thêm dữ liệu sản phẩm
            int row = 2;
            foreach (var product in products)
            {
                worksheet.Cells[row, 1].Value = product.ProductName;
                worksheet.Cells[row, 2].Value = product.ProductPrice;
                worksheet.Cells[row, 3].Value = product.ProductDescription;
                worksheet.Cells[row, 4].Value = product.QuantityInStock;
                worksheet.Cells[row, 5].Value = product.Brand.BrandName;
                worksheet.Cells[row, 6].Value = product.Material.MaterialName;
                worksheet.Cells[row, 7].Value = product.CreatedAt.ToString("dd/MM/yyyy");

                // Thêm hình ảnh sản phẩm nếu có
                if (product.ProductImages != null && product.ProductImages.Any())
                {
                    var firstImageUrl = product.ProductImages.First().ImageUrl;

                    // Lấy đường dẫn vật lý của ảnh
                    var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, firstImageUrl.TrimStart('/'));

                    if (File.Exists(imagePath))
                    {
                        // Đọc ảnh và thêm vào Excel
                        var image = worksheet.Drawings.AddPicture($"Image_{row}", new FileInfo(imagePath));
                        image.SetPosition(row - 1, 0, 7, 0); // Cột thứ 7 (Images), dòng tương ứng
                        image.SetSize(30, 30); // Kích thước ảnh (px)
                    }
                }
                worksheet.Row(row).Height = 30;
                row++;
            }

            // Auto-fit các cột, ngoại trừ cột chứa hình ảnh
            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
            worksheet.Column(7).Width = 15; // Cột hình ảnh được giữ cố định

            // Xuất file Excel dưới dạng mảng byte
            return await Task.FromResult(package.GetAsByteArray());
        }
    }
}
