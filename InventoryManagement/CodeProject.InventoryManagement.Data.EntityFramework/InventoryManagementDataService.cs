using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.InventoryManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.InventoryManagement.Data.Entities;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Common;
using System.Linq.Dynamic.Core;
using CodeProject.Shared.Common.Models;

namespace CodeProject.InventoryManagement.Data.EntityFramework
{
	public class InventoryManagementDataService : EntityFrameworkRepository, IInventoryManagementDataService
	{
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
		/// Create Transaction Queue
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
		/// Get Product Information
		/// </summary>
		/// <param name="productId"></param>
		/// <returns></returns>
		public async Task<Product> GetProductInformation(int productId)
		{
			Product product = await dbConnection.Products.Where(x => x.ProductId == productId).FirstOrDefaultAsync();
			return product;
		}
		/// <summary>
		/// Get Product Information By ProductNumber
		/// </summary>
		/// <param name="productNumber"></param>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<Product> GetProductInformationByProductNumber(string productNumber, int accountId)
		{
			Product product = await dbConnection.Products.Where(x => x.ProductNumber == productNumber && x.AccountId == accountId).FirstOrDefaultAsync();
			return product;
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
				sqlStatement, sentToExchangeParameter).OrderBy(x=>x.TransactionQueueOutboundId).ToListAsync();

			return transactionQueue;

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
		/// Update Transaction Queue
		/// </summary>
		/// <param name="transactionQueue"></param>
		/// <returns></returns>
		public async Task UpdateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue)
		{
			await Task.Delay(0);
		}

