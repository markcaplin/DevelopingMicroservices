using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using CodeProject.InventoryManagement.Interfaces;
using CodeProject.InventoryManagement.Data.Transformations;
using CodeProject.InventoryManagement.WebApi.ActionFilters;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common;
using Microsoft.AspNetCore.Authorization;
using CodeProject.Shared.Common.Interfaces;
using Microsoft.Extensions.Options;
using CodeProject.InventoryManagement.WebApi.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace CodeProject.InventoryManagement.WebApi.Controllers
{
	[ServiceFilter(typeof(SecurityFilter))]
	[Authorize]
	[Route("api/[controller]")]
	[EnableCors("SiteCorsPolicy")]
	[ApiController]
	public class SalesOrderController : ControllerBase
	{
		private readonly IInventoryManagementBusinessService _inventoryManagementBusinessService;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Sales Controller
		/// </summary>
		public SalesOrderController(IInventoryManagementBusinessService inventoryManagementBusinessService, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_inventoryManagementBusinessService = inventoryManagementBusinessService;
			_messageQueueContext = messageQueueContext;
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
				returnResponse = await _inventoryManagementBusinessService.SalesOrderInquiry(accountId, customerName, currentPageNumber, pageSize, sortExpression, sortDirection);
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
				returnResponse = await _inventoryManagementBusinessService.GetSalesOrder(accountId, salesOrderId);
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
				returnResponse = await _inventoryManagementBusinessService.UpdateSalesOrderDetail(salesOrderDetailDataTransformation);
				returnResponse.Token = securityModel.Token;
				if (returnResponse.ReturnStatus == false)
				{
					return BadRequest(returnResponse);
				}

				await _messageQueueContext.Clients.All.SendAsync(MessageQueueEndpoints.InventoryQueue, string.Empty);

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