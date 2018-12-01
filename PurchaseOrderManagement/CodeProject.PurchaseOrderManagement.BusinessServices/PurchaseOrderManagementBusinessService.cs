using System;
using CodeProject.PurchaseOrderManagement.Interfaces;
using System.Collections.Generic;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using CodeProject.PurchaseOrderManagement.Data.Transformations;
using CodeProject.Shared.Common.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using System.Data;
using CodeProject.Shared.Common.Utilities;
using CodeProject.Shared.Common.Models.MessageQueuePayloads;
using CodeProject.InventoryManagement.BusinessRules;

namespace CodeProject.PurchaseOrderManagement.BusinessServices
{
	public class PurchaseOrderManagementBusinessService : IPurchaseOrderManagementBusinessService
	{
		private readonly IPurchaseOrderManagementDataService _purchaseOrderManagementDataService;
		private readonly ConnectionStrings _connectionStrings;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Acount Business Service
		/// </summary>
		/// <param name="accountDataService"></param>
		public PurchaseOrderManagementBusinessService(IPurchaseOrderManagementDataService purchaseOrderManagementDataService, ConnectionStrings connectionStrings)
		{
			_purchaseOrderManagementDataService = purchaseOrderManagementDataService;
			_connectionStrings = connectionStrings;
		}