		/// <summary>
		/// Get Inbound Transaction Queue
		/// </summary>
		/// <returns></returns>
		public async Task<List<TransactionQueueInbound>> GetInboundTransactionQueue()
		{
			List<TransactionQueueInbound> transactionQueue = await dbConnection.TransactionQueueInbound.OrderBy(x => x.TransactionQueueInboundId).ToListAsync();
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
		/// Get Outbound Transaction Queue Item By Id
		/// </summary>
		/// <param name="transactionQueueId"></param>
		/// <returns></returns>
		public async Task<TransactionQueueOutbound> GetOutboundTransactionQueueItemById(int transactionQueueId)
		{
			TransactionQueueOutbound transactionQueueItem = await dbConnection.TransactionQueueOutbound.Where(x=>x.TransactionQueueOutboundId == transactionQueueId).FirstOrDefaultAsync();
			return transactionQueueItem;
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
		/// Create Purchase Order
		/// </summary>
		/// <param name="purchaseOrder"></param>
		/// <returns></returns>
		public async Task CreatePurchaseOrder(PurchaseOrder purchaseOrder)
		{
			DateTime dateCreated = DateTime.UtcNow;
			purchaseOrder.DateCreated = dateCreated;
			purchaseOrder.DateUpdated = dateCreated;

			await dbConnection.PurchaseOrders.AddAsync(purchaseOrder);
		}

		/// <summary>
		/// Create Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetail"></param>
		/// <returns></returns>
		public async Task CreatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail)
		{
			DateTime dateCreated = DateTime.UtcNow;
			purchaseOrderDetail.DateCreated = dateCreated;
			purchaseOrderDetail.DateUpdated = dateCreated;

			await dbConnection.PurchaseOrderDetails.AddAsync(purchaseOrderDetail);
		}

		/// <summary>
		/// Purchase Order Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierName"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<PurchaseOrder>> PurchaseOrderInquiry(int accountId, string supplierName, DataGridPagingInformation paging)
		{
			string sortExpression = paging.SortExpression;
			string sortDirection = paging.SortDirection;

			if (string.IsNullOrEmpty(sortExpression))
			{
				sortExpression = "PurchaseOrderNumber";
			}

			if (paging.SortDirection != string.Empty)
				sortExpression = sortExpression + " " + paging.SortDirection;

			int numberOfRows = 0;

			var query = dbConnection.PurchaseOrders
				.Include(x => x.PurchaseOrderStatus).AsQueryable();

			if (supplierName.Trim().Length > 0)
			{
				query = query.Where(p => p.SupplierName.Contains(supplierName));
			}

			query = query.Where(p => p.AccountId == accountId);

			var purchaseOrderResults = from p in query select p;

			numberOfRows = await purchaseOrderResults.CountAsync();

			List<PurchaseOrder> purchaseOrders = await purchaseOrderResults.OrderBy(sortExpression).Skip((paging.CurrentPageNumber - 1) * paging.PageSize).Take(paging.PageSize).ToListAsync();

			paging.TotalRows = numberOfRows;
			paging.TotalPages = CodeProject.Shared.Common.Utilties.Functions.CalculateTotalPages(numberOfRows, paging.PageSize);

			return purchaseOrders;
		}


		/// <summary>
		/// Sales Order Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierName"></param>
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
				.Include(x => x.SalesOrderStatus).AsQueryable();

			if (customerName.Trim().Length > 0)
			{
				query = query.Where(p => p.CustomerName.Contains(customerName));
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
		/// Get Purchase Order
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="purchaseOrderId"></param>
		/// <returns></returns>
		public async Task<PurchaseOrder> GetPurchaseOrder(int accountId, int purchaseOrderId)
		{
			PurchaseOrder purchaseOrder = await dbConnection.PurchaseOrders
				.Include(x => x.PurchaseOrderStatus)
				.Include(x => x.PurchaseOrderDetails).ThenInclude(p => p.Product)
				.Where(x => x.AccountId == accountId && x.PurchaseOrderId == purchaseOrderId).FirstOrDefaultAsync();

			return purchaseOrder;
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
				.Include(x => x.SalesOrderDetails).ThenInclude(p => p.Product)
				.Where(x => x.AccountId == accountId && x.SalesOrderId == salesOrderId).FirstOrDefaultAsync();

			return salesOrder;
		}

		/// <summary>
		/// Get Purchase Order Header
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="purchaseOrderId"></param>
		/// <returns></returns>
		public async Task<PurchaseOrder> GetPurchaseOrderHeader(int accountId, int purchaseOrderId)
		{
			PurchaseOrder purchaseOrder = await dbConnection.PurchaseOrders
				.Where(x => x.AccountId == accountId && x.PurchaseOrderId == purchaseOrderId).FirstOrDefaultAsync();

			return purchaseOrder;
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
		/// Get Purchase Order Detail For Update
		/// </summary>
		/// <param name="purchaseOrderDetailId"></param>
		/// <returns></returns>
		public async Task<PurchaseOrderDetail> GetPurchaseOrderDetailForUpdate(int purchaseOrderDetailId)
		{
			PurchaseOrderDetail purchaseOrderDetail = await dbConnection.PurchaseOrderDetails
				.Where(x => x.PurchaseOrderDetailId == purchaseOrderDetailId).FirstOrDefaultAsync();

			return purchaseOrderDetail;
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
		/// Update Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetail"></param>
		/// <returns></returns>
		public async Task UpdatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			purchaseOrderDetail.DateUpdated = dateUpdated;
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
		/// Create Inventory Transaction
		/// </summary>
		/// <param name="inventoryTransaction"></param>
		/// <returns></returns>
		public async Task CreateInventoryTransaction(InventoryTransaction inventoryTransaction)
		{
			await dbConnection.InventoryTransactions.AddAsync(inventoryTransaction);
		}

		/// <summary>
		/// Product Inquiry
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="productNumber"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<Product>> ProductInquiry(int accountId, string productNumber, DataGridPagingInformation paging)
		{
			string sortExpression = paging.SortExpression;
			string sortDirection = paging.SortDirection;

			if (string.IsNullOrEmpty(sortExpression))
			{
				sortExpression = "ProductNumber";
			}

			if (paging.SortDirection != string.Empty)
				sortExpression = sortExpression + " " + paging.SortDirection;

			int numberOfRows = 0;

			var query = dbConnection.Products.AsQueryable();

			if (productNumber.Trim().Length > 0)
			{
				query = query.Where(p => p.ProductNumber.Contains(productNumber));
			}

			query = query.Where(p => p.AccountId == accountId);

			var productsResults = from p in query select p;

			numberOfRows = await productsResults.CountAsync();

			List<Product> products = await productsResults.OrderBy(sortExpression).Skip((paging.CurrentPageNumber - 1) * paging.PageSize).Take(paging.PageSize).ToListAsync();

			paging.TotalRows = numberOfRows;
			paging.TotalPages = CodeProject.Shared.Common.Utilties.Functions.CalculateTotalPages(numberOfRows, paging.PageSize);

			return products;
		}

		/// <summary>
		/// Get Product
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="productId"></param>
		/// <returns></returns>
		public async Task<Product> GetProduct(int accountId, int productId)
		{
			Product product = await dbConnection.Products.Where(x => x.AccountId == accountId && x.ProductId == productId).FirstOrDefaultAsync();
			return product;
		}

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


	}
}
