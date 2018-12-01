using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using CodeProject.SalesOrderManagement.Interfaces;
using CodeProject.SalesOrderManagement.Data.Transformations;
using CodeProject.SalesOrderManagement.WebApi.ActionFilters;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common;
using Microsoft.AspNetCore.Authorization;
using CodeProject.Shared.Common.Interfaces;
using Microsoft.Extensions.Options;
using CodeProject.SalesOrderManagement.WebApi.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace CodeProject.SalesOrderManagement.WebApi.Controllers
{
	[ServiceFilter(typeof(SecurityFilter))]
	[Authorize]
	[Route("api/[controller]")]
	[EnableCors("SiteCorsPolicy")]
	[ApiController]
	public class CustomerController : ControllerBase
	{
		private readonly ISalesOrderManagementBusinessService _salesOrderManagementBusinessService;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Customer Controller
		/// </summary>
		public CustomerController(ISalesOrderManagementBusinessService purchaseOrderManagementBusinessService, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_salesOrderManagementBusinessService = purchaseOrderManagementBusinessService;
			_messageQueueContext = messageQueueContext;
		}

		/// <summary>
		/// Register User
		/// </summary>
		/// <param name="customerDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("CreateCustomer")]
		public async Task<IActionResult> CreateCustomer([FromBody] CustomerDataTransformation customerDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			customerDataTransformation.AccountId = accountId;

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();
			try
			{
				returnResponse = await _salesOrderManagementBusinessService.CreateCustomer(customerDataTransformation);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				return Ok(returnResponse);

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
				return BadRequest(returnResponse);
			}

		}

		/// <summary>
		/// Update Customer
		/// </summary>
		/// <param name="customerDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("UpdateCustomer")]
		public async Task<IActionResult> UpdateCustomer([FromBody] CustomerDataTransformation customerDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			customerDataTransformation.AccountId = accountId;

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();
			try
			{
				returnResponse = await _salesOrderManagementBusinessService.UpdateCustomer(customerDataTransformation);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				return Ok(returnResponse);

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
				return BadRequest(returnResponse);
			}

		}

		/// <summary>
		/// Customer Inquiry
		/// </summary>
		/// <param name="customerInquiryDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("CustomerInquiry")]
		public async Task<IActionResult> CustomerInquiry([FromBody] CustomerInquiryDataTransformation customerInquiryDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			string customerName = customerInquiryDataTransformation.CustomerName;
			int pageSize = customerInquiryDataTransformation.PageSize;
			int currentPageNumber = customerInquiryDataTransformation.CurrentPageNumber;
			string sortDirection = customerInquiryDataTransformation.SortDirection;
			string sortExpression = customerInquiryDataTransformation.SortExpression;

			ResponseModel<List<CustomerDataTransformation>> returnResponse = new ResponseModel<List<CustomerDataTransformation>>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.CustomerInquiry(accountId, customerName, currentPageNumber, pageSize, sortExpression, sortDirection);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				return Ok(returnResponse);

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
				return BadRequest(returnResponse);
			}

		}

		/// <summary>
		/// Get Customer
		/// </summary>
		/// <param name="customerDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("GetCustomer")]
		public async Task<IActionResult> GetCustomer([FromBody] CustomerDataTransformation customerDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			int customerId = customerDataTransformation.CustomerId;

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.GetCustomerInformation(accountId, customerId);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				return Ok(returnResponse);

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