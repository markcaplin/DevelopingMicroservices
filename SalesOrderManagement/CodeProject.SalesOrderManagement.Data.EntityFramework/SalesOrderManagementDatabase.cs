using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CodeProject.SalesOrderManagement.Data.Entities;
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Models;

namespace CodeProject.SalesOrderManagement.Data.EntityFramework
{
    public class SalesOrderManagementDatabase : DbContext
	{
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Product> Products { get; set; }
		public DbSet<TransactionQueueInbound> TransactionQueueInbound { get; set; }
		public DbSet<TransactionQueueInboundHistory> TransactionQueueInboundHistory { get; set; }
		public DbSet<TransactionQueueOutbound> TransactionQueueOutbound { get; set; }
		public DbSet<TransactionQueueOutboundHistory> TransactionQueueOutboundHistory { get; set; }
		public DbSet<SalesOrder> SalesOrders { get; set; }
		public DbSet<SalesOrderStatus> SalesOrderStatuses { get; set; }
		public DbSet<SalesOrderDetail> SalesOrderDetails { get; set; }
		public DbSet<TransactionQueueSemaphore> TransactionQueueSemaphores { get; set; }
		public DbSet<SalesOrderNumberSequence> SalesOrderNumberSequences { get; set; }

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

			modelBuilder.Entity<SalesOrderStatus>().HasData(
			new { SalesOrderStatusId = 1, Description = "Open" },
			new { SalesOrderStatusId = 2, Description = "Submitted" },
			new { SalesOrderStatusId = 3, Description = "Completed" });

		}

		public SalesOrderManagementDatabase(DbContextOptions<SalesOrderManagementDatabase> options) : base(options)
		{
			
		}

		public SalesOrderManagementDatabase()
		{
			
		}

		public SalesOrderManagementDatabase(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
