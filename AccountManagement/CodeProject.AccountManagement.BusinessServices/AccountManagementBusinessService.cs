using System;
using CodeProject.AccountManagement.Interfaces;
using System.Collections.Generic;
using CodeProject.AccountManagement.BusinessRules;
using CodeProject.AccountManagement.Data.Entities;
using CodeProject.AccountManagement.Data.Transformations;
using CodeProject.Shared.Common.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using System.Data;
using CodeProject.Shared.Common.Utilties;

namespace CodeProject.AccountManagement.BusinessServices
{
	public class AccountManagementBusinessService : IAccountManagementBusinessService
	{
		IAccountManagementDataService _accountManagementDataService;

		public IConfiguration configuration { get; }

		private readonly ConnectionStrings _connectionStrings;

		/// <summary>
		/// Acount Business Service
		/// </summary>
		/// <param name="accountDataService"></param>
		public AccountManagementBusinessService(IAccountManagementDataService accountManagementDataService, ConnectionStrings connectionStrings)
		{
			_accountManagementDataService = accountManagementDataService;
			_connectionStrings = connectionStrings;
		}
		/// <summary>
		/// Register User
		/// </summary>
		/// <param name="accountDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<AccountDataTransformation>> Register(AccountDataTransformation accountDataTransformation)
		{

			ResponseModel<AccountDataTransformation> returnResponse = new ResponseModel<AccountDataTransformation>();

			User user = new User();
			Account account = new Account();

			accountDataTransformation.EmailAddress = accountDataTransformation.EmailAddress.ToLower();

			try
			{
				_accountManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_accountManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				AccountBusinessRules<AccountDataTransformation> userBusinessRules = new AccountBusinessRules<AccountDataTransformation>(accountDataTransformation, _accountManagementDataService);
				ValidationResult validationResult = await userBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_accountManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				user.FirstName = accountDataTransformation.FirstName;
				user.LastName = accountDataTransformation.LastName;
				user.EmailAddress = accountDataTransformation.EmailAddress;
				user.UserTypeId = UserTypes.Administrator;

				account.Name = accountDataTransformation.CompanyName;

				string salt = Hasher.GetSalt();
				string hashedPassword = Hasher.GenerateHash(accountDataTransformation.Password + salt);

				user.Password = hashedPassword;
				user.PasswordSalt = salt;

				await _accountManagementDataService.CreateAccount(account);

				user.AccountId = account.AccountId;

				await _accountManagementDataService.CreateUser(user);

				await _accountManagementDataService.UpdateDatabase();

				_accountManagementDataService.CommitTransaction();
				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_accountManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_accountManagementDataService.CloseConnection();
			}

			accountDataTransformation.UserId = user.UserId;
			accountDataTransformation.AccountId = user.AccountId;
			accountDataTransformation.Password = string.Empty;
			accountDataTransformation.PasswordConfirmation = string.Empty;

			returnResponse.Entity = accountDataTransformation;

			return returnResponse;

		}
		/// <summary>
		/// Login to System
		/// </summary>
		/// <param name="AccountDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<AccountDataTransformation>> Login(AccountDataTransformation accountDataTransformation)
		{

			ResponseModel<AccountDataTransformation> returnResponse = new ResponseModel<AccountDataTransformation>();

			User user = new User();
			Account account = new Account();

			try
			{
				_accountManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				user = await _accountManagementDataService.GetUserByEmailAddress(accountDataTransformation.EmailAddress.ToLower());
				if (user == null)
				{
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("Login incorrect.");
					return returnResponse;
				}

				string hashedPassword = Hasher.GenerateHash(accountDataTransformation.Password + user.PasswordSalt);

				if (user.Password != hashedPassword)
				{
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("Login incorrect.");
					return returnResponse;
				}

				account = await _accountManagementDataService.GetAccountInformation(user.AccountId);
				if (account == null)
				{
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("Could not find an account for user.");
					return returnResponse;
				}

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_accountManagementDataService.CloseConnection();
			}

			accountDataTransformation.UserId = user.UserId;
			accountDataTransformation.AccountId = user.AccountId;
			accountDataTransformation.FirstName = user.FirstName;
			accountDataTransformation.LastName = user.LastName;
			accountDataTransformation.EmailAddress = user.EmailAddress;
			accountDataTransformation.CompanyName =
			accountDataTransformation.Password = string.Empty;

			returnResponse.Entity = accountDataTransformation;

			return returnResponse;

		}
		/// <summary>
		/// Update User
		/// </summary>
		/// <param name="accountDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<AccountDataTransformation>> UpdateUser(AccountDataTransformation accountDataTransformation)
		{

			ResponseModel<AccountDataTransformation> returnResponse = new ResponseModel<AccountDataTransformation>();

			try
			{
				_accountManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_accountManagementDataService.BeginTransaction();

				User user = await _accountManagementDataService.GetUserByUserId(accountDataTransformation.UserId);
				if (user == null)
				{
					_accountManagementDataService.RollbackTransaction();
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("User not found.");
					return returnResponse;
				}

				await _accountManagementDataService.UpdateUser(user);

				await _accountManagementDataService.UpdateDatabase();
				_accountManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_accountManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_accountManagementDataService.CloseConnection();
			}

			returnResponse.Entity = accountDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Update User
		/// </summary>
		/// <param name="userId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<User>> UpdateUser(int userId)
		{

			ResponseModel<User> returnResponse = new ResponseModel<User>();

			User user = new User();

			try
			{
				
				user = await _accountManagementDataService.GetUserByUserId(userId);
				if (user == null)
				{
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("User not found.");
					return returnResponse;
				}

				await _accountManagementDataService.UpdateUser(user);

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
		
			returnResponse.Entity = user;

			return returnResponse;

		}




	}

}

