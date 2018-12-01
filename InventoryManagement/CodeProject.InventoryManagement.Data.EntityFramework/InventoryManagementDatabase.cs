using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CodeProject.InventoryManagement.Data.Entities;
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Models;

namespace CodeProject.InventoryManagement.Data.EntityFramework
{
    public class InventoryManagementDatabase : DbContext
	{
		public DbSet<Product> Products { get; set; }
		public DbSet<TransactionQueueInbound> TransactionQueueInbound { get; set; }
		public DbSet<TransactionQueueOutbound> TransactionQueueOutbound { get; set; }
		public DbSet<TransactionQueueInboundHistory> TransactionQueueInboundHistory { get; set; }
		public DbSet<TransactionQueueOutboundHistory> TransactionQueueOutboundHistory { get; set; }
		public DbSet<TransactionQueueSemaphore> TransactionQueueSemaphores { get; set; }
		public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
		public DbSet<PurchaseOrderStatus> PurchaseOrderStatuses { get; set; }
		public DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
		public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
		public DbSet<SalesOrder> SalesOrders { get; set; }
		public DbSet<SalesOrderStatus> SalesOrderStatuses { get; set; }
		public DbSet<SalesOrderDetail> SalesOrderDetails { get; set; }

		private readonly string _connectionString;

		/// <summary>
		/// On Configuring
		/// </summary>
		/// <param name="optionsBuilder"></param>
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			Console.WriteLine("Connecting to Database = " + _connectionString);
			if (string.IsNullOrWhiteSpace(_connectionString))
			{
				ConnectionStrings connectionStrings = ConfigurationUtility.GetConnectionStrings();
				string databaseConnectionString = connectionStrings.PrimaryDatabaseConnectionString;
				optionsBuilder.UseSqlServer(databaseConnectionString);
			}
			else
			{
				optionsBuilder.UseSqlServer(_connectionString);
			}

		}
		/// <summary>
		/// Fluent Api
		/// </summary>
		/// <param name="modelBuilder"></param>
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			
			modelBuilder.Entity<Product>().HasIndex(u=> u.ProductNumber);
			modelBuilder.Entity<TransactionQueueSemaphore>().HasIndex(u => u.SemaphoreKey).IsUnique();

			modelBuilder.Entity<PurchaseOrderStatus>().HasData(
				new { PurchaseOrderStatusId = 1, Description = "Open" },
				new { PurchaseOrderStatusId = 2, Description = "Submitted" },
				new { PurchaseOrderStatusId = 3, Description = "Completed" });

			modelBuilder.Entity<SalesOrderStatus>().HasData(
				new { SalesOrderStatusId = 1, Description = "Open" },
				new { SalesOrderStatusId = 2, Description = "Submitted" },
				new { SalesOrderStatusId = 3, Description = "Completed" });

		}

		public InventoryManagementDatabase(DbContextOptions<InventoryManagementDatabase> options) : base(options)
		{
			
		}

		public InventoryManagementDatabase()
		{
			
		}

		/// <summary>
		/// Inventory Management Database
		/// </summary>
		/// <param name="connectionStrings"></param>
		public InventoryManagementDatabase(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
