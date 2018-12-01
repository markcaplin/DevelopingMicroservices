using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.InventoryManagement.Data.Entities;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models;

namespace CodeProject.InventoryManagement.Interfaces
{
	public interface IInventoryManagementDataService : IDataRepository, IDisposable
	{
		Task CreateProduct(Product product);
		Task CreateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task CreateOutboundTransactionQueueHistory(TransactionQueueOutboundHistory transactionQueueItem);
		Task CreateInboundTransactionQueue(TransactionQueueInbound transactionQueue);
		Task CreateInboundTransactionQueueHistory(TransactionQueueInboundHistory transactionQueueHistory);
		Task<Product> GetProductInformation(int productId);
		Task<Product> GetProductInformationForUpdate(int productId);
		Task<Product> GetProductInformationByProductNumber(string productNumber, int accountId);
		Task UpdateProduct(Product product);
		Task<List<TransactionQueueOutbound>> GetOutboundTransactionQueue();
		Task<TransactionQueueOutbound> GetOutboundTransactionQueueItemById(int transactionQueueId);
		Task UpdateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task<List<TransactionQueueInbound>> GetInboundTransactionQueue();
		Task<TransactionQueueInboundHistory> GetInboundTransactionQueueHistoryBySender(int senderTransactionQueueId, string exchangeName);
		Task DeleteInboundTransactionQueueEntry(int transactionQueueId);
		Task DeleteOutboundTransactionQueueEntry(int transactionQueueId);
		Task<TransactionQueueSemaphore> GetTransactionQueueSemaphore(string semaphoreKey);
		Task UpdateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task CreateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task CreatePurchaseOrder(PurchaseOrder purchaseOrder);
		Task CreatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail);
		Task<List<PurchaseOrder>> PurchaseOrderInquiry(int accountId, string supplierName, DataGridPagingInformation paging);
		Task<PurchaseOrder> GetPurchaseOrder(int accountId, int purchaseOrderId);
		Task<PurchaseOrder> GetPurchaseOrderHeader(int accountId, int purchaseOrderId);
		Task<PurchaseOrderDetail> GetPurchaseOrderDetailForUpdate(int purchaseOrderDetailId);
		Task UpdatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail);
		Task CreateInventoryTransaction(InventoryTransaction inventoryTransaction);
		Task<List<Product>> ProductInquiry(int accountId, string productNumber, DataGridPagingInformation paging);
		Task<Product> GetProduct(int accountId, int productId);
		Task CreateSalesOrder(SalesOrder salesOrder);
		Task CreateSalesOrderDetail(SalesOrderDetail salesOrderDetail);
		Task<SalesOrder> GetSalesOrder(int accountId, int salesOrderId);
		Task UpdateSalesOrderDetail(SalesOrderDetail salesOrderDetail);
		Task<SalesOrder> GetSalesOrderHeader(int accountId, int salesOrderId);
		Task<SalesOrderDetail> GetSalesOrderDetailForUpdate(int salesOrderDetailId);
		Task<List<SalesOrder>> SalesOrderInquiry(int accountId, string customerName, DataGridPagingInformation paging);

	}

}
