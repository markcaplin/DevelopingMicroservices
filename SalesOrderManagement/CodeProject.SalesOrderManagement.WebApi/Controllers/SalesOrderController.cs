
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
	public class SalesOrderController : ControllerBase
	{
		private readonly ISalesOrderManagementBusinessService _salesOrderManagementBusinessService;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Sales Controller
		/// </summary>
		public SalesOrderController(ISalesOrderManagementBusinessService salesOrderManagementBusinessService, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_salesOrderManagementBusinessService = salesOrderManagementBusinessService;
			_messageQueueContext = messageQueueContext;
		}

		/// <summary>
		/// Create Sales Order
		/// </summary>
		/// <param name="salesOrderDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("CreateSalesOrder")]
		public async Task<IActionResult> CreateSalesOrder([FromBody] SalesOrderDataTransformation salesOrderDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			salesOrderDataTransformation.AccountId = accountId;

			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.CreateSalesOrder(salesOrderDataTransformation);
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
		/// Create Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("CreateSalesOrderDetail")]
		public async Task<IActionResult> CreateSalesOrderDetail([FromBody] SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			int salesOrderId = salesOrderDetailDataTransformation.SalesOrderId;

			salesOrderDetailDataTransformation.AccountId = accountId;

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.CreateSalesOrderDetail(salesOrderDetailDataTransformation);
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
		/// Update Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("UpdateSalesOrderDetail")]
		public async Task<IActionResult> UpdateSalesOrderDetail([FromBody] SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			salesOrderDetailDataTransformation.AccountId = accountId;

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.UpdateSalesOrderDetail(salesOrderDetailDataTransformation);
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
		/// Delete Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("DeleteSalesOrderDetail")]
		public async Task<IActionResult> DeleteSalesOrderDetail([FromBody] SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			salesOrderDetailDataTransformation.AccountId = accountId;

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.DeleteSalesOrderDetail(salesOrderDetailDataTransformation);
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
		/// Get Sales Order
		/// </summary>
		/// <param name="salesOrderDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("GetSalesOrder")]
		public async Task<IActionResult> GetSalesOrder([FromBody] SalesOrderDataTransformation salesOrderDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			int salesOrderId = salesOrderDataTransformation.SalesOrderId;

			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.GetSalesOrder(accountId, salesOrderId);
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
		/// Get Product
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("GetProduct")]
		public async Task<IActionResult> GetProduct([FromBody] ProductDataTransformation productDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			string productNumber = productDataTransformation.ProductNumber;

			ResponseModel<ProductDataTransformation> returnResponse = new ResponseModel<ProductDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.GetProduct(accountId, productNumber);
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
		/// Sales Order Inquiry
		/// </summary>
		/// <param name="salesOrderInquiryDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("SalesOrderInquiry")]
		public async Task<IActionResult> SalesOrderInquiry([FromBody] SalesOrderInquiryDataTransformation salesOrderInquiryDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			string customerName = salesOrderInquiryDataTransformation.CustomerName;
			int pageSize = salesOrderInquiryDataTransformation.PageSize;
			int currentPageNumber = salesOrderInquiryDataTransformation.CurrentPageNumber;
			string sortDirection = salesOrderInquiryDataTransformation.SortDirection;
			string sortExpression = salesOrderInquiryDataTransformation.SortExpression;

			ResponseModel<List<SalesOrderDataTransformation>> returnResponse = new ResponseModel<List<SalesOrderDataTransformation>>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.SalesOrderInquiry(accountId, customerName, currentPageNumber, pageSize, sortExpression, sortDirection);
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
		/// Submit Sales Order
		/// </summary>
		/// <param name="salesOrderDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("SubmitSalesOrder")]
		public async Task<IActionResult> SubmitSalesOrder([FromBody] SalesOrderDataTransformation salesOrderDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			salesOrderDataTransformation.AccountId = accountId;

			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();

			try
			{
				returnResponse = await _salesOrderManagementBusinessService.SubmitSalesOrder(salesOrderDataTransformation);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				await _messageQueueContext.Clients.All.SendAsync(MessageQueueEndpoints.SalesOrderQueue, string.Empty);

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