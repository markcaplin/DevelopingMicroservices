using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CodeProject.LoggingManagement.Data.Entities;
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Models;

namespace CodeProject.LoggingManagement.Data.EntityFramework
{
    public class LoggingManagementDatabase : DbContext
	{
		public DbSet<MessagesSent> MessagesSent { get; set; }
		public DbSet<MessagesReceived> MessagesReceived { get; set; }
		public DbSet<AcknowledgementsQueue> AcknowledgementsQueue { get; set; }
		public DbSet<TransactionQueueSemaphore> TransactionQueueSemaphores { get; set; }

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
			modelBuilder.Entity<TransactionQueueSemaphore>().HasIndex(u => u.SemaphoreKey).IsUnique();
		}

		public LoggingManagementDatabase(DbContextOptions<LoggingManagementDatabase> options) : base(options)
		{
			
		}

		public LoggingManagementDatabase()
		{
			
		}

		/// <summary>
		/// Inventory Management Database
		/// </summary>
		/// <param name="connectionStrings"></param>
		public LoggingManagementDatabase(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
