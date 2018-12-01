using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.SalesOrderManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.SalesOrderManagement.Data.Entities;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Common;
using CodeProject.Shared.Common.Models;
using System.Linq.Dynamic.Core;

namespace CodeProject.SalesOrderManagement.Data.EntityFramework
{
	public class SalesOrderManagementDataService : EntityFrameworkRepository, ISalesOrderManagementDataService
	{
		/// <summary>
		/// Create Sales Order
		/// </summary>
		/// <param name="salesOrder"></param>
		/// <returns></returns>
		public async Task CreateSalesOrder(SalesOrder salesOrder)
		{
			DateTime dateCreated = DateTime.UtcNow;
			salesOrder.DateCreated = dateCreated;
			salesOrder.DateUpdated = dateCreated;

			await dbConnection.SalesOrders.AddAsync(salesOrder);
		}

		/// <summary>
		/// Create Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetail"></param>
		/// <returns></returns>
		public async Task CreateSalesOrderDetail(SalesOrderDetail salesOrderDetail)
		{
			DateTime dateCreated = DateTime.UtcNow;
			salesOrderDetail.DateCreated = dateCreated;
			salesOrderDetail.DateUpdated = dateCreated;

			await dbConnection.SalesOrderDetails.AddAsync(salesOrderDetail);

		}

		/// <summary>
		/// Create Inbound Transaction Queue
		/// </summary>
		/// <param name="transactionQueue"></param>
		/// <returns></returns>
		public async Task CreateInboundTransactionQueue(TransactionQueueInbound transactionQueue)
		{
			DateTime dateCreated = DateTime.UtcNow;
			transactionQueue.DateCreated = dateCreated;

			await dbConnection.TransactionQueueInbound.AddAsync(transactionQueue);
		}

		/// <summary>
		///  Create Inbound Transaction Queue History
		/// </summary>
		/// <param name="transactionQueue"></param>
		/// <returns></returns>
		public async Task CreateInboundTransactionQueueHistory(TransactionQueueInboundHistory transactionQueue)
		{
			DateTime dateCreated = DateTime.UtcNow;
			transactionQueue.DateCreated = dateCreated;

			await dbConnection.TransactionQueueInboundHistory.AddAsync(transactionQueue);
		}

		/// <summary>
		/// Create Inbound Transaction Queue
		/// </summary>
		/// <param name="transactionQueue"></param>
		/// <returns></returns>
		public async Task CreateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue)
		{
			DateTime dateCreated = DateTime.UtcNow;
			transactionQueue.DateCreated = dateCreated;

			await dbConnection.TransactionQueueOutbound.AddAsync(transactionQueue);
		}

		/// <summary>
		/// Create Customer
		/// </summary>
		/// <param name="customer"></param>
		/// <returns></returns>
		public async Task CreateCustomer(Customer customer)
		{
			DateTime dateCreated = DateTime.UtcNow;
			customer.DateCreated = dateCreated;
			customer.DateUpdated = dateCreated;

			await dbConnection.Customers.AddAsync(customer);

		}

		/// <summary>
		/// Create Product
		/// </summary>
		/// <param name="product"></param>
		/// <returns></returns>
		public async Task CreateProduct(Product product)
		{
			DateTime dateCreated = DateTime.UtcNow;
			product.DateCreated = dateCreated;
			product.DateUpdated = dateCreated;

			await dbConnection.Products.AddAsync(product);
		}

