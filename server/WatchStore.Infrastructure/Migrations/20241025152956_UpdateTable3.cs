using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTable3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ZipCode",
                table: "CustomerAddress");

            migrationBuilder.AddColumn<int>(
                name: "DistrictId",
                table: "CustomerAddress",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProvinceId",
                table: "CustomerAddress",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WardId",
                table: "CustomerAddress",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "CustomerAddress");

            migrationBuilder.DropColumn(
                name: "ProvinceId",
                table: "CustomerAddress");

            migrationBuilder.DropColumn(
                name: "WardId",
                table: "CustomerAddress");

            migrationBuilder.AddColumn<string>(
                name: "ZipCode",
                table: "CustomerAddress",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
