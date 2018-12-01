using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.PurchaseOrderManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using System.Transactions;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Common;
using CodeProject.Shared.Common.Models;
using System.Linq.Dynamic.Core;

namespace CodeProject.PurchaseOrderManagement.Data.EntityFramework
{
	public class PurchaseOrderManagementDataService : EntityFrameworkRepository, IPurchaseOrderManagementDataService
	{
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
		/// Create Sales Order Detail
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
		/// Create Supplier
		/// </summary>
		/// <param name="customer"></param>
		/// <returns></returns>
		public async Task CreateSupplier(Supplier supplier)
		{
			DateTime dateCreated = DateTime.UtcNow;
			supplier.DateCreated = dateCreated;
			supplier.DateUpdated = dateCreated;

			await dbConnection.Suppliers.AddAsync(supplier);

		}

		/// <summary>
		/// Update Supplier
		/// </summary>
		/// <param name="supplier"></param>
		/// <returns></returns>
		public async Task UpdateSupplier(Supplier supplier)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			supplier.DateUpdated = dateUpdated;

		}

		/// <summary>
		/// Update Purchase Order Number Sequence
		/// </summary>
		/// <param name="purchaseOrderNumberSequence"></param>
		/// <returns></returns>
		public async Task UpdatePurchaseOrderNumberSequence(PurchaseOrderNumberSequence purchaseOrderNumberSequence)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			purchaseOrderNumberSequence.DateUpdated = dateUpdated;
		}

		/// <summary>
		/// Create Purchase Order Number Sequence
		/// </summary>
		/// <param name="purchaseOrderNumberSequence"></param>
		/// <returns></returns>
		public async Task CreatePurchaseOrderNumberSequence(PurchaseOrderNumberSequence purchaseOrderNumberSequence)
		{
			DateTime dateCreated = DateTime.UtcNow;
			purchaseOrderNumberSequence.DateCreated = dateCreated;
			purchaseOrderNumberSequence.DateUpdated = dateCreated;

			await dbConnection.PurchaseOrderNumberSequences.AddAsync(purchaseOrderNumberSequence);
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
		/// Get Purchase Order Number Sequence
		/// </summary>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<PurchaseOrderNumberSequence> GetPurchaseOrderNumberSequence(int accountId)
		{
			string sqlStatement = "SELECT * FROM PurchaseOrderNumberSequences WITH (UPDLOCK) WHERE AccountId = @AccountId";

			DbParameter accountIdParameter = new SqlParameter("AccountId", accountId);

			PurchaseOrderNumberSequence purchaseOrderNumberSequence = await dbConnection.PurchaseOrderNumberSequences.FromSql(sqlStatement, accountIdParameter).FirstOrDefaultAsync();
			return purchaseOrderNumberSequence;
		}

		/// <summary>
		/// Get Supplier Information For Update
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierId"></param>
		/// <returns></returns>
		public async Task<Supplier> GetSupplierInformationForUpdate(int accountId, int supplierId)
		{
			string sqlStatement = "SELECT * FROM Suppliers WITH (UPDLOCK) WHERE SupplierId = @SupplierId AND AccountId = @AccountId" ;

			DbParameter supplierIdParameter = new SqlParameter("SupplierId", supplierId);
			DbParameter accountIdParameter = new SqlParameter("AccountId", accountId);

			Supplier supplier = await dbConnection.Suppliers.FromSql(sqlStatement, supplierIdParameter, accountIdParameter).FirstOrDefaultAsync();
			return supplier;
		}

		/// <summary>
		/// Get Supplier Information
		/// </summary>
		/// <param name="accountId"></param>
		/// <param name="supplierId"></param>
		/// <returns></returns>
		public async Task<Supplier> GetSupplierInformation(int accountId, int supplierId)
		{
			Supplier supplier = await dbConnection.Suppliers.Where(x => x.SupplierId == supplierId && x.AccountId == accountId).FirstOrDefaultAsync();
			return supplier;
		}

		/// <summary>
		/// Get Product Information B yProduct Master For Update
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
		/// Get Supplier Information By Supplier Name
		/// </summary>
		/// <param name="supplierName"></param>
		/// <param name="accountId"></param>
		/// <returns></returns>
		public async Task<Supplier> GetSupplierInformationBySupplierName(string supplierName, int accountId)
		{
			Supplier supplier = await dbConnection.Suppliers.Where(x => x.Name == supplierName && x.AccountId == accountId).FirstOrDefaultAsync();
			return supplier;
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
		/// <param name="supplierName"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<Supplier>> SupplierInquiry(int accountID, string supplierName, DataGridPagingInformation paging)
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

			var query = dbConnection.Suppliers.AsQueryable();

			if (supplierName.Trim().Length > 0)
			{
				query = query.Where(p => p.Name.Contains(supplierName));
			}

			query = query.Where(p => p.AccountId == accountID);

			var supplierResults = from p in query select p;

			numberOfRows = await supplierResults.CountAsync();

			List<Supplier> suppliers = await supplierResults.OrderBy(sortExpression).Skip((paging.CurrentPageNumber - 1) * paging.PageSize).Take(paging.PageSize).ToListAsync();

			paging.TotalRows = numberOfRows;
			paging.TotalPages = CodeProject.Shared.Common.Utilties.Functions.CalculateTotalPages(numberOfRows, paging.PageSize);

			return suppliers;

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
				.Include(x=>x.PurchaseOrderStatus)
				.Include(x=>x.Supplier)
				.Include(x=>x.PurchaseOrderDetails).ThenInclude(p=>p.Product)
				.Where(x=> x.AccountId == accountId && x.PurchaseOrderId == purchaseOrderId).FirstOrDefaultAsync();

			return purchaseOrder;
		}

		/// <summary>
		/// Get Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailId"></param>
		/// <returns></returns>
		public async Task<PurchaseOrderDetail> GetPurchaseOrderDetail(int purchaseOrderDetailId)
		{
			PurchaseOrderDetail purchaseOrderDetail = await dbConnection.PurchaseOrderDetails
				.Include(p => p.Product)
				.Where(x=> x.PurchaseOrderDetailId == purchaseOrderDetailId).FirstOrDefaultAsync();

			return purchaseOrderDetail;
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
		/// Update Purchase Order Header
		/// </summary>
		/// <param name="purchaseOrder"></param>
		/// <returns></returns>
		public async Task UpdatePurchaseOrderHeader(PurchaseOrder purchaseOrder)
		{
			await Task.Delay(0);
			DateTime dateUpdated = DateTime.UtcNow;
			purchaseOrder.DateUpdated = dateUpdated;
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
		/// Delete Purchase Order Detail
		/// </summary>
		/// <param name="purchaseOrderDetailId"></param>
		/// <returns></returns>
		public async Task DeletePurchaseOrderDetail(int purchaseOrderDetailId)
		{
			PurchaseOrderDetail purchaseOrderDetail = await dbConnection.PurchaseOrderDetails.Where(x => x.PurchaseOrderDetailId == purchaseOrderDetailId).FirstOrDefaultAsync();
			dbConnection.PurchaseOrderDetails.Remove(purchaseOrderDetail);
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
				.Include(x=>x.Supplier)
				.Include(x => x.PurchaseOrderStatus).AsQueryable();

			if (supplierName.Trim().Length > 0)
			{
				query = query.Where(p => p.Supplier.Name.Contains(supplierName));
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