		/// <summary>
		/// Create Supplier
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SupplierDataTransformation>> CreateSupplier(SupplierDataTransformation supplierDataTransformation)
		{

			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();

			Supplier supplier = new Supplier();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				SupplierBusinessRules<SupplierDataTransformation> supplierBusinessRules = new SupplierBusinessRules<SupplierDataTransformation>(supplierDataTransformation, _purchaseOrderManagementDataService);
				ValidationResult validationResult = await supplierBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				supplier.AccountId = supplierDataTransformation.AccountId;
				supplier.Name = supplierDataTransformation.SupplierName;
				supplier.AddressLine1 = supplierDataTransformation.AddressLine1;
				supplier.AddressLine2 = supplierDataTransformation.AddressLine2;
				supplier.City = supplierDataTransformation.City;
				supplier.Region = supplierDataTransformation.Region;
				supplier.PostalCode = supplierDataTransformation.PostalCode;

				await _purchaseOrderManagementDataService.CreateSupplier(supplier);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			supplierDataTransformation.SupplierId = supplier.SupplierId;

			returnResponse.Entity = supplierDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Create Purchase Order
		/// </summary>
		/// <param name="purchaseOrderDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDataTransformation>> CreatePurchaseOrder(PurchaseOrderDataTransformation purchaseOrderDataTransformation)
		{

			ResponseModel<PurchaseOrderDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDataTransformation>();

			PurchaseOrder purchaseOrder = new PurchaseOrder();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				PurchaseOrderNumberSequence purchaseOrderNumberSequence = await _purchaseOrderManagementDataService.GetPurchaseOrderNumberSequence(purchaseOrderDataTransformation.AccountId);
				if (purchaseOrderNumberSequence == null)
				{
					purchaseOrderNumberSequence = new PurchaseOrderNumberSequence();
					purchaseOrderNumberSequence.AccountId = purchaseOrderDataTransformation.AccountId;
					purchaseOrderNumberSequence.PurchaseOrderNumber = 100000;
					await _purchaseOrderManagementDataService.CreatePurchaseOrderNumberSequence(purchaseOrderNumberSequence);
				}
				else
				{
					purchaseOrderNumberSequence.PurchaseOrderNumber = purchaseOrderNumberSequence.PurchaseOrderNumber + 1;
					await _purchaseOrderManagementDataService.UpdatePurchaseOrderNumberSequence(purchaseOrderNumberSequence);
				}

				purchaseOrder.PurchaseOrderNumber = purchaseOrderNumberSequence.PurchaseOrderNumber;
				purchaseOrder.AccountId = purchaseOrderDataTransformation.AccountId;
				purchaseOrder.SupplierId = purchaseOrderDataTransformation.SupplierId;
				purchaseOrder.PurchaseOrderStatusId = PurchaseOrderStatuses.Open;
				purchaseOrder.OrderTotal = 0.0;

				await _purchaseOrderManagementDataService.CreatePurchaseOrder(purchaseOrder);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			purchaseOrderDataTransformation.PurchaseOrderId = purchaseOrder.PurchaseOrderId;

			returnResponse.Entity = purchaseOrderDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Submit Purchase Order
		/// </summary>
		/// <param name="purchaseOrderDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDataTransformation>> SubmitPurchaseOrder(PurchaseOrderDataTransformation purchaseOrderDataTransformation)
		{

			ResponseModel<PurchaseOrderDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDataTransformation>();

			PurchaseOrder purchaseOrder = new PurchaseOrder();

			int accountId = purchaseOrderDataTransformation.AccountId;
			int purchaseOrderId = purchaseOrderDataTransformation.PurchaseOrderId;

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrder(accountId, purchaseOrderId);
				if (purchaseOrder == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				if (purchaseOrder.OrderTotal == 0.00)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order has not value.");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				purchaseOrder.PurchaseOrderStatusId = PurchaseOrderStatuses.Submitted;

				await _purchaseOrderManagementDataService.UpdateDatabase();

				purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrder(accountId, purchaseOrderId);

				TransactionQueueOutbound transactionQueue = new TransactionQueueOutbound();
				transactionQueue.Payload = GeneratePurchaseOrderSubmittedPayload(purchaseOrder);
				transactionQueue.TransactionCode = TransactionQueueTypes.PurchaseOrderSubmitted;
				transactionQueue.ExchangeName = MessageQueueExchanges.PurchaseOrderManagement;

				await _purchaseOrderManagementDataService.CreateOutboundTransactionQueue(transactionQueue);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

				purchaseOrderDataTransformation.PurchaseOrderStatusId = purchaseOrder.PurchaseOrderStatusId;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = purchaseOrderDataTransformation;

			return returnResponse;

		}



		/// <summary>
		/// Create Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDetailDataTransformation>> CreatePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation)
		{

			ResponseModel<PurchaseOrderDetailDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDetailDataTransformation>();

			PurchaseOrderDetail purchaseOrderDetail = new PurchaseOrderDetail();

			try
			{
				int accountId = purchaseOrderDetailDataTransformation.AccountId;
				int purchaseOrderId = purchaseOrderDetailDataTransformation.PurchaseOrderId;

				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				PurchaseOrderDetailBusinessRules<PurchaseOrderDetailDataTransformation> purchaseOrderDetailBusinessRules = new PurchaseOrderDetailBusinessRules<PurchaseOrderDetailDataTransformation>(purchaseOrderDetailDataTransformation);
				ValidationResult validationResult = purchaseOrderDetailBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				PurchaseOrder purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrderHeader(accountId, purchaseOrderId);
				if (purchaseOrder == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				double lineItemAmount = purchaseOrderDetailDataTransformation.UnitPrice * purchaseOrderDetailDataTransformation.OrderQuantity;

				purchaseOrder.OrderTotal = purchaseOrder.OrderTotal + lineItemAmount;

				purchaseOrderDetailDataTransformation.OrderTotal = purchaseOrder.OrderTotal;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderHeader(purchaseOrder);

				purchaseOrderDetail.ProductId = purchaseOrderDetailDataTransformation.ProductId;
				purchaseOrderDetail.PurchaseOrderId = purchaseOrderDetailDataTransformation.PurchaseOrderId;
				purchaseOrderDetail.UnitPrice = purchaseOrderDetailDataTransformation.UnitPrice;
				purchaseOrderDetail.OrderQuantity = purchaseOrderDetailDataTransformation.OrderQuantity;

				await _purchaseOrderManagementDataService.CreatePurchaseOrderDetail(purchaseOrderDetail);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				PurchaseOrderDetail updatedPurchaseOrderDetail = await _purchaseOrderManagementDataService.GetPurchaseOrderDetail(purchaseOrderDetail.PurchaseOrderDetailId);

				purchaseOrderDetailDataTransformation = new PurchaseOrderDetailDataTransformation();

				purchaseOrderDetailDataTransformation.PurchaseOrderDetailId = updatedPurchaseOrderDetail.PurchaseOrderDetailId;
				purchaseOrderDetailDataTransformation.PurchaseOrderId = updatedPurchaseOrderDetail.PurchaseOrderId;
				purchaseOrderDetailDataTransformation.ProductId = updatedPurchaseOrderDetail.ProductId;
				purchaseOrderDetailDataTransformation.ProductMasterId = updatedPurchaseOrderDetail.Product.ProductMasterId;
				purchaseOrderDetailDataTransformation.ProductNumber = updatedPurchaseOrderDetail.Product.ProductNumber;
				purchaseOrderDetailDataTransformation.ProductDescription = updatedPurchaseOrderDetail.Product.Description;
				purchaseOrderDetailDataTransformation.UnitPrice = updatedPurchaseOrderDetail.UnitPrice;
				purchaseOrderDetailDataTransformation.OrderQuantity = updatedPurchaseOrderDetail.OrderQuantity;
				purchaseOrderDetailDataTransformation.OrderTotal = purchaseOrder.OrderTotal;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = purchaseOrderDetailDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Update Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDetailDataTransformation>> UpdatePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation)
		{

			ResponseModel<PurchaseOrderDetailDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDetailDataTransformation>();

			PurchaseOrderDetail purchaseOrderDetail = new PurchaseOrderDetail();

			try
			{
				int accountId = purchaseOrderDetailDataTransformation.AccountId;
				int purchaseOrderId = purchaseOrderDetailDataTransformation.PurchaseOrderId;
				int purchaseOrderDetailId = purchaseOrderDetailDataTransformation.PurchaseOrderDetailId;

				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				PurchaseOrderDetailBusinessRules<PurchaseOrderDetailDataTransformation> purchaseOrderDetailBusinessRules = new PurchaseOrderDetailBusinessRules<PurchaseOrderDetailDataTransformation>(purchaseOrderDetailDataTransformation);
				ValidationResult validationResult = purchaseOrderDetailBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				PurchaseOrder purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrderHeader(accountId, purchaseOrderId);
				if (purchaseOrder == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				purchaseOrderDetail = await _purchaseOrderManagementDataService.GetPurchaseOrderDetailForUpdate(purchaseOrderDetailId);
				if (purchaseOrderDetail == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order Detail not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				double originalLineItemAmount = purchaseOrderDetail.OrderQuantity * purchaseOrderDetail.UnitPrice;
				double newLineItemAmount = purchaseOrderDetailDataTransformation.UnitPrice * purchaseOrderDetailDataTransformation.OrderQuantity;

				purchaseOrder.OrderTotal = purchaseOrder.OrderTotal + newLineItemAmount - originalLineItemAmount;

				purchaseOrderDetailDataTransformation.OrderTotal = purchaseOrder.OrderTotal;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderHeader(purchaseOrder);

				purchaseOrderDetail.UnitPrice = purchaseOrderDetailDataTransformation.UnitPrice;
				purchaseOrderDetail.OrderQuantity = purchaseOrderDetailDataTransformation.OrderQuantity;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderDetail(purchaseOrderDetail);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = purchaseOrderDetailDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Delete Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDetailDataTransformation>> DeletePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation)
		{

			ResponseModel<PurchaseOrderDetailDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDetailDataTransformation>();

			PurchaseOrderDetail purchaseOrderDetail = new PurchaseOrderDetail();

			try
			{
				int accountId = purchaseOrderDetailDataTransformation.AccountId;
				int purchaseOrderId = purchaseOrderDetailDataTransformation.PurchaseOrderId;
				int purchaseOrderDetailId = purchaseOrderDetailDataTransformation.PurchaseOrderDetailId;

				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				PurchaseOrder purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrderHeader(accountId, purchaseOrderId);
				if (purchaseOrder == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				purchaseOrderDetail = await _purchaseOrderManagementDataService.GetPurchaseOrderDetailForUpdate(purchaseOrderDetailId);
				if (purchaseOrderDetail == null)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Purchase Order Detail not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				double originalLineItemAmount = purchaseOrderDetail.OrderQuantity * purchaseOrderDetail.UnitPrice;

				await _purchaseOrderManagementDataService.DeletePurchaseOrderDetail(purchaseOrderDetailId);

				purchaseOrder.OrderTotal = purchaseOrder.OrderTotal - originalLineItemAmount;

				purchaseOrderDetailDataTransformation.OrderTotal = purchaseOrder.OrderTotal;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderHeader(purchaseOrder);

				purchaseOrderDetail.UnitPrice = purchaseOrderDetailDataTransformation.UnitPrice;
				purchaseOrderDetail.OrderQuantity = purchaseOrderDetailDataTransformation.OrderQuantity;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderDetail(purchaseOrderDetail);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = purchaseOrderDetailDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Update Supplier
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SupplierDataTransformation>> UpdateSupplier(SupplierDataTransformation supplierDataTransformation)
		{

			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();

			Supplier supplier = new Supplier();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				SupplierBusinessRules<SupplierDataTransformation> supplierBusinessRules = new SupplierBusinessRules<SupplierDataTransformation>(supplierDataTransformation, _purchaseOrderManagementDataService);
				ValidationResult validationResult = await supplierBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_purchaseOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				int supplierId = supplierDataTransformation.SupplierId;
				int accountId = supplierDataTransformation.AccountId;

				supplier = await _purchaseOrderManagementDataService.GetSupplierInformationForUpdate(accountId, supplierId);

				supplier.Name = supplierDataTransformation.SupplierName;
				supplier.AddressLine1 = supplierDataTransformation.AddressLine1;
				supplier.AddressLine2 = supplierDataTransformation.AddressLine2;
				supplier.City = supplierDataTransformation.City;
				supplier.Region = supplierDataTransformation.Region;
				supplier.PostalCode = supplierDataTransformation.PostalCode;

				await _purchaseOrderManagementDataService.UpdateSupplier(supplier);

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = supplierDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Supplier Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierName"></param>
		/// <param name="currentPageNumber"></param>
		/// <param name="pageSize"></param>
		/// <param name="sortExpression"></param>
		/// <param name="sortDirection"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<SupplierDataTransformation>>> SupplierInquiry(int accountId, string supplierName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection)
		{

			ResponseModel<List<SupplierDataTransformation>> returnResponse = new ResponseModel<List<SupplierDataTransformation>>();

			List<SupplierDataTransformation> suppliers = new List<SupplierDataTransformation>();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				DataGridPagingInformation dataGridPagingInformation = new DataGridPagingInformation();
				dataGridPagingInformation.CurrentPageNumber = currentPageNumber;
				dataGridPagingInformation.PageSize = pageSize;
				dataGridPagingInformation.SortDirection = sortDirection;
				dataGridPagingInformation.SortExpression = sortExpression;

				List<Supplier> supplierList = await _purchaseOrderManagementDataService.SupplierInquiry(accountId, supplierName, dataGridPagingInformation);
				foreach (Supplier supplier in supplierList)
				{
					SupplierDataTransformation supplierDataTransformation = new SupplierDataTransformation();
					supplierDataTransformation.SupplierId = supplier.SupplierId;
					supplierDataTransformation.AddressLine1 = supplier.AddressLine1;
					supplierDataTransformation.AddressLine2 = supplier.AddressLine2;
					supplierDataTransformation.City = supplier.City;
					supplierDataTransformation.Region = supplier.Region;
					supplierDataTransformation.PostalCode = supplier.PostalCode;
					supplierDataTransformation.SupplierName = supplier.Name;
					suppliers.Add(supplierDataTransformation);

				}

				returnResponse.Entity = suppliers;
				returnResponse.TotalRows = dataGridPagingInformation.TotalRows;
				returnResponse.TotalPages = dataGridPagingInformation.TotalPages;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			return returnResponse;

		}

		/// <summary>
		/// Get Supplier Information
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SupplierDataTransformation>> GetSupplierInformation(int accountId, int supplierId)
		{

			ResponseModel<SupplierDataTransformation> returnResponse = new ResponseModel<SupplierDataTransformation>();
			SupplierDataTransformation supplierDataTransformation = new SupplierDataTransformation();

			Supplier supplier = new Supplier();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				supplier = await _purchaseOrderManagementDataService.GetSupplierInformation(accountId, supplierId);

				supplierDataTransformation = new SupplierDataTransformation();
				supplierDataTransformation.SupplierId = supplier.SupplierId;
				supplierDataTransformation.AddressLine1 = supplier.AddressLine1;
				supplierDataTransformation.AddressLine2 = supplier.AddressLine2;
				supplierDataTransformation.City = supplier.City;
				supplierDataTransformation.Region = supplier.Region;
				supplierDataTransformation.PostalCode = supplier.PostalCode;
				supplierDataTransformation.SupplierName = supplier.Name;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = supplierDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Get Purchase Order
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="purchaseOrderId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<PurchaseOrderDataTransformation>> GetPurchaseOrder(int accountId, int purchaseOrderId)
		{
			ResponseModel<PurchaseOrderDataTransformation> returnResponse = new ResponseModel<PurchaseOrderDataTransformation>();
			PurchaseOrderDataTransformation purchaseOrderDataTransformation = new PurchaseOrderDataTransformation();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				PurchaseOrder purchaseOrder = await _purchaseOrderManagementDataService.GetPurchaseOrder(accountId, purchaseOrderId);

				purchaseOrderDataTransformation.PurchaseOrderId = purchaseOrderId;
				purchaseOrderDataTransformation.PurchaseOrderNumber = purchaseOrder.PurchaseOrderNumber;
				purchaseOrderDataTransformation.PurchaseOrderStatusId = purchaseOrder.PurchaseOrderStatusId;
				purchaseOrderDataTransformation.SupplierId = purchaseOrder.Supplier.SupplierId;
				purchaseOrderDataTransformation.SupplierName = purchaseOrder.Supplier.Name;
				purchaseOrderDataTransformation.AddressLine1 = purchaseOrder.Supplier.AddressLine1;
				purchaseOrderDataTransformation.AddressLine2 = purchaseOrder.Supplier.AddressLine2;
				purchaseOrderDataTransformation.City = purchaseOrder.Supplier.City;
				purchaseOrderDataTransformation.Region = purchaseOrder.Supplier.Region;
				purchaseOrderDataTransformation.PostalCode = purchaseOrder.Supplier.PostalCode;
				purchaseOrderDataTransformation.OrderTotal = purchaseOrder.OrderTotal;
				purchaseOrderDataTransformation.PurchaseOrderStatusDescription = purchaseOrder.PurchaseOrderStatus.Description;
				purchaseOrderDataTransformation.DateCreated = purchaseOrder.DateCreated;
				purchaseOrderDataTransformation.DateUpdated = purchaseOrder.DateUpdated;
				purchaseOrderDataTransformation.PurchaseOrderDetails = new List<PurchaseOrderDetailDataTransformation>();

				foreach (PurchaseOrderDetail purchaseOrderDetail in purchaseOrder.PurchaseOrderDetails)
				{
					PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation = new PurchaseOrderDetailDataTransformation();
					purchaseOrderDetailDataTransformation.PurchaseOrderDetailId = purchaseOrderDetail.PurchaseOrderDetailId;
					purchaseOrderDetailDataTransformation.PurchaseOrderId = purchaseOrderDetail.PurchaseOrderId;
					purchaseOrderDetailDataTransformation.ProductId = purchaseOrderDetail.ProductId;
					purchaseOrderDetailDataTransformation.ProductMasterId = purchaseOrderDetail.Product.ProductMasterId;
					purchaseOrderDetailDataTransformation.ProductNumber = purchaseOrderDetail.Product.ProductNumber;
					purchaseOrderDetailDataTransformation.ProductDescription = purchaseOrderDetail.Product.Description;
					purchaseOrderDetailDataTransformation.UnitPrice = purchaseOrderDetail.UnitPrice;
					purchaseOrderDetailDataTransformation.OrderQuantity = purchaseOrderDetail.OrderQuantity;
					purchaseOrderDetailDataTransformation.DateCreated = purchaseOrderDetail.DateCreated;
					purchaseOrderDetailDataTransformation.DateUpdated = purchaseOrderDetail.DateUpdated;

					purchaseOrderDataTransformation.PurchaseOrderDetails.Add(purchaseOrderDetailDataTransformation);
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
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = purchaseOrderDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Get Product
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="productNumber"></param>
		/// <returns></returns>
		public async Task<ResponseModel<ProductDataTransformation>> GetProduct(int accountId, string productNumber)
		{
			ResponseModel<ProductDataTransformation> returnResponse = new ResponseModel<ProductDataTransformation>();
			ProductDataTransformation productDataTransformation = new ProductDataTransformation();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				Product product = await _purchaseOrderManagementDataService.GetProduct(accountId, productNumber);
				if (product == null)
				{
					returnResponse.ReturnStatus = false;
					returnResponse.ReturnMessage.Add("Product Number not found.");
				}
				else
				{
					productDataTransformation.AccountId = product.AccountId;
					productDataTransformation.ProductId = product.ProductId;
					productDataTransformation.ProductMasterId = product.ProductMasterId;
					productDataTransformation.ProductNumber = product.ProductNumber;
					productDataTransformation.Description = product.Description;
					returnResponse.ReturnStatus = true;
				}

			}
			catch (Exception ex)
			{
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = productDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Purchase Order Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierName"></param>
		/// <param name="currentPageNumber"></param>
		/// <param name="pageSize"></param>
		/// <param name="sortExpression"></param>
		/// <param name="sortDirection"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<PurchaseOrderDataTransformation>>> PurchaseOrderInquiry(int accountId, string supplierName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection)
		{

			ResponseModel<List<PurchaseOrderDataTransformation>> returnResponse = new ResponseModel<List<PurchaseOrderDataTransformation>>();

			List<PurchaseOrderDataTransformation> purchaseOrders = new List<PurchaseOrderDataTransformation>();

			try
			{
				_purchaseOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				DataGridPagingInformation dataGridPagingInformation = new DataGridPagingInformation();
				dataGridPagingInformation.CurrentPageNumber = currentPageNumber;
				dataGridPagingInformation.PageSize = pageSize;
				dataGridPagingInformation.SortDirection = sortDirection;
				dataGridPagingInformation.SortExpression = sortExpression;

				List<PurchaseOrder> purchaseOrderList = await _purchaseOrderManagementDataService.PurchaseOrderInquiry(accountId, supplierName, dataGridPagingInformation);
				foreach (PurchaseOrder purchaseOrder in purchaseOrderList)
				{
					PurchaseOrderDataTransformation purchaseOrderDataTransformation = new PurchaseOrderDataTransformation();
					purchaseOrderDataTransformation.SupplierId = purchaseOrder.SupplierId;
					purchaseOrderDataTransformation.AddressLine1 = purchaseOrder.Supplier.AddressLine1;
					purchaseOrderDataTransformation.AddressLine2 = purchaseOrder.Supplier.AddressLine2;
					purchaseOrderDataTransformation.City = purchaseOrder.Supplier.City;
					purchaseOrderDataTransformation.Region = purchaseOrder.Supplier.Region;
					purchaseOrderDataTransformation.PostalCode = purchaseOrder.Supplier.PostalCode;
					purchaseOrderDataTransformation.SupplierName = purchaseOrder.Supplier.Name;
					purchaseOrderDataTransformation.DateCreated = purchaseOrder.DateCreated;
					purchaseOrderDataTransformation.OrderTotal = purchaseOrder.OrderTotal;
					purchaseOrderDataTransformation.AccountId = purchaseOrder.AccountId;
					purchaseOrderDataTransformation.PurchaseOrderId = purchaseOrder.PurchaseOrderId;
					purchaseOrderDataTransformation.PurchaseOrderNumber = purchaseOrder.PurchaseOrderNumber;
					purchaseOrderDataTransformation.PurchaseOrderStatusId = purchaseOrder.PurchaseOrderStatusId;
					purchaseOrderDataTransformation.PurchaseOrderStatusDescription = purchaseOrder.PurchaseOrderStatus.Description;
					purchaseOrders.Add(purchaseOrderDataTransformation);
				}

				returnResponse.Entity = purchaseOrders;
				returnResponse.TotalRows = dataGridPagingInformation.TotalRows;
				returnResponse.TotalPages = dataGridPagingInformation.TotalPages;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_purchaseOrderManagementDataService.CloseConnection();
			}

			return returnResponse;

		}

		/// <summary>
		/// Generate Purchase Order Submitted Payload
		/// </summary>
		/// <param name="purchaseOrder"></param>
		/// <returns></returns>
		private string GeneratePurchaseOrderSubmittedPayload(PurchaseOrder purchaseOrder)
		{
			
			PurchaseOrderUpdatePayload purchaseOrderUpdatePayload = new PurchaseOrderUpdatePayload();

			purchaseOrderUpdatePayload.AccountId = purchaseOrder.AccountId;
			purchaseOrderUpdatePayload.PurchaseOrderId = purchaseOrder.PurchaseOrderId;
			purchaseOrderUpdatePayload.PurchaseOrderNumber = purchaseOrder.PurchaseOrderNumber;
			purchaseOrderUpdatePayload.PurchaseOrderStatusId = purchaseOrder.PurchaseOrderStatusId;
			purchaseOrderUpdatePayload.SupplierId = purchaseOrder.Supplier.SupplierId;
			purchaseOrderUpdatePayload.SupplierName = purchaseOrder.Supplier.Name;
			purchaseOrderUpdatePayload.AddressLine1 = purchaseOrder.Supplier.AddressLine1;
			purchaseOrderUpdatePayload.AddressLine2 = purchaseOrder.Supplier.AddressLine2;
			purchaseOrderUpdatePayload.City = purchaseOrder.Supplier.City;
			purchaseOrderUpdatePayload.Region = purchaseOrder.Supplier.Region;
			purchaseOrderUpdatePayload.PostalCode = purchaseOrder.Supplier.PostalCode;
			purchaseOrderUpdatePayload.OrderTotal = purchaseOrder.OrderTotal;
			purchaseOrderUpdatePayload.PurchaseOrderStatusDescription = purchaseOrder.PurchaseOrderStatus.Description;
			purchaseOrderUpdatePayload.DateCreated = purchaseOrder.DateCreated;
			purchaseOrderUpdatePayload.DateUpdated = purchaseOrder.DateUpdated;
			purchaseOrderUpdatePayload.PurchaseOrderDetails = new List<PurchaseOrderDetailUpdatePayload>();

			foreach (PurchaseOrderDetail purchaseOrderDetail in purchaseOrder.PurchaseOrderDetails)
			{
				PurchaseOrderDetailUpdatePayload purchaseOrderDetailUpdatePayload = new PurchaseOrderDetailUpdatePayload();
				purchaseOrderDetailUpdatePayload.PurchaseOrderDetailId = purchaseOrderDetail.PurchaseOrderDetailId;
				purchaseOrderDetailUpdatePayload.PurchaseOrderId = purchaseOrderDetail.PurchaseOrderId;
				purchaseOrderDetailUpdatePayload.ProductId = purchaseOrderDetail.ProductId;
				purchaseOrderDetailUpdatePayload.ProductMasterId = purchaseOrderDetail.Product.ProductMasterId;
				purchaseOrderDetailUpdatePayload.ProductNumber = purchaseOrderDetail.Product.ProductNumber;
				purchaseOrderDetailUpdatePayload.ProductDescription = purchaseOrderDetail.Product.Description;
				purchaseOrderDetailUpdatePayload.UnitPrice = purchaseOrderDetail.UnitPrice;
				purchaseOrderDetailUpdatePayload.OrderQuantity = purchaseOrderDetail.OrderQuantity;
				purchaseOrderDetailUpdatePayload.DateCreated = purchaseOrderDetail.DateCreated;
				purchaseOrderDetailUpdatePayload.DateUpdated = purchaseOrderDetail.DateUpdated;

				purchaseOrderUpdatePayload.PurchaseOrderDetails.Add(purchaseOrderDetailUpdatePayload);

			}

			string payload = SerializationFunction<PurchaseOrderUpdatePayload>.ReturnStringFromObject(purchaseOrderUpdatePayload);

			return payload;


		}



	}

}

