using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Models;

namespace CodeProject.PurchaseOrderManagement.Data.EntityFramework
{
    public class PurchaseOrderManagementDatabase : DbContext
	{
		public DbSet<Supplier> Suppliers { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<TransactionQueueInbound> TransactionQueueInbound { get; set; }
		public DbSet<TransactionQueueInboundHistory> TransactionQueueInboundHistory { get; set; }
		public DbSet<TransactionQueueOutboundHistory> TransactionQueueOutboundHistory { get; set; }
		public DbSet<TransactionQueueOutbound> TransactionQueueOutbound { get; set; }
		public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
		public DbSet<PurchaseOrderStatus> PurchaseOrderStatuses { get; set; }
		public DbSet<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
		public DbSet<TransactionQueueSemaphore> TransactionQueueSemaphores { get; set; }
		public DbSet<PurchaseOrderNumberSequence> PurchaseOrderNumberSequences { get; set; }

		private string _connectionString;

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

		}

		public PurchaseOrderManagementDatabase(DbContextOptions<PurchaseOrderManagementDatabase> options) : base(options)
		{
			
		}

		public PurchaseOrderManagementDatabase()
		{
			
		}

		public PurchaseOrderManagementDatabase(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
