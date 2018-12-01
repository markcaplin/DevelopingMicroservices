using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using CodeProject.AccountManagement.Interfaces;
using CodeProject.AccountManagement.Data.Transformations;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common;

namespace CodeProject.AccountManagement.WebApi.Controllers
{
   
	[Route("api/[controller]")]
	[EnableCors("SiteCorsPolicy")]
	[ApiController]
	public class AuthorizationController : ControllerBase
    {
		private readonly IAccountManagementBusinessService _accountBusinessService;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Movies Controller
		/// </summary>
		public AuthorizationController(IAccountManagementBusinessService accountBusinessService)
		{
			_accountBusinessService = accountBusinessService;
		}

		/// <summary>
		/// Register User
		/// </summary>
		/// <param name="accountDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("Register")]
		public async Task<IActionResult> Register([FromBody] AccountDataTransformation accountDataTransformation)
		{
			ResponseModel<AccountDataTransformation> returnResponse = new ResponseModel<AccountDataTransformation>();
			try
			{
				returnResponse = await _accountBusinessService.Register(accountDataTransformation);
				if (returnResponse.ReturnStatus == true)
				{
					int userId = returnResponse.Entity.UserId;
					int accountId = returnResponse.Entity.AccountId;
					string firstName = returnResponse.Entity.FirstName;
					string lastName = returnResponse.Entity.LastName;
					string emailAddress = returnResponse.Entity.EmailAddress;
					string companyName = returnResponse.Entity.CompanyName;

					string tokenString = TokenManagement.CreateToken(userId, firstName, lastName, emailAddress, accountId, companyName);
					returnResponse.Entity.IsAuthenicated = true;
					returnResponse.Entity.Token = tokenString;
					return Ok(returnResponse);

				}
				else
				{
					return BadRequest(returnResponse);
				}

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
				return BadRequest(returnResponse);
			}

		}
		/// <summary>
		/// Login
		/// </summary>
		/// <param name="accountDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("Login")]
		public async Task<IActionResult> Login([FromBody] AccountDataTransformation accountDataTransformation)
		{
			ResponseModel<AccountDataTransformation> returnResponse = new ResponseModel<AccountDataTransformation>();
			try
			{
				returnResponse = await _accountBusinessService.Login(accountDataTransformation);
				if (returnResponse.ReturnStatus == true)
				{
					int userId = returnResponse.Entity.UserId;
					int accountId = returnResponse.Entity.AccountId;
					string firstName = returnResponse.Entity.FirstName;
					string lastName = returnResponse.Entity.LastName;
					string emailAddress = returnResponse.Entity.EmailAddress;
					string companyName = returnResponse.Entity.CompanyName;

					string tokenString = TokenManagement.CreateToken(userId, firstName, lastName, emailAddress, accountId, companyName);
					returnResponse.Entity.IsAuthenicated = true;
					returnResponse.Entity.Token = tokenString;
					return Ok(returnResponse);
				}
				else
				{
					return BadRequest(returnResponse);
				}

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
				return BadRequest(returnResponse);
			}

		}
	}
}