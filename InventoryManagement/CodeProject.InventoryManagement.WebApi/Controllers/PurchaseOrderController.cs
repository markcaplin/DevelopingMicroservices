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

namespace CodeProject.InventoryManagementManagement.WebApi.Controllers
{
	[ServiceFilter(typeof(SecurityFilter))]
	[Authorize]
	[Route("api/[controller]")]
	[EnableCors("SiteCorsPolicy")]
	[ApiController]
	public class PurchaseOrderController : ControllerBase
	{
		private readonly IInventoryManagementBusinessService _inventoryManagementBusinessService;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Purchase Controller
		/// </summary>
		public PurchaseOrderController(IInventoryManagementBusinessService inventoryManagementBusinessService, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_inventoryManagementBusinessService = inventoryManagementBusinessService;
			_messageQueueContext = messageQueueContext;
		}
	
		/// <summary>
		/// Purchase Order Inquiry
		/// </summary>
		/// <param name="purchaseOrderInquiryDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("PurchaseOrderInquiry")]
		public async Task<IActionResult> PurchaseOrderInquiry([FromBody] PurchaseOrderInquiryDataTransformation purchaseOrderInquiryDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			string supplierName = purchaseOrderInquiryDataTransformation.SupplierName;
			int pageSize = purchaseOrderInquiryDataTransformation.PageSize;
			int currentPageNumber = purchaseOrderInquiryDataTransformation.CurrentPageNumber;
			string sortDirection = purchaseOrderInquiryDataTransformation.SortDirection;
			string sortExpression = purchaseOrderInquiryDataTransformation.SortExpression;

			ResponseModel<List<PurchaseOrderDataTransformation>> returnResponse = new ResponseModel<List<PurchaseOrderDataTransformation>>();

			try
			{
				returnResponse = await _inventoryManagementBusinessService.PurchaseOrderInquiry(accountId, supplierName, currentPageNumber, pageSize, sortExpression, sortDirection);
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
		/// Get Purchase Order
		/// </summary>
		/// <param name="purchaseOrderDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("GetPurchaseOrder")]
		public async Task<IActionResult> GetPurchaseOrder([FromBody] PurchaseOrderDataTransformation purchaseOrderDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			int purchaseOrderId = purchaseOrderDataTransformation.PurchaseOrderId;

			ResponseModel<PurchaseOrderDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDataTransformation>();

			try
			{
				returnResponse = await _inventoryManagementBusinessService.GetPurchaseOrder(accountId, purchaseOrderId);
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
		/// Update Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("UpdatePurchaseOrderDetail")]
		public async Task<IActionResult> UpdatePurchaseOrderDetail([FromBody] PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			purchaseOrderDetailDataTransformation.AccountId = accountId;

			ResponseModel<PurchaseOrderDetailDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDetailDataTransformation>();

			try
			{
				returnResponse = await _inventoryManagementBusinessService.UpdatePurchaseOrderDetail(purchaseOrderDetailDataTransformation);
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