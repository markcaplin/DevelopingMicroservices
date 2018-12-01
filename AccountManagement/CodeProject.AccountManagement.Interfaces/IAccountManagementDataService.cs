using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.AccountManagement.Data.Entities;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Interfaces;

namespace CodeProject.AccountManagement.Interfaces
{
    public interface IAccountManagementDataService : IDataRepository, IDisposable
	{
		Task CreateUser(User user);
		Task CreateAccount(Account account);
		Task<User> GetUserByEmailAddress(string emailAddress);
		Task UpdateUser(User user);
		Task UpdateAccount(Account account);
		Task<User> GetUserByUserId(int userId);
		Task<Account> GetAccountInformation(int accountId);
	}
}
