using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.SalesOrderManagement.Data.Entities;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models;


namespace CodeProject.SalesOrderManagement.Interfaces
{
    public interface ISalesOrderManagementDataService : IDataRepository, IDisposable
	{
		Task CreateSalesOrder(SalesOrder salesOrder);
		Task CreateSalesOrderDetail(SalesOrderDetail salesOrderDetail);
		Task CreateInboundTransactionQueue(TransactionQueueInbound transactionQueue);
		Task CreateInboundTransactionQueueHistory(TransactionQueueInboundHistory transactionQueueHistory);
		Task<TransactionQueueInboundHistory> GetInboundTransactionQueueHistoryBySender(int senderTransactionQueueId, string exchangeName);
		Task<Product> GetProductInformationByProductMasterForUpdate(int productMasterId);
		Task DeleteInboundTransactionQueueEntry(int transactionQueueId);
		Task CreateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task<List<TransactionQueueInbound>> GetInboundTransactionQueue();
		Task<List<TransactionQueueOutbound>> GetOutboundTransactionQueue();
		Task UpdateOutboundTransactionQueue(TransactionQueueOutbound transactionQueue);
		Task CreateCustomer(Customer customer);
		Task CreateProduct(Product product);
		Task<Product> GetProductInformationForUpdate(int productId);
		Task UpdateProduct(Product product);
		Task<TransactionQueueSemaphore> GetTransactionQueueSemaphore(string semaphoreKey);
		Task UpdateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task CreateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task<List<Customer>> CustomerInquiry(int accountId, string customerName, DataGridPagingInformation paging);
		Task<Customer> GetCustomerInformationByCustomerName(string customerName, int accountId);
		Task CreateSalesOrderNumberSequence(SalesOrderNumberSequence salesOrderNumberSequence);
		Task UpdateSalesOrderNumberSequence(SalesOrderNumberSequence salesOrderNumberSequence);
		Task<SalesOrder> GetSalesOrder(int accountId, int salesOrderId);
		Task<Customer> GetCustomerInformation(int accountId, int customerId);
		Task<Customer> GetCustomerInformationForUpdate(int accountId, int customerId);
		Task UpdateCustomer(Customer customer);
		Task<SalesOrderNumberSequence> GetSalesOrderNumberSequence(int accountId);
		Task<SalesOrder> GetSalesOrderHeader(int accountId, int salesOrderId);
		Task UpdateSalesOrderHeader(SalesOrder salesOrder);
		Task<SalesOrderDetail> GetSalesOrderDetailForUpdate(int salesOrderDetailId);
		Task UpdateSalesOrderDetail(SalesOrderDetail salesOrderDetail);
		Task DeleteSalesOrderDetail(int salesOrderDetailId);
		Task<Product> GetProduct(int accountId, string productNumber);
		Task<List<SalesOrder>> SalesOrderInquiry(int accountId, string customerName, DataGridPagingInformation paging);
		Task<SalesOrderDetail> GetSalesOrderDetail(int salesOrderDetailId);
		Task CreateOutboundTransactionQueueHistory(TransactionQueueOutboundHistory transactionQueueItem);
		Task DeleteOutboundTransactionQueueEntry(int transactionQueueId);
		Task<TransactionQueueOutbound> GetOutboundTransactionQueueItemById(int transactionQueueId);

	}
}
