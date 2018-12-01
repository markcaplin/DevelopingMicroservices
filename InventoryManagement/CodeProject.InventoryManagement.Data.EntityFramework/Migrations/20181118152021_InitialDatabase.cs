using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CodeProject.InventoryManagement.Data.EntityFramework.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "InventoryTransactions",
                columns: table => new
                {
                    InventoryTransactionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<int>(nullable: false),
                    UnitCost = table.Column<double>(nullable: false),
                    EntityId = table.Column<int>(nullable: false),
                    MasterEntityId = table.Column<int>(nullable: false),
                    TransactionDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InventoryTransactions", x => x.InventoryTransactionId);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    AccountId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductNumber = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    BinLocation = table.Column<string>(nullable: true),
                    UnitPrice = table.Column<double>(nullable: false),
                    AverageCost = table.Column<double>(nullable: false),
                    OnHandQuantity = table.Column<int>(nullable: false),
                    OnOrderQuantity = table.Column<int>(nullable: false),
                    CommittedQuantity = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderStatuses",
                columns: table => new
                {
                    PurchaseOrderStatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderStatuses", x => x.PurchaseOrderStatusId);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderStatuses",
                columns: table => new
                {
                    SalesOrderStatusId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderStatuses", x => x.SalesOrderStatusId);
                });

            migrationBuilder.CreateTable(
                name: "TransactionQueueInbound",
                columns: table => new
                {
                    TransactionQueueInboundId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SenderTransactionQueueId = table.Column<int>(nullable: false),
                    TransactionCode = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionQueueInbound", x => x.TransactionQueueInboundId);
                });

            migrationBuilder.CreateTable(
                name: "TransactionQueueInboundHistory",
                columns: table => new
                {
                    TransactionQueueInboundHistoryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TransactionQueueInboundId = table.Column<int>(nullable: false),
                    SenderTransactionQueueId = table.Column<int>(nullable: false),
                    TransactionCode = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    ProcessedSuccessfully = table.Column<bool>(nullable: false),
                    DuplicateMessage = table.Column<bool>(nullable: false),
                    ErrorMessage = table.Column<string>(nullable: true),
                    DateCreatedInbound = table.Column<DateTime>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionQueueInboundHistory", x => x.TransactionQueueInboundHistoryId);
                });

            migrationBuilder.CreateTable(
                name: "TransactionQueueOutbound",
                columns: table => new
                {
                    TransactionQueueOutboundId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TransactionCode = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    SentToExchange = table.Column<bool>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateSentToExchange = table.Column<DateTime>(nullable: false),
                    DateToResendToExchange = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionQueueOutbound", x => x.TransactionQueueOutboundId);
                });

            migrationBuilder.CreateTable(
                name: "TransactionQueueOutboundHistory",
                columns: table => new
                {
                    TransactionQueueOutboundHistoryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TransactionQueueOutboundId = table.Column<int>(nullable: false),
                    TransactionCode = table.Column<string>(nullable: true),
                    Payload = table.Column<string>(nullable: true),
                    ExchangeName = table.Column<string>(nullable: true),
                    SentToExchange = table.Column<bool>(nullable: false),
                    DateOutboundTransactionCreated = table.Column<DateTime>(nullable: false),
                    DateSentToExchange = table.Column<DateTime>(nullable: false),
                    DateToResendToExchange = table.Column<DateTime>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TransactionQueueOutboundHistory", x => x.TransactionQueueOutboundHistoryId);
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

            migrationBuilder.CreateTable(
                name: "PurchaseOrders",
                columns: table => new
                {
                    PurchaseOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MasterPurchaseOrderId = table.Column<int>(nullable: false),
                    PurchaseOrderNumber = table.Column<int>(nullable: false),
                    AccountId = table.Column<int>(nullable: false),
                    SupplierName = table.Column<string>(nullable: true),
                    AddressLine1 = table.Column<string>(nullable: true),
                    AddressLine2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Region = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    OrderTotal = table.Column<double>(nullable: false),
                    PurchaseOrderStatusId = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrders", x => x.PurchaseOrderId);
                    table.ForeignKey(
                        name: "FK_PurchaseOrders_PurchaseOrderStatuses_PurchaseOrderStatusId",
                        column: x => x.PurchaseOrderStatusId,
                        principalTable: "PurchaseOrderStatuses",
                        principalColumn: "PurchaseOrderStatusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrders",
                columns: table => new
                {
                    SalesOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MasterSalesOrderId = table.Column<int>(nullable: false),
                    SalesOrderNumber = table.Column<int>(nullable: false),
                    AccountId = table.Column<int>(nullable: false),
                    CustomerName = table.Column<string>(nullable: true),
                    AddressLine1 = table.Column<string>(nullable: true),
                    AddressLine2 = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    Region = table.Column<string>(nullable: true),
                    PostalCode = table.Column<string>(nullable: true),
                    OrderTotal = table.Column<double>(nullable: false),
                    SalesOrderStatusId = table.Column<int>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrders", x => x.SalesOrderId);
                    table.ForeignKey(
                        name: "FK_SalesOrders_SalesOrderStatuses_SalesOrderStatusId",
                        column: x => x.SalesOrderStatusId,
                        principalTable: "SalesOrderStatuses",
                        principalColumn: "SalesOrderStatusId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrderDetails",
                columns: table => new
                {
                    PurchaseOrderDetailId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AccountId = table.Column<int>(nullable: false),
                    MasterPurchaseOrderDetailId = table.Column<int>(nullable: false),
                    PurchaseOrderId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    ProductNumber = table.Column<string>(nullable: true),
                    ProductDescription = table.Column<string>(nullable: true),
                    UnitPrice = table.Column<double>(nullable: false),
                    OrderQuantity = table.Column<int>(nullable: false),
                    ReceivedQuantity = table.Column<int>(nullable: false),
                    OrderTotal = table.Column<double>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrderDetails", x => x.PurchaseOrderDetailId);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PurchaseOrderDetails_PurchaseOrders_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrders",
                        principalColumn: "PurchaseOrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalesOrderDetails",
                columns: table => new
                {
                    SalesOrderDetailId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AccountId = table.Column<int>(nullable: false),
                    MasterSalesOrderDetailId = table.Column<int>(nullable: false),
                    SalesOrderId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    ProductNumber = table.Column<string>(nullable: true),
                    ProductDescription = table.Column<string>(nullable: true),
                    UnitPrice = table.Column<double>(nullable: false),
                    OrderQuantity = table.Column<int>(nullable: false),
                    ShippedQuantity = table.Column<int>(nullable: false),
                    OrderTotal = table.Column<double>(nullable: false),
                    DateCreated = table.Column<DateTime>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalesOrderDetails", x => x.SalesOrderDetailId);
                    table.ForeignKey(
                        name: "FK_SalesOrderDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SalesOrderDetails_SalesOrders_SalesOrderId",
                        column: x => x.SalesOrderId,
                        principalTable: "SalesOrders",
                        principalColumn: "SalesOrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "PurchaseOrderStatuses",
                columns: new[] { "PurchaseOrderStatusId", "Description" },
                values: new object[,]
                {
                    { 1, "Open" },
                    { 2, "Submitted" },
                    { 3, "Completed" }
                });

            migrationBuilder.InsertData(
                table: "SalesOrderStatuses",
                columns: new[] { "SalesOrderStatusId", "Description" },
                values: new object[,]
                {
                    { 1, "Open" },
                    { 2, "Submitted" },
                    { 3, "Completed" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductNumber",
                table: "Products",
                column: "ProductNumber");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDetails_ProductId",
                table: "PurchaseOrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrderDetails_PurchaseOrderId",
                table: "PurchaseOrderDetails",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseOrders_PurchaseOrderStatusId",
                table: "PurchaseOrders",
                column: "PurchaseOrderStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderDetails_ProductId",
                table: "SalesOrderDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrderDetails_SalesOrderId",
                table: "SalesOrderDetails",
                column: "SalesOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_SalesOrders_SalesOrderStatusId",
                table: "SalesOrders",
                column: "SalesOrderStatusId");

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
                name: "InventoryTransactions");

            migrationBuilder.DropTable(
                name: "PurchaseOrderDetails");

            migrationBuilder.DropTable(
                name: "SalesOrderDetails");

            migrationBuilder.DropTable(
                name: "TransactionQueueInbound");

            migrationBuilder.DropTable(
                name: "TransactionQueueInboundHistory");

            migrationBuilder.DropTable(
                name: "TransactionQueueOutbound");

            migrationBuilder.DropTable(
                name: "TransactionQueueOutboundHistory");

            migrationBuilder.DropTable(
                name: "TransactionQueueSemaphores");

            migrationBuilder.DropTable(
                name: "PurchaseOrders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "SalesOrders");

            migrationBuilder.DropTable(
                name: "PurchaseOrderStatuses");

            migrationBuilder.DropTable(
                name: "SalesOrderStatuses");
        }
    }
}
