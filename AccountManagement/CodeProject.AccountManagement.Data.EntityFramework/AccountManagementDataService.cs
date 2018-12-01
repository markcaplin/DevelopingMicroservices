using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.AccountManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.AccountManagement.Data.Entities;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace CodeProject.AccountManagement.Data.EntityFramework
{
    public class AccountManagementDataService : EntityFrameworkRepository, IAccountManagementDataService
	{
		/// <summary>
		/// Register User
		/// </summary>
		/// <param name="user"></param>
		/// <returns></returns>
		public async Task CreateUser(User user)
		{
			DateTime dateCreated = DateTime.UtcNow;
			user.DateCreated = dateCreated;
			user.DateUpdated = dateCreated;

			await dbConnection.Users.AddAsync(user);
		}
		/// <summary>
		/// Create Account
		/// </summary>
		/// <param name="account"></param>
		/// <returns></returns>
		public async Task CreateAccount(Account account)
		{
			DateTime dateCreated = DateTime.UtcNow;
			account.DateCreated = dateCreated;
			account.DateUpdated = dateCreated;

			await dbConnection.Accounts.AddAsync(account);
		}
		/// <summary>
		/// Update User
		/// </summary>
		/// <param name="user"></param>
		/// <returns></returns>
		public async Task UpdateUser(User user)
		{
			await Task.Delay(0);
			user.DateUpdated = DateTime.UtcNow;
		}
		/// <summary>
		/// Update Account
		/// </summary>
		/// <param name="account"></param>
		/// <returns></returns>
		public async Task UpdateAccount(Account account)
		{
			await Task.Delay(0);
			account.DateUpdated = DateTime.UtcNow;
		}
		/// <summary>
		/// Get User By Email Address
		/// </summary>
		/// <param name="emailAddress"></param>
		/// <returns></returns>
		public async Task<User> GetUserByEmailAddress(string emailAddress)
		{
			User user = await dbConnection.Users.Where(x => x.EmailAddress == emailAddress).FirstOrDefaultAsync();
			return user;
		}
		/// <summary>
		/// Get User By User Id
		/// </summary>
		/// <param name="userId"></param>
		/// <returns></returns>
		public async Task<User> GetUserByUserId(int userId)
		{
			User user = await dbConnection.Users.Where(x => x.UserId == userId).FirstOrDefaultAsync();
			return user;
		}
		/// <summary>
		/// Get Account Information
		/// </summary>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<Account> GetAccountInformation(int accountId)
		{
			Account account = await dbConnection.Accounts.Where(x => x.AccountId == accountId).FirstOrDefaultAsync();
			return account;
		}

	}
}
