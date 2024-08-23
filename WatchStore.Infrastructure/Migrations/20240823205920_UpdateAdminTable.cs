using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WatchStore.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminUsername",
                table: "Admin",
                type: "nvarchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Admin_AdminUsername",
                table: "Admin",
                column: "AdminUsername",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Admin_AdminUsername",
                table: "Admin");

            migrationBuilder.DropColumn(
                name: "AdminUsername",
                table: "Admin");
        }
    }
}
