using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeProject.LoggingManagement.Data.EntityFramework.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AcknowledgementsQueue",
                columns: table => new
                {
                    AcknowledgementsQueueId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SenderTransactionQueueId = table.Column<int>(nullable: false),
                    TransactionCode = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    AcknowledgementQueue = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcknowledgementsQueue", x => x.AcknowledgementsQueueId);
                });

            migrationBuilder.CreateTable(
                name: "MessagesReceived",
                columns: table => new
                {
                    MessagesReceivedId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SenderTransactionQueueId = table.Column<int>(nullable: false),
                    QueueName = table.Column<string>(nullable: true),
                    TransactionCode = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagesReceived", x => x.MessagesReceivedId);
                });

            migrationBuilder.CreateTable(
                name: "MessagesSent",
                columns: table => new
                {
                    MessagesSentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SenderTransactionQueueId = table.Column<int>(nullable: false),
                    TransactionCode = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    AcknowledgementsRequired = table.Column<int>(nullable: false),
                    AcknowledgementsReceived = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MessagesSent", x => x.MessagesSentId);
                });

            migrationBuilder.CreateTable(
                name: "TransactionQueueSemaphores",
                columns: table => new
                {
                    TransactionQueueSemaphoreId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SemaphoreKey = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionQueueSemaphores", x => x.TransactionQueueSemaphoreId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TransactionQueueSemaphores_SemaphoreKey",
                table: "TransactionQueueSemaphores",
                column: "SemaphoreKey",
                unique: true,
                filter: "[SemaphoreKey] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcknowledgementsQueue");

            migrationBuilder.DropTable(
                name: "MessagesReceived");

            migrationBuilder.DropTable(
                name: "MessagesSent");

            migrationBuilder.DropTable(
                name: "TransactionQueueSemaphores");
        }
    }
}