		/// <summary>
		/// Get Product Information For Update
		/// </summary>
		/// <param name="productId"></param>
		/// <returns></returns>
		public async Task<Product> GetProductInformationForUpdate(int productId)
		{
			string sqlStatement = "SELECT * FROM PRODUCTS WITH (UPDLOCK) WHERE PRODUCTID = @ProductId";

			DbParameter productIdParameter = new SqlParameter("ProductId", productId);

			Product product = await dbConnection.Products.FromSql(sqlStatement, productIdParameter).FirstOrDefaultAsync();
			return product;
		}
		/// <summary>
		/// Get Product Information By Product Master For Update
		/// </summary>
		/// <param name="productMasterId"></param>
		/// <returns></returns>
		public async Task<Product> GetProductInformationByProductMasterForUpdate(int productMasterId)
		{
			string sqlStatement = "SELECT * FROM Products WITH (UPDLOCK) WHERE ProductMasterId = @ProductMasterId";

			DbParameter productIdParameter = new SqlParameter("ProductMasterId", productMasterId);

			Product product = await dbConnection.Products.FromSql(sqlStatement, productIdParameter).FirstOrDefaultAsync();
			return product;
		}
		/// <summary>
		/// Update Product
		/// </summary>
		/// <param name="product"></param>
		/// <returns></returns>
		public async Task UpdateProduct(Product product)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			product.DateUpdated = dateUpdated;

		}

		/// <summary>
		/// Get Outbound Transaction Queue
		/// </summary>
		/// <returns></returns>
		public async Task<List<TransactionQueueOutbound>> GetOutboundTransactionQueue()
		{
			StringBuilder sqlBuilder = new StringBuilder();

			sqlBuilder.AppendLine(" SELECT * FROM TransactionQueueOutbound WITH (UPDLOCK) WHERE ");
			sqlBuilder.AppendLine(" SentToExchange = @SentToExchange ");

			string sqlStatement = sqlBuilder.ToString();

			SqlParameter sentToExchangeParameter = new SqlParameter("SentToExchange", false);

			List<TransactionQueueOutbound> transactionQueue = await dbConnection.TransactionQueueOutbound.FromSql(
				sqlStatement, sentToExchangeParameter).ToListAsync();

			return transactionQueue;

		}

		/// <summary>
		/// Get Inbound Transaction Queue History By Sender
		/// </summary>
		/// <param name="senderTransactionQueueId"></param>
		/// <returns></returns>
		public async Task<TransactionQueueInboundHistory> GetInboundTransactionQueueHistoryBySender(int senderTransactionQueueId, string exchangeName)
		{
			TransactionQueueInboundHistory transactionQueue = await dbConnection.TransactionQueueInboundHistory.Where(x => x.ExchangeName == exchangeName && x.SenderTransactionQueueId == senderTransactionQueueId).FirstOrDefaultAsync();
			return transactionQueue;
		}

		/// <summary>
		/// Get Inbound Transaction Queue
		/// </summary>
		/// <returns></returns>
		public async Task<List<TransactionQueueInbound>> GetInboundTransactionQueue()
		{
			List<TransactionQueueInbound> transactionQueue = await dbConnection.TransactionQueueInbound.OrderBy(x=>x.TransactionQueueInboundId).ToListAsync();
			return transactionQueue;
		}

		/// <summary>
		/// Delete Inbound Transaction Queue Entry
		/// </summary>
		/// <param name="transactionQueueId"></param>
		/// <returns></returns>
		public async Task DeleteInboundTransactionQueueEntry(int transactionQueueId)
		{
			TransactionQueueInbound transactionQueue = await dbConnection.TransactionQueueInbound.Where(x => x.TransactionQueueInboundId == transactionQueueId).FirstOrDefaultAsync();
			dbConnection.TransactionQueueInbound.Remove(transactionQueue);
		}

		/// <summary>
		/// Update Transaction Queue
		/// </summary>
		/// <param name="transactionQueue"></param>
		/// <returns></returns>
		public async Task UpdateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue)
		{
			await Task.Delay(0);
		}

		/// <summary>
		/// Update Transaction Queue Semaphore
		/// </summary>
		/// <param name="transactionQueueSemaphore"></param>
		/// <returns></returns>
		public async Task UpdateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			transactionQueueSemaphore.DateUpdated = dateUpdated;
		}

		/// <summary>
		/// Create Transaction Queue Semaphore
		/// </summary>
		/// <param name="transactionQueueSemaphore"></param>
		/// <returns></returns>
		public async Task CreateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore)
		{
			DateTime dateCreated = DateTime.UtcNow;
			transactionQueueSemaphore.DateCreated = dateCreated;
			transactionQueueSemaphore.DateUpdated = dateCreated;

			await dbConnection.TransactionQueueSemaphores.AddAsync(transactionQueueSemaphore);
		}

		/// <summary>
		/// Get Transaction Queue Semaphore
		/// </summary>
		/// <param name="semaphoreKey"></param>
		/// <returns></returns>
		public async Task<TransactionQueueSemaphore> GetTransactionQueueSemaphore(string semaphoreKey)
		{
			StringBuilder sqlBuilder = new StringBuilder();

			sqlBuilder.AppendLine(" SELECT * FROM TransactionQueueSemaphores WITH (UPDLOCK) WHERE ");
			sqlBuilder.AppendLine(" SemaphoreKey = @SemaphoreKey ");

			string sqlStatement = sqlBuilder.ToString();

			SqlParameter semaphoreKeyParameter = new SqlParameter("SemaphoreKey", semaphoreKey);

			TransactionQueueSemaphore transactionQueue = await dbConnection.TransactionQueueSemaphores.FromSql(sqlStatement, semaphoreKeyParameter).FirstOrDefaultAsync();

			return transactionQueue;

		}

		/// <summary>
		/// Supplier Inquiry
		/// </summary>
		/// <param name="accountID"></param>
		/// <param name="customerName"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<Customer>> CustomerInquiry(int accountID, string customerName, DataGridPagingInformation paging)
		{

			string sortExpression = paging.SortExpression;
			string sortDirection = paging.SortDirection;

			if (string.IsNullOrEmpty(sortExpression))
			{
				sortExpression = "Name";
			}

			if (paging.SortDirection != string.Empty)
				sortExpression = sortExpression + " " + paging.SortDirection;

			int numberOfRows = 0;

			var query = dbConnection.Customers.AsQueryable();

			if (customerName.Trim().Length > 0)
			{
				query = query.Where(p => p.Name.Contains(customerName));
			}

			query = query.Where(p => p.AccountId == accountID);

			var customerResults = from p in query select p;

			numberOfRows = await customerResults.CountAsync();

			List<Customer> customers = await customerResults.OrderBy(sortExpression).Skip((paging.CurrentPageNumber - 1) * paging.PageSize).Take(paging.PageSize).ToListAsync();

			paging.TotalRows = numberOfRows;
			paging.TotalPages = CodeProject.Shared.Common.Utilties.Functions.CalculateTotalPages(numberOfRows, paging.PageSize);

			return customers;

		}

		/// <summary>
		/// Get Sales Order
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="salesOrderId"></param>
		/// <returns></returns>
		public async Task<SalesOrder> GetSalesOrder(int accountId, int salesOrderId)
		{
			SalesOrder salesOrder = await dbConnection.SalesOrders
				.Include(x => x.SalesOrderStatus)
				.Include(x => x.Customer)
				.Include(x => x.SalesOrderDetails).ThenInclude(p => p.Product)
				.Where(x => x.AccountId == accountId && x.SalesOrderId == salesOrderId).FirstOrDefaultAsync();

			return salesOrder;
		}

		/// <summary>
		/// Get Customer Information
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="customerId"></param>
		/// <returns></returns>
		public async Task<Customer> GetCustomerInformation(int accountId, int customerId)
		{
			Customer customer = await dbConnection.Customers.Where(x => x.CustomerId == customerId && x.AccountId == accountId).FirstOrDefaultAsync();
			return customer;
		}

		/// <summary>
		/// Get Custometr Information For Update
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierId"></param>
		/// <returns></returns>
		public async Task<Customer> GetCustomerInformationForUpdate(int accountId, int customerId)
		{
			string sqlStatement = "SELECT * FROM Customers WITH (UPDLOCK) WHERE CustomerId = @CustomerId AND AccountId = @AccountId";

			DbParameter customerIdParameter = new SqlParameter("CustomerId", customerId);
			DbParameter accountIdParameter = new SqlParameter("AccountId", accountId);

			Customer customer = await dbConnection.Customers.FromSql(sqlStatement, customerIdParameter, accountIdParameter).FirstOrDefaultAsync();
			return customer;
		}

		/// <summary>
		/// Update Customer
		/// </summary>
		/// <param name="customer"></param>
		/// <returns></returns>
		public async Task UpdateCustomer(Customer customer)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			customer.DateUpdated = dateUpdated;
		}

		/// <summary>
		/// Get Sales Order Number Sequence
		/// </summary>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<SalesOrderNumberSequence> GetSalesOrderNumberSequence(int accountId)
		{
			string sqlStatement = "SELECT * FROM SalesOrderNumberSequences WITH (UPDLOCK) WHERE AccountId = @AccountId";

			DbParameter accountIdParameter = new SqlParameter("AccountId", accountId);

			SalesOrderNumberSequence salesOrderNumberSequence = await dbConnection.SalesOrderNumberSequences.FromSql(sqlStatement, accountIdParameter).FirstOrDefaultAsync();
			return salesOrderNumberSequence;
		}

		/// <summary>
		/// Get Sales Order Header
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="salesOrderId"></param>
		/// <returns></returns>
		public async Task<SalesOrder> GetSalesOrderHeader(int accountId, int salesOrderId)
		{
			SalesOrder salesOrder = await dbConnection.SalesOrders
				.Where(x => x.AccountId == accountId && x.SalesOrderId == salesOrderId).FirstOrDefaultAsync();

			return salesOrder;
		}

		/// <summary>
		/// Update Sales Order Header
		/// </summary>
		/// <param name="salesOrder"></param>
		/// <returns></returns>
		public async Task UpdateSalesOrderHeader(SalesOrder salesOrder)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			salesOrder.DateUpdated = dateUpdated;
		}

		/// <summary>
		/// Get Sales Order Detail For Update
		/// </summary>
		/// <param name="salesOrderDetailId"></param>
		/// <returns></returns>
		public async Task<SalesOrderDetail> GetSalesOrderDetailForUpdate(int salesOrderDetailId)
		{
			SalesOrderDetail salesOrderDetail = await dbConnection.SalesOrderDetails
				.Where(x => x.SalesOrderDetailId == salesOrderDetailId).FirstOrDefaultAsync();

			return salesOrderDetail;
		}

		/// <summary>
		/// Update Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetail"></param>
		/// <returns></returns>
		public async Task UpdateSalesOrderDetail(SalesOrderDetail salesOrderDetail)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			salesOrderDetail.DateUpdated = dateUpdated;
		}

		/// <summary>
		/// Delete Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailId"></param>
		/// <returns></returns>
		public async Task DeleteSalesOrderDetail(int salesOrderDetailId)
		{
			SalesOrderDetail salesOrderDetail = await dbConnection.SalesOrderDetails.Where(x => x.SalesOrderDetailId == salesOrderDetailId).FirstOrDefaultAsync();
			dbConnection.SalesOrderDetails.Remove(salesOrderDetail);
		}

		/// <summary>
		/// Get Product
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="productNumber"></param>
		/// <returns></returns>
		public async Task<Product> GetProduct(int accountId, string productNumber)
		{
			Product product = await dbConnection.Products.Where(x => x.AccountId == accountId && x.ProductNumber == productNumber).FirstOrDefaultAsync();
			return product;
		}

		/// <summary>
		/// Sales Order Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="customerName"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<SalesOrder>> SalesOrderInquiry(int accountId, string customerName, DataGridPagingInformation paging)
		{
			
			string sortExpression = paging.SortExpression;
			string sortDirection = paging.SortDirection;

			if (string.IsNullOrEmpty(sortExpression))
			{
				sortExpression = "SalesOrderNumber";
			}

			if (paging.SortDirection != string.Empty)
				sortExpression = sortExpression + " " + paging.SortDirection;

			int numberOfRows = 0;

			var query = dbConnection.SalesOrders
				.Include(x => x.Customer)
				.Include(x => x.SalesOrderStatus).AsQueryable();

			if (customerName.Trim().Length > 0)
			{
				query = query.Where(p => p.Customer.Name.Contains(customerName));
			}

			query = query.Where(p => p.AccountId == accountId);

			var salesOrderResults = from p in query select p;

			numberOfRows = await salesOrderResults.CountAsync();

			List<SalesOrder> salesOrders = await salesOrderResults.OrderBy(sortExpression).Skip((paging.CurrentPageNumber - 1) * paging.PageSize).Take(paging.PageSize).ToListAsync();

			paging.TotalRows = numberOfRows;
			paging.TotalPages = CodeProject.Shared.Common.Utilties.Functions.CalculateTotalPages(numberOfRows, paging.PageSize);

			return salesOrders;
		}

		/// <summary>
		/// Create Sales Order Number Sequence
		/// </summary>
		/// <param name="salesOrderNumberSequence"></param>
		/// <returns></returns>
		public async Task CreateSalesOrderNumberSequence(SalesOrderNumberSequence salesOrderNumberSequence)
		{
			DateTime dateCreated = DateTime.UtcNow;
			salesOrderNumberSequence.DateCreated = dateCreated;
			salesOrderNumberSequence.DateUpdated = dateCreated;

			await dbConnection.SalesOrderNumberSequences.AddAsync(salesOrderNumberSequence);
		}

		/// <summary>
		/// Update Sales Order Number Sequence
		/// </summary>
		/// <param name="salesOrderNumberSequence"></param>
		/// <returns></returns>
		public async Task UpdateSalesOrderNumberSequence(SalesOrderNumberSequence salesOrderNumberSequence)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			salesOrderNumberSequence.DateUpdated = dateUpdated;
		}


		/// <summary>
		/// Get Sales Order Detail
		/// </summary>
		/// <param name="salesOrderDetailId"></param>
		/// <returns></returns>
		public async Task<SalesOrderDetail> GetSalesOrderDetail(int salesOrderDetailId)
		{
			SalesOrderDetail salesOrderDetail = await dbConnection.SalesOrderDetails
				.Include(p => p.Product)
				.Where(x => x.SalesOrderDetailId == salesOrderDetailId).FirstOrDefaultAsync();

			return salesOrderDetail;
		}

		/// <summary>
		/// Get Customer Information By Customer Name
		/// </summary>
		/// <param name="customerName"></param>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<Customer> GetCustomerInformationByCustomerName(string customerName, int accountId)
		{
			Customer customer = await dbConnection.Customers.Where(x => x.Name == customerName && x.AccountId == accountId).FirstOrDefaultAsync();
			return customer;
		}

		/// <summary>
		/// Create Outbound Transaction Queue History
		/// </summary>
		/// <param name="transactionQueueItem"></param>
		/// <returns></returns>
		public async Task CreateOutboundTransactionQueueHistory(TransactionQueueOutboundHistory transactionQueueItem)
		{
			DateTime dateCreated = DateTime.UtcNow;
			transactionQueueItem.DateCreated = dateCreated;

			await dbConnection.TransactionQueueOutboundHistory.AddAsync(transactionQueueItem);
		}

		/// <summary>
		/// Delete Outbound Transaction Queue Entry
		/// </summary>
		/// <param name="transactionQueueId"></param>
		/// <returns></returns>
		public async Task DeleteOutboundTransactionQueueEntry(int transactionQueueId)
		{
			TransactionQueueOutbound transactionQueue = await dbConnection.TransactionQueueOutbound.Where(x => x.TransactionQueueOutboundId == transactionQueueId).FirstOrDefaultAsync();
			dbConnection.TransactionQueueOutbound.Remove(transactionQueue);
		}

		/// <summary>
		/// Get Outbound Transaction Queue Item By Id
		/// </summary>
		/// <param name="transactionQueueId"></param>
		/// <returns></returns>
		public async Task<TransactionQueueOutbound> GetOutboundTransactionQueueItemById(int transactionQueueId)
		{
			TransactionQueueOutbound transactionQueueItem = await dbConnection.TransactionQueueOutbound.Where(x => x.TransactionQueueOutboundId == transactionQueueId).FirstOrDefaultAsync();
			return transactionQueueItem;
		}


	}
}
