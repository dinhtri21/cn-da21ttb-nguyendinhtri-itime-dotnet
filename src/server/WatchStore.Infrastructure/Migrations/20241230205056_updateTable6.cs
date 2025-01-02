using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTable6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings");

            migrationBuilder.AddForeignKey(
                name: "FK_Order_Shipping",
                table: "Shippings",
                column: "OrderId",
                principalTable: "Order",
                principalColumn: "OrderId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
