using MediatR;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using OfficeOpenXml.Drawing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WatchStore.Application.Common.Interfaces;
using WatchStore.Domain.Entities;

namespace WatchStore.Application.Products.Commands.ImportExcelProduct
{
    public class ImportExcelProductCommandHandler : IRequestHandler<ImportExcelProductCommand>, IApplicationMarker
    {
        private readonly IProductRepository _productRepository;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImportExcelProductCommandHandler(IProductRepository productRepository, IWebHostEnvironment webHostEnvironment)
        {
            _productRepository = productRepository;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task Handle(ImportExcelProductCommand request, CancellationToken cancellationToken)
        {

            if (request.File == null || request.File.Length == 0)
            {
                throw new KeyNotFoundException("File not found");
            }

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using var package = new ExcelPackage(request.File.OpenReadStream());
            var worksheet = package.Workbook.Worksheets.First();
            var rows = worksheet.Dimension.Rows;

            var listProduct = new List<Product>();

            for (int i = 2; i <= rows; i++) // Bỏ qua dòng tiêu đề
            {

                var imageUrls = new List<string>();

                // Lấy giá trị của ô và kiểm tra xem nó có phải là một hyperlink không
                var cell = worksheet.Cells[i, 7]; // Giả sử ảnh nằm trong cột 7
                var cellValue = cell.Value?.ToString().Trim();  // Kiểm tra nếu có giá trị

                // Kiểm tra nếu ô chứa một hyperlink
                if (!string.IsNullOrEmpty(cellValue))
                {
                    var imageUrl = cellValue;  // Nếu ô chứa một URL (dạng văn bản)

                    // Kiểm tra nếu URL hợp lệ
                    if (!string.IsNullOrEmpty(imageUrl))
                    {
                        try
                        {
                            // Tải ảnh từ URL
                            using (HttpClient client = new HttpClient())
                            {
                                var imageBytes = await client.GetByteArrayAsync(imageUrl); // Tải ảnh dưới dạng byte array

                                // Tạo tên tệp ngẫu nhiên và đường dẫn tệp
                                var fileName = $"{Guid.NewGuid()}.jpg";
                                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, "images", "products", fileName);

                                // Tạo thư mục nếu chưa tồn tại
                                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                                // Lưu ảnh vào server
                                await File.WriteAllBytesAsync(filePath, imageBytes);

                                var relativePath = $"/images/products/{fileName}"; // Đường dẫn tương đối
                                imageUrls.Add(relativePath); // Thêm vào danh sách URL hình ảnh
                            }
                        }
                        catch (Exception ex)
                        {
                            // Xử lý lỗi nếu có sự cố khi tải ảnh
                            Console.WriteLine($"Error downloading image from URL {imageUrl}: {ex.Message}");
                        }
                    }
                }


                // Tạo đối tượng Product và thêm vào danh sách
                var product = new Product
                {
                    ProductName = worksheet.Cells[i, 1].Value.ToString().Trim(),
                    ProductPrice = decimal.Parse(worksheet.Cells[i, 2].Value.ToString().Trim()),
                    ProductDescription = worksheet.Cells[i, 3].Value.ToString().Trim(),
                    QuantityInStock = int.Parse(worksheet.Cells[i, 4].Value.ToString().Trim()),
                    BrandId = int.Parse(worksheet.Cells[i, 5].Value.ToString().Trim()),
                    MaterialId = int.Parse(worksheet.Cells[i, 6].Value.ToString().Trim())
                };

                // Thêm danh sách hình ảnh vào sản phẩm nếu có
                if (imageUrls.Count > 0)
                {
                    product.ProductImages = imageUrls.Select(url => new ProductImage { ImageUrl = url }).ToList();
                }

                // Thêm sản phẩm vào danh sách
                listProduct.Add(product);

            }
            var products = await _productRepository.AddListProductsAsync(listProduct);

        }
    }
}
