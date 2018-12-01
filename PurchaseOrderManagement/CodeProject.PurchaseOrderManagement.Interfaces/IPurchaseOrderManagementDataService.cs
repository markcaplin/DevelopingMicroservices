using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models;

namespace CodeProject.PurchaseOrderManagement.Interfaces
{
    public interface IPurchaseOrderManagementDataService : IDataRepository, IDisposable
	{
		Task<Supplier> GetSupplierInformationForUpdate(int accountId, int supplierId);
		Task<Supplier> GetSupplierInformation(int accountId, int supplierId);
		Task<PurchaseOrderNumberSequence> GetPurchaseOrderNumberSequence(int accountId);
		Task CreatePurchaseOrderNumberSequence(PurchaseOrderNumberSequence purchaseOrderNumberSequence);
		Task UpdatePurchaseOrderNumberSequence(PurchaseOrderNumberSequence purchaseOrderNumberSequence);
		Task CreatePurchaseOrder(PurchaseOrder purchaseOrder);
		Task CreatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail);
		Task CreateInboundTransactionQueue(TransactionQueueInbound transactionQueue);
		Task CreateInboundTransactionQueueHistory(TransactionQueueInboundHistory transactionQueueHistory);
		Task<TransactionQueueInboundHistory> GetInboundTransactionQueueHistoryBySender(int senderTransactionQueueId, string exchangeName);
		Task<Supplier> GetSupplierInformationBySupplierName(string supplierName, int accountId);
		Task<Product> GetProductInformationByProductMasterForUpdate(int productMasterId);
		Task DeleteInboundTransactionQueueEntry(int transactionQueueId);
		Task CreateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task<List<TransactionQueueInbound>> GetInboundTransactionQueue();
		Task<List<TransactionQueueOutbound>> GetOutboundTransactionQueue();
		Task UpdateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task CreateSupplier(Supplier supplier);
		Task UpdateSupplier(Supplier supplier);
		Task<TransactionQueueSemaphore> GetTransactionQueueSemaphore(string semaphoreKey);
		Task UpdateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task CreateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task<List<Supplier>> SupplierInquiry(int accountId, string supplierName, DataGridPagingInformation paging);
		Task<PurchaseOrder> GetPurchaseOrder(int accountId, int purchaseOrderId);
		Task<Product> GetProduct(int accountId, string productNumber);
		Task<PurchaseOrder> GetPurchaseOrderHeader(int accountId, int purchaseOrderId);
		Task UpdatePurchaseOrderHeader(PurchaseOrder purchaseOrder);
		Task<List<PurchaseOrder>> PurchaseOrderInquiry(int accountId, string supplierName, DataGridPagingInformation paging);
		Task<PurchaseOrderDetail> GetPurchaseOrderDetail(int purchaseOrderDetailId);
		Task UpdatePurchaseOrderDetail(PurchaseOrderDetail purchaseOrderDetail);
		Task<PurchaseOrderDetail> GetPurchaseOrderDetailForUpdate(int purchaseOrderDetailId);
		Task DeletePurchaseOrderDetail(int purchaseOrderDetailId);
		Task UpdateProduct(Product product);
		Task CreateProduct(Product product);
		Task CreateOutboundTransactionQueueHistory(TransactionQueueOutboundHistory transactionQueueItem);
		Task DeleteOutboundTransactionQueueEntry(int transactionQueueId);
		Task<TransactionQueueOutbound> GetOutboundTransactionQueueItemById(int transactionQueueId);


	}
}
