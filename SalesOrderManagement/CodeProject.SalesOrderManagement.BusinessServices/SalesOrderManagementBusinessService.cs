using System;
using CodeProject.SalesOrderManagement.Interfaces;
using System.Collections.Generic;
using CodeProject.SalesOrderManagement.BusinessRules;
using CodeProject.SalesOrderManagement.Data.Entities;
using CodeProject.SalesOrderManagement.Data.Transformations;
using CodeProject.Shared.Common.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Collections;
using System.Threading.Tasks;
using System.Data;
using CodeProject.Shared.Common.Utilities;
using CodeProject.Shared.Common.Models.MessageQueuePayloads;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class SalesOrderManagementBusinessService : ISalesOrderManagementBusinessService
	{
		private readonly ISalesOrderManagementDataService _salesOrderManagementDataService;
		private readonly ConnectionStrings _connectionStrings;

		public IConfiguration configuration { get; }

		/// <summary>
		/// Acount Business Service
		/// </summary>
		/// <param name="accountDataService"></param>
		public SalesOrderManagementBusinessService(ISalesOrderManagementDataService salesOrderManagementDataService, ConnectionStrings connectionStrings)
		{
			_salesOrderManagementDataService = salesOrderManagementDataService;
			_connectionStrings = connectionStrings;
		}

		/// <summary>
		/// Create Product
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<ProductDataTransformation>> CreateProduct(ProductDataTransformation productDataTransformation)
		{

			ResponseModel<ProductDataTransformation> returnResponse = new ResponseModel<ProductDataTransformation>();

			Product product = new Product();
			

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				product.AccountId = productDataTransformation.AccountId;
				product.ProductNumber = productDataTransformation.ProductNumber;
				product.Description = productDataTransformation.Description;
				product.UnitPrice = productDataTransformation.UnitPrice;
			
				await _salesOrderManagementDataService.CreateProduct(product);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			productDataTransformation.ProductId = product.ProductId;
		
			returnResponse.Entity = productDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Update Product
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<ProductDataTransformation>> UpdateProduct(ProductDataTransformation productDataTransformation)
		{

			ResponseModel<ProductDataTransformation> returnResponse = new ResponseModel<ProductDataTransformation>();

			Product product = new Product();
	
			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				int productId = productDataTransformation.ProductId;

				product = await _salesOrderManagementDataService.GetProductInformationForUpdate(productId);

				product.ProductNumber = productDataTransformation.ProductNumber;
				product.Description = productDataTransformation.Description;
				product.UnitPrice = productDataTransformation.UnitPrice;
			
				await _salesOrderManagementDataService.UpdateProduct(product);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = productDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Customer Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="customerName"></param>
		/// <param name="currentPageNumber"></param>
		/// <param name="pageSize"></param>
		/// <param name="sortExpression"></param>
		/// <param name="sortDirection"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<CustomerDataTransformation>>> CustomerInquiry(int accountId, string customerName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection)
		{

			ResponseModel<List<CustomerDataTransformation>> returnResponse = new ResponseModel<List<CustomerDataTransformation>>();

			List<CustomerDataTransformation> customers = new List<CustomerDataTransformation>();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				DataGridPagingInformation dataGridPagingInformation = new DataGridPagingInformation();
				dataGridPagingInformation.CurrentPageNumber = currentPageNumber;
				dataGridPagingInformation.PageSize = pageSize;
				dataGridPagingInformation.SortDirection = sortDirection;
				dataGridPagingInformation.SortExpression = sortExpression;

				List<Customer> customerList = await _salesOrderManagementDataService.CustomerInquiry(accountId, customerName, dataGridPagingInformation);
				foreach (Customer customer in customerList)
				{
					CustomerDataTransformation customerDataTransformation = new CustomerDataTransformation();
					customerDataTransformation.CustomerId = customer.CustomerId;
					customerDataTransformation.AddressLine1 = customer.AddressLine1;
					customerDataTransformation.AddressLine2 = customer.AddressLine2;
					customerDataTransformation.City = customer.City;
					customerDataTransformation.Region = customer.Region;
					customerDataTransformation.PostalCode = customer.PostalCode;
					customerDataTransformation.CustomerName = customer.Name;
					customers.Add(customerDataTransformation);

				}

				returnResponse.Entity = customers;
				returnResponse.TotalRows = dataGridPagingInformation.TotalRows;
				returnResponse.TotalPages = dataGridPagingInformation.TotalPages;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			return returnResponse;

		}

		/// <summary>
		/// Create Customer
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<CustomerDataTransformation>> CreateCustomer(CustomerDataTransformation customerDataTransformation)
		{

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();

			Customer customer = new Customer();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				CustomerBusinessRules<CustomerDataTransformation> customerBusinessRules = new CustomerBusinessRules<CustomerDataTransformation>(customerDataTransformation, _salesOrderManagementDataService);
				ValidationResult validationResult = await customerBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				customer.AccountId = customerDataTransformation.AccountId;
				customer.Name = customerDataTransformation.CustomerName;
				customer.AddressLine1 = customerDataTransformation.AddressLine1;
				customer.AddressLine2 = customerDataTransformation.AddressLine2;
				customer.City = customerDataTransformation.City;
				customer.Region = customerDataTransformation.Region;
				customer.PostalCode = customerDataTransformation.PostalCode;

				await _salesOrderManagementDataService.CreateCustomer(customer);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			customerDataTransformation.CustomerId = customer.CustomerId;

			returnResponse.Entity = customerDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Create Sales Order
		/// </summary>
		/// <param name="salesOrderDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDataTransformation>> CreateSalesOrder(SalesOrderDataTransformation salesOrderDataTransformation)
		{

			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();

			SalesOrder salesOrder = new SalesOrder();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				SalesOrderNumberSequence salesOrderNumberSequence = await _salesOrderManagementDataService.GetSalesOrderNumberSequence(salesOrderDataTransformation.AccountId);
				if (salesOrderNumberSequence == null)
				{
					salesOrderNumberSequence = new SalesOrderNumberSequence();
					salesOrderNumberSequence.AccountId = salesOrderDataTransformation.AccountId;
					salesOrderNumberSequence.SalesOrderNumber = 100000;
					await _salesOrderManagementDataService.CreateSalesOrderNumberSequence(salesOrderNumberSequence);
				}
				else
				{
					salesOrderNumberSequence.SalesOrderNumber = salesOrderNumberSequence.SalesOrderNumber + 1;
					await _salesOrderManagementDataService.UpdateSalesOrderNumberSequence(salesOrderNumberSequence);
				}

				salesOrder.SalesOrderNumber = salesOrderNumberSequence.SalesOrderNumber;
				salesOrder.AccountId = salesOrderDataTransformation.AccountId;
				salesOrder.CustomerId = salesOrderDataTransformation.CustomerId;
				salesOrder.SalesOrderStatusId = SalesOrderStatuses.Open;
				salesOrder.OrderTotal = 0.0;

				await _salesOrderManagementDataService.CreateSalesOrder(salesOrder);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			salesOrderDataTransformation.SalesOrderId = salesOrder.SalesOrderId;

			returnResponse.Entity = salesOrderDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Submit Sales Order
		/// </summary>
		/// <param name="salesOrderDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDataTransformation>> SubmitSalesOrder(SalesOrderDataTransformation salesOrderDataTransformation)
		{

			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();

			SalesOrder salesOrder = new SalesOrder();

			int accountId = salesOrderDataTransformation.AccountId;
			int salesOrderId = salesOrderDataTransformation.SalesOrderId;

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				salesOrder = await _salesOrderManagementDataService.GetSalesOrder(accountId, salesOrderId);
				if (salesOrder == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				if (salesOrder.OrderTotal == 0.00)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order has not value.");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				salesOrder.SalesOrderStatusId = SalesOrderStatuses.Submitted;

				await _salesOrderManagementDataService.UpdateDatabase();

				salesOrder = await _salesOrderManagementDataService.GetSalesOrder(accountId, salesOrderId);

				TransactionQueueOutbound transactionQueue = new TransactionQueueOutbound();
				transactionQueue.Payload = GenerateSalesOrderSubmittedPayload(salesOrder);
				transactionQueue.TransactionCode = TransactionQueueTypes.SalesOrderSubmitted;
				transactionQueue.ExchangeName = MessageQueueExchanges.SalesOrderManagement;

				await _salesOrderManagementDataService.CreateOutboundTransactionQueue(transactionQueue);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

				salesOrderDataTransformation.SalesOrderStatusId = salesOrder.SalesOrderStatusId;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = salesOrderDataTransformation;

			return returnResponse;

		}



		/// <summary>
		/// Create Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDetailDataTransformation>> CreateSalesOrderDetail(SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			SalesOrderDetail salesOrderDetail = new SalesOrderDetail();

			try
			{
				int accountId = salesOrderDetailDataTransformation.AccountId;
				int salesOrderId = salesOrderDetailDataTransformation.SalesOrderId;

				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				SalesOrderDetailBusinessRules<SalesOrderDetailDataTransformation> salesOrderDetailBusinessRules = new SalesOrderDetailBusinessRules<SalesOrderDetailDataTransformation>(salesOrderDetailDataTransformation);
				ValidationResult validationResult = salesOrderDetailBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				SalesOrder salesOrder = await _salesOrderManagementDataService.GetSalesOrderHeader(accountId, salesOrderId);
				if (salesOrder == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				Product product = await _salesOrderManagementDataService.GetProductInformationForUpdate(salesOrderDetailDataTransformation.ProductId);
				if (product == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Product not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				int availableQuantity = product.OnHandQuantity - product.CommittedQuantity;
				if (salesOrderDetailDataTransformation.OrderQuantity > availableQuantity)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Exceeded Available Quantity of " + availableQuantity.ToString());
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				product.CommittedQuantity = product.CommittedQuantity + salesOrderDetailDataTransformation.OrderQuantity;

				double lineItemAmount = salesOrderDetailDataTransformation.UnitPrice * salesOrderDetailDataTransformation.OrderQuantity;

				salesOrder.OrderTotal = salesOrder.OrderTotal + lineItemAmount;

				salesOrderDetailDataTransformation.OrderTotal = salesOrder.OrderTotal;

				await _salesOrderManagementDataService.UpdateSalesOrderHeader(salesOrder);

				salesOrderDetail.ProductId = salesOrderDetailDataTransformation.ProductId;
				salesOrderDetail.SalesOrderId = salesOrderDetailDataTransformation.SalesOrderId;
				salesOrderDetail.UnitPrice = salesOrderDetailDataTransformation.UnitPrice;
				salesOrderDetail.OrderQuantity = salesOrderDetailDataTransformation.OrderQuantity;

				await _salesOrderManagementDataService.CreateSalesOrderDetail(salesOrderDetail);

				await _salesOrderManagementDataService.UpdateProduct(product);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				SalesOrderDetail updatedSalesOrderDetail = await _salesOrderManagementDataService.GetSalesOrderDetail(salesOrderDetail.SalesOrderDetailId);

				salesOrderDetailDataTransformation = new SalesOrderDetailDataTransformation();

				salesOrderDetailDataTransformation.SalesOrderDetailId = updatedSalesOrderDetail.SalesOrderDetailId;
				salesOrderDetailDataTransformation.SalesOrderId = updatedSalesOrderDetail.SalesOrderId;
				salesOrderDetailDataTransformation.ProductId = updatedSalesOrderDetail.ProductId;
				salesOrderDetailDataTransformation.ProductMasterId = updatedSalesOrderDetail.Product.ProductMasterId;
				salesOrderDetailDataTransformation.ProductNumber = updatedSalesOrderDetail.Product.ProductNumber;
				salesOrderDetailDataTransformation.ProductDescription = updatedSalesOrderDetail.Product.Description;
				salesOrderDetailDataTransformation.UnitPrice = updatedSalesOrderDetail.UnitPrice;
				salesOrderDetailDataTransformation.OrderQuantity = updatedSalesOrderDetail.OrderQuantity;
				salesOrderDetailDataTransformation.ShippedQuantity = updatedSalesOrderDetail.ShippedQuantity;
				salesOrderDetailDataTransformation.OrderTotal = salesOrder.OrderTotal;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = salesOrderDetailDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Update Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDetailDataTransformation>> UpdateSalesOrderDetail(SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			SalesOrderDetail salesOrderDetail = new SalesOrderDetail();

			try
			{
				int accountId = salesOrderDetailDataTransformation.AccountId;
				int salesOrderId = salesOrderDetailDataTransformation.SalesOrderId;
				int salesOrderDetailId = salesOrderDetailDataTransformation.SalesOrderDetailId;

				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				SalesOrderDetailBusinessRules<SalesOrderDetailDataTransformation> salesOrderDetailBusinessRules = new SalesOrderDetailBusinessRules<SalesOrderDetailDataTransformation>(salesOrderDetailDataTransformation);
				ValidationResult validationResult = salesOrderDetailBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				SalesOrder salesOrder = await _salesOrderManagementDataService.GetSalesOrderHeader(accountId, salesOrderId);
				if (salesOrder == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				salesOrderDetail = await _salesOrderManagementDataService.GetSalesOrderDetailForUpdate(salesOrderDetailId);
				if (salesOrderDetail == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order Detail not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				Product product = await _salesOrderManagementDataService.GetProductInformationForUpdate(salesOrderDetailDataTransformation.ProductId);
				if (product == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Product not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				int originalOrderQuantity = salesOrderDetail.OrderQuantity;

				int availableQuantity = product.OnHandQuantity - product.CommittedQuantity + originalOrderQuantity;
				if (salesOrderDetailDataTransformation.OrderQuantity > availableQuantity)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Exceeded Available Quantity of " + availableQuantity.ToString());
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				product.CommittedQuantity = product.CommittedQuantity - originalOrderQuantity + salesOrderDetailDataTransformation.OrderQuantity;

				double originalLineItemAmount = salesOrderDetail.OrderQuantity * salesOrderDetail.UnitPrice;
				double newLineItemAmount = salesOrderDetailDataTransformation.UnitPrice * salesOrderDetailDataTransformation.OrderQuantity;

				salesOrder.OrderTotal = salesOrder.OrderTotal + newLineItemAmount - originalLineItemAmount;

				salesOrderDetailDataTransformation.OrderTotal = salesOrder.OrderTotal;

				await _salesOrderManagementDataService.UpdateSalesOrderHeader(salesOrder);

				salesOrderDetail.UnitPrice = salesOrderDetailDataTransformation.UnitPrice;
				salesOrderDetail.OrderQuantity = salesOrderDetailDataTransformation.OrderQuantity;
		
				await _salesOrderManagementDataService.UpdateSalesOrderDetail(salesOrderDetail);

				await _salesOrderManagementDataService.UpdateProduct(product);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = salesOrderDetailDataTransformation;

			return returnResponse;

		}


		/// <summary>
		/// Delete Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDetailDataTransformation>> DeleteSalesOrderDetail(SalesOrderDetailDataTransformation salesOrderDetailDataTransformation)
		{

			ResponseModel<SalesOrderDetailDataTransformation> returnResponse = new ResponseModel<SalesOrderDetailDataTransformation>();

			SalesOrderDetail salesOrderDetail = new SalesOrderDetail();

			try
			{
				int accountId = salesOrderDetailDataTransformation.AccountId;
				int salesOrderId = salesOrderDetailDataTransformation.SalesOrderId;
				int salesOrderDetailId = salesOrderDetailDataTransformation.SalesOrderDetailId;

				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				SalesOrder salesOrder = await _salesOrderManagementDataService.GetSalesOrderHeader(accountId, salesOrderId);
				if (salesOrder == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				salesOrderDetail = await _salesOrderManagementDataService.GetSalesOrderDetailForUpdate(salesOrderDetailId);
				if (salesOrderDetail == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Sales Order Detail not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				Product product = await _salesOrderManagementDataService.GetProductInformationForUpdate(salesOrderDetailDataTransformation.ProductId);
				if (product == null)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage.Add("Product not found");
					returnResponse.ReturnStatus = false;

					return returnResponse;
				}

				product.CommittedQuantity = product.CommittedQuantity - salesOrderDetail.OrderQuantity;

				double originalLineItemAmount = salesOrderDetail.OrderQuantity * salesOrderDetail.UnitPrice;

				await _salesOrderManagementDataService.DeleteSalesOrderDetail(salesOrderDetailId);

				salesOrder.OrderTotal = salesOrder.OrderTotal - originalLineItemAmount;

				salesOrderDetailDataTransformation.OrderTotal = salesOrder.OrderTotal;

				await _salesOrderManagementDataService.UpdateSalesOrderHeader(salesOrder);

				salesOrderDetail.UnitPrice = salesOrderDetailDataTransformation.UnitPrice;
				salesOrderDetail.OrderQuantity = salesOrderDetailDataTransformation.OrderQuantity;

				await _salesOrderManagementDataService.UpdateSalesOrderDetail(salesOrderDetail);

				await _salesOrderManagementDataService.UpdateProduct(product);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = salesOrderDetailDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Update Customer
		/// </summary>
		/// <param name="productDataTransformation"></param>
		/// <returns></returns>
		public async Task<ResponseModel<CustomerDataTransformation>> UpdateCustomer(CustomerDataTransformation customerDataTransformation)
		{

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();

			Customer customer = new Customer();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				CustomerBusinessRules<CustomerDataTransformation> customerBusinessRules = new CustomerBusinessRules<CustomerDataTransformation>(customerDataTransformation, _salesOrderManagementDataService);
				ValidationResult validationResult = await customerBusinessRules.Validate();
				if (validationResult.ValidationStatus == false)
				{
					_salesOrderManagementDataService.RollbackTransaction();

					returnResponse.ReturnMessage = validationResult.ValidationMessages;
					returnResponse.ReturnStatus = validationResult.ValidationStatus;

					return returnResponse;
				}

				int customerId = customerDataTransformation.CustomerId;
				int accountId = customerDataTransformation.AccountId;

				customer = await _salesOrderManagementDataService.GetCustomerInformationForUpdate(accountId, customerId);

				customer.Name = customerDataTransformation.CustomerName;
				customer.AddressLine1 = customerDataTransformation.AddressLine1;
				customer.AddressLine2 = customerDataTransformation.AddressLine2;
				customer.City = customerDataTransformation.City;
				customer.Region = customerDataTransformation.Region;
				customer.PostalCode = customerDataTransformation.PostalCode;

				await _salesOrderManagementDataService.UpdateCustomer(customer);

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = customerDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Get Customer Information
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="customerId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<CustomerDataTransformation>> GetCustomerInformation(int accountId, int customerId)
		{

			ResponseModel<CustomerDataTransformation> returnResponse = new ResponseModel<CustomerDataTransformation>();
			CustomerDataTransformation customerDataTransformation = new CustomerDataTransformation();

			Customer customer = new Customer();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				customer = await _salesOrderManagementDataService.GetCustomerInformation(accountId, customerId);

				customerDataTransformation = new CustomerDataTransformation();
				customerDataTransformation.CustomerId = customer.CustomerId;
				customerDataTransformation.AddressLine1 = customer.AddressLine1;
				customerDataTransformation.AddressLine2 = customer.AddressLine2;
				customerDataTransformation.City = customer.City;
				customerDataTransformation.Region = customer.Region;
				customerDataTransformation.PostalCode = customer.PostalCode;
				customerDataTransformation.CustomerName = customer.Name;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = customerDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Get Sales Order
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="salesOrderId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<SalesOrderDataTransformation>> GetSalesOrder(int accountId, int salesOrderId)
		{
			ResponseModel<SalesOrderDataTransformation> returnResponse = new ResponseModel<SalesOrderDataTransformation>();
			SalesOrderDataTransformation salesOrderDataTransformation = new SalesOrderDataTransformation();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				SalesOrder salesOrder = await _salesOrderManagementDataService.GetSalesOrder(accountId, salesOrderId);

				salesOrderDataTransformation.SalesOrderId = salesOrderId;
				salesOrderDataTransformation.SalesOrderNumber = salesOrder.SalesOrderNumber;
				salesOrderDataTransformation.SalesOrderStatusId = salesOrder.SalesOrderStatusId;
				salesOrderDataTransformation.CustomerId = salesOrder.Customer.CustomerId;
				salesOrderDataTransformation.CustomerName = salesOrder.Customer.Name;
				salesOrderDataTransformation.AddressLine1 = salesOrder.Customer.AddressLine1;
				salesOrderDataTransformation.AddressLine2 = salesOrder.Customer.AddressLine2;
				salesOrderDataTransformation.City = salesOrder.Customer.City;
				salesOrderDataTransformation.Region = salesOrder.Customer.Region;
				salesOrderDataTransformation.PostalCode = salesOrder.Customer.PostalCode;
				salesOrderDataTransformation.OrderTotal = salesOrder.OrderTotal;
				salesOrderDataTransformation.SalesOrderStatusDescription = salesOrder.SalesOrderStatus.Description;
				salesOrderDataTransformation.DateCreated = salesOrder.DateCreated;
				salesOrderDataTransformation.DateUpdated = salesOrder.DateUpdated;
				salesOrderDataTransformation.SalesOrderDetails = new List<SalesOrderDetailDataTransformation>();

				foreach (SalesOrderDetail salesOrderDetail in salesOrder.SalesOrderDetails)
				{
					SalesOrderDetailDataTransformation salesOrderDetailDataTransformation = new SalesOrderDetailDataTransformation();
					salesOrderDetailDataTransformation.SalesOrderDetailId = salesOrderDetail.SalesOrderDetailId;
					salesOrderDetailDataTransformation.SalesOrderId = salesOrderDetail.SalesOrderId;
					salesOrderDetailDataTransformation.ProductId = salesOrderDetail.ProductId;
					salesOrderDetailDataTransformation.ProductMasterId = salesOrderDetail.Product.ProductMasterId;
					salesOrderDetailDataTransformation.ProductNumber = salesOrderDetail.Product.ProductNumber;
					salesOrderDetailDataTransformation.ProductDescription = salesOrderDetail.Product.Description;
					salesOrderDetailDataTransformation.UnitPrice = salesOrderDetail.UnitPrice;
					salesOrderDetailDataTransformation.OrderQuantity = salesOrderDetail.OrderQuantity;
					salesOrderDetailDataTransformation.ShippedQuantity = salesOrderDetail.ShippedQuantity;
					salesOrderDetailDataTransformation.DateCreated = salesOrderDetail.DateCreated;
					salesOrderDetailDataTransformation.DateUpdated = salesOrderDetail.DateUpdated;

					salesOrderDataTransformation.SalesOrderDetails.Add(salesOrderDetailDataTransformation);
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
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = salesOrderDataTransformation;

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
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				Product product = await _salesOrderManagementDataService.GetProduct(accountId, productNumber);
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
				_salesOrderManagementDataService.CloseConnection();
			}

			returnResponse.Entity = productDataTransformation;

			return returnResponse;

		}

		/// <summary>
		/// Sales Order Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="customerName"></param>
		/// <param name="currentPageNumber"></param>
		/// <param name="pageSize"></param>
		/// <param name="sortExpression"></param>
		/// <param name="sortDirection"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<SalesOrderDataTransformation>>> SalesOrderInquiry(int accountId, string customerName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection)
		{

			ResponseModel<List<SalesOrderDataTransformation>> returnResponse = new ResponseModel<List<SalesOrderDataTransformation>>();

			List<SalesOrderDataTransformation> salesOrders = new List<SalesOrderDataTransformation>();

			try
			{
				_salesOrderManagementDataService.OpenConnection(_connectionStrings.PrimaryDatabaseConnectionString);

				DataGridPagingInformation dataGridPagingInformation = new DataGridPagingInformation();
				dataGridPagingInformation.CurrentPageNumber = currentPageNumber;
				dataGridPagingInformation.PageSize = pageSize;
				dataGridPagingInformation.SortDirection = sortDirection;
				dataGridPagingInformation.SortExpression = sortExpression;

				List<SalesOrder> salesOrderList = await _salesOrderManagementDataService.SalesOrderInquiry(accountId, customerName, dataGridPagingInformation);
				foreach (SalesOrder salesOrder in salesOrderList)
				{
					SalesOrderDataTransformation salesOrderDataTransformation = new SalesOrderDataTransformation();
					salesOrderDataTransformation.CustomerId = salesOrder.CustomerId;
					salesOrderDataTransformation.AddressLine1 = salesOrder.Customer.AddressLine1;
					salesOrderDataTransformation.AddressLine2 = salesOrder.Customer.AddressLine2;
					salesOrderDataTransformation.City = salesOrder.Customer.City;
					salesOrderDataTransformation.Region = salesOrder.Customer.Region;
					salesOrderDataTransformation.PostalCode = salesOrder.Customer.PostalCode;
					salesOrderDataTransformation.CustomerName = salesOrder.Customer.Name;
					salesOrderDataTransformation.DateCreated = salesOrder.DateCreated;
					salesOrderDataTransformation.OrderTotal = salesOrder.OrderTotal;
					salesOrderDataTransformation.AccountId = salesOrder.AccountId;
					salesOrderDataTransformation.SalesOrderId = salesOrder.SalesOrderId;
					salesOrderDataTransformation.SalesOrderNumber = salesOrder.SalesOrderNumber;
					salesOrderDataTransformation.SalesOrderStatusId = salesOrder.SalesOrderStatusId;
					salesOrderDataTransformation.SalesOrderStatusDescription = salesOrder.SalesOrderStatus.Description;
					salesOrders.Add(salesOrderDataTransformation);
				}

				returnResponse.Entity = salesOrders;
				returnResponse.TotalRows = dataGridPagingInformation.TotalRows;
				returnResponse.TotalPages = dataGridPagingInformation.TotalPages;

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_salesOrderManagementDataService.CloseConnection();
			}

			return returnResponse;

		}

		/// <summary>
		/// Generate Sales Order Submitted Payload
		/// </summary>
		/// <param name="salesOrder"></param>
		/// <returns></returns>
		private string GenerateSalesOrderSubmittedPayload(SalesOrder salesOrder)
		{

			SalesOrderUpdatePayload salesOrderUpdatePayload = new SalesOrderUpdatePayload();

			salesOrderUpdatePayload.AccountId = salesOrder.AccountId;
			salesOrderUpdatePayload.SalesOrderId = salesOrder.SalesOrderId;
			salesOrderUpdatePayload.SalesOrderNumber = salesOrder.SalesOrderNumber;
			salesOrderUpdatePayload.SalesOrderStatusId = salesOrder.SalesOrderStatusId;
			salesOrderUpdatePayload.CustomerId = salesOrder.Customer.CustomerId;
			salesOrderUpdatePayload.CustomerName = salesOrder.Customer.Name;
			salesOrderUpdatePayload.AddressLine1 = salesOrder.Customer.AddressLine1;
			salesOrderUpdatePayload.AddressLine2 = salesOrder.Customer.AddressLine2;
			salesOrderUpdatePayload.City = salesOrder.Customer.City;
			salesOrderUpdatePayload.Region = salesOrder.Customer.Region;
			salesOrderUpdatePayload.PostalCode = salesOrder.Customer.PostalCode;
			salesOrderUpdatePayload.OrderTotal = salesOrder.OrderTotal;
			salesOrderUpdatePayload.SalesOrderStatusDescription = salesOrder.SalesOrderStatus.Description;
			salesOrderUpdatePayload.DateCreated = salesOrder.DateCreated;
			salesOrderUpdatePayload.DateUpdated = salesOrder.DateUpdated;
			salesOrderUpdatePayload.SalesOrderDetails = new List<SalesOrderDetailUpdatePayload>();

			foreach (SalesOrderDetail salesOrderDetail in salesOrder.SalesOrderDetails)
			{
				SalesOrderDetailUpdatePayload salesOrderDetailUpdatePayload = new SalesOrderDetailUpdatePayload();
				salesOrderDetailUpdatePayload.SalesOrderDetailId = salesOrderDetail.SalesOrderDetailId;
				salesOrderDetailUpdatePayload.SalesOrderId = salesOrderDetail.SalesOrderId;
				salesOrderDetailUpdatePayload.ProductId = salesOrderDetail.ProductId;
				salesOrderDetailUpdatePayload.ProductMasterId = salesOrderDetail.Product.ProductMasterId;
				salesOrderDetailUpdatePayload.ProductNumber = salesOrderDetail.Product.ProductNumber;
				salesOrderDetailUpdatePayload.ProductDescription = salesOrderDetail.Product.Description;
				salesOrderDetailUpdatePayload.UnitPrice = salesOrderDetail.UnitPrice;
				salesOrderDetailUpdatePayload.OrderQuantity = salesOrderDetail.OrderQuantity;
				salesOrderDetailUpdatePayload.DateCreated = salesOrderDetail.DateCreated;
				salesOrderDetailUpdatePayload.DateUpdated = salesOrderDetail.DateUpdated;

				salesOrderUpdatePayload.SalesOrderDetails.Add(salesOrderDetailUpdatePayload);

			}

			string payload = SerializationFunction<SalesOrderUpdatePayload>.ReturnStringFromObject(salesOrderUpdatePayload);

			return payload;


		}


	}

}

