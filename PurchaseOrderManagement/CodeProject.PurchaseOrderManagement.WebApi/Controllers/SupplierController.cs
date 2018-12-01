using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.Extensions.Configuration;
using CodeProject.PurchaseOrderManagement.Interfaces;
using CodeProject.PurchaseOrderManagement.Data.Transformations;
using CodeProject.PurchaseOrderManagement.WebApi.ActionFilters;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common;
using Microsoft.AspNetCore.Authorization;
using CodeProject.Shared.Common.Interfaces;
using Microsoft.Extensions.Options;
using CodeProject.PurchaseOrderManagement.WebApi.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace CodeProject.PurchaseOrderManagement.WebApi.Controllers
{
	[ServiceFilter(typeof(SecurityFilter))]
	[Authorize]
	[Route("api/[controller]")]
	[EnableCors("SiteCorsPolicy")]
	[ApiController]
	public class SupplierController : ControllerBase
	{
		private readonly IPurchaseOrderManagementBusinessService _purchaseOrderManagementBusinessService;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Supplier Controller
		/// </summary>
		public SupplierController(IPurchaseOrderManagementBusinessService purchaseOrderManagementBusinessService, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_purchaseOrderManagementBusinessService = purchaseOrderManagementBusinessService;
			_messageQueueContext = messageQueueContext;
		}

		/// <summary>
		/// Register User
		/// </summary>
		/// <param name="supplierDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("CreateSupplier")]
		public async Task<IActionResult> CreateSupplier([FromBody] SupplierDataTransformation supplierDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			supplierDataTransformation.AccountId = accountId;

			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();
			try
			{
				returnResponse = await _purchaseOrderManagementBusinessService.CreateSupplier(supplierDataTransformation);
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
		/// Update Supplier
		/// </summary>
		/// <param name="supplierDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("UpdateSupplier")]
		public async Task<IActionResult> UpdateSupplier([FromBody] SupplierDataTransformation supplierDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;

			supplierDataTransformation.AccountId = accountId;

			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();
			try
			{
				returnResponse = await _purchaseOrderManagementBusinessService.UpdateSupplier(supplierDataTransformation);
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
		/// Supplier Inquiry
		/// </summary>
		/// <param name="supplierInquiryDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("SupplierInquiry")]
		public async Task<IActionResult> SupplierInquiry([FromBody] SupplierInquiryDataTransformation supplierInquiryDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			string supplierName = supplierInquiryDataTransformation.SupplierName;
			int pageSize = supplierInquiryDataTransformation.PageSize;
			int currentPageNumber = supplierInquiryDataTransformation.CurrentPageNumber;
			string sortDirection = supplierInquiryDataTransformation.SortDirection;
			string sortExpression = supplierInquiryDataTransformation.SortExpression;

			ResponseModel<List<SupplierDataTransformation>> returnResponse = new ResponseModel<List<SupplierDataTransformation>>();

			try
			{
				returnResponse = await _purchaseOrderManagementBusinessService.SupplierInquiry(accountId, supplierName, currentPageNumber, pageSize, sortExpression, sortDirection);
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
		/// Get Supplier
		/// </summary>
		/// <param name="supplierDataTransformation"></param>
		/// <returns></returns>
		[HttpPost]
		[Route("GetSupplier")]
		public async Task<IActionResult> GetSupplier([FromBody] SupplierDataTransformation supplierDataTransformation)
		{

			SecurityModel securityModel = (SecurityModel)(HttpContext.Items["SecurityModel"]);

			int accountId = securityModel.AccountId;
			int supplierId = supplierDataTransformation.SupplierId;
		
			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();

			try
			{
				returnResponse = await _purchaseOrderManagementBusinessService.GetSupplierInformation(accountId, supplierId);
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