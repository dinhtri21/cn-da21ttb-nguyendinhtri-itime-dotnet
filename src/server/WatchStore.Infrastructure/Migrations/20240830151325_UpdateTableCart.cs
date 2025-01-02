using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTableCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Loại bỏ ràng buộc khóa ngoại trước
            migrationBuilder.DropForeignKey(
               name: "FK_Customer_Cart",
               table: "Cart");

            // Xóa chỉ mục cũ
            migrationBuilder.DropIndex(
                name: "IX_Cart_CustomerId",
                table: "Cart");

            // Tạo lại chỉ mục với IsUnique = true
            migrationBuilder.CreateIndex(
                name: "IX_Cart_CustomerId",
                table: "Cart",
                column: "CustomerId",
                unique: true);

            // Thêm lại ràng buộc khóa ngoại
            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Cart",
                table: "Cart",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        { // Loại bỏ ràng buộc khóa ngoại trước
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_Cart",
                table: "Cart");

            // Xóa chỉ mục unique
            migrationBuilder.DropIndex(
                name: "IX_Cart_CustomerId",
                table: "Cart");

            // Tạo lại chỉ mục bình thường
            migrationBuilder.CreateIndex(
                name: "IX_Cart_CustomerId",
                table: "Cart",
                column: "CustomerId");

            // Thêm lại ràng buộc khóa ngoại
            migrationBuilder.AddForeignKey(
                name: "FK_Customer_Cart",
                table: "Cart",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "CustomerId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
