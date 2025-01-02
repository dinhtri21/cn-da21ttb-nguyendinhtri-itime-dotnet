using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTable5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Shippings_Order_OrderId",
                table: "Shippings");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_OrderId",
                table: "Shippings");

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_OrderId",
                table: "Shippings",
                column: "OrderId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings");

            migrationBuilder.DropIndex(
                name: "IX_Shippings_OrderId",
                table: "Shippings");

            migrationBuilder.CreateIndex(
                name: "IX_Shippings_OrderId",
                table: "Shippings",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Shippings_Order_OrderId",
                table: "Shippings",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
