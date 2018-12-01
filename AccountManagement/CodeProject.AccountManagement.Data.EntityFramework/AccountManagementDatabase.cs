using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CodeProject.AccountManagement.Data.Entities;
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Models;

namespace CodeProject.AccountManagement.Data.EntityFramework
{
    public class AccountManagementDatabase : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Account> Accounts { get; set; }
		public DbSet<UserType> UserTypes { get; set; }

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
			
			modelBuilder.Entity<User>().HasIndex(u=> u.EmailAddress).IsUnique();

		}

		public AccountManagementDatabase(DbContextOptions<AccountManagementDatabase> options) : base(options)
		{
			
		}

		public AccountManagementDatabase()
		{
			
		}

		public AccountManagementDatabase(string connectionString)
		{
			_connectionString = connectionString;
		}
	}
}
