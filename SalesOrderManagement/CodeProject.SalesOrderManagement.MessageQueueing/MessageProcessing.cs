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
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Interfaces;
using Newtonsoft.Json;

namespace CodeProject.SalesOrderManagement.Business.MessageService
{
	public class MessageProcessing : IMessageQueueProcessing
	{
		ISalesOrderManagementDataService _salesOrderManagementDataService;

		public IConfiguration configuration { get; }

		private Boolean _sending = false;
		private Boolean _processing = false;
		private readonly object _processingLock = new object();
		private readonly object _sendingLock = new object();

		/// <summary>
		/// SalesOrder Management Message Processing
		/// </summary>
		/// <param name="salesOrderManagementDataService"></param>
		public MessageProcessing(ISalesOrderManagementDataService salesOrderManagementDataService)
		{
			_salesOrderManagementDataService = salesOrderManagementDataService;
		}

		/// <summary>
		/// Send Queue Messages
		/// </summary>
		/// <param name="messageQueueing"></param>
		/// <param name="outboundSemaphoreKey"></param>
		/// <returns></returns>
	    public async Task<ResponseModel<List<MessageQueue>>> SendQueueMessages(List<IMessageQueueConfiguration> messageQueueConfigurations, string outboundSemaphoreKey, ConnectionStrings connectionStrings)
		{

			ResponseModel<List<MessageQueue>> returnResponse = new ResponseModel<List<MessageQueue>>();
			returnResponse.Entity = new List<MessageQueue>();

			lock (_sendingLock)
			{
				if (_sending)
				{
					Console.WriteLine("Aborted iteration still sending");
					return returnResponse;
				}

				_sending = true;

			}

			TransactionQueueSemaphore transactionQueueSemaphore = null;

			try
			{
				_salesOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _salesOrderManagementDataService.GetTransactionQueueSemaphore(outboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = outboundSemaphoreKey;
					await _salesOrderManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _salesOrderManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueOutbound> transactionQueue = await _salesOrderManagementDataService.GetOutboundTransactionQueue();
				foreach (TransactionQueueOutbound transactionQueueItem in transactionQueue)
				{
					MessageQueue message = new MessageQueue();
					message.ExchangeName = transactionQueueItem.ExchangeName;
					message.TransactionQueueId = transactionQueueItem.TransactionQueueOutboundId;
					message.TransactionCode = transactionQueueItem.TransactionCode;
					message.Payload = transactionQueueItem.Payload;

					IMessageQueueConfiguration messageQueueConfiguration = messageQueueConfigurations.Where(x => x.TransactionCode == message.TransactionCode).FirstOrDefault();
					if (messageQueueConfiguration == null)
					{
						break;
					}

					ResponseModel<MessageQueue> messageQueueResponse = messageQueueConfiguration.SendMessage(message);

					if (messageQueueResponse.ReturnStatus == true)
					{
						transactionQueueItem.SentToExchange = true;
						transactionQueueItem.DateSentToExchange = DateTime.UtcNow;
						await _salesOrderManagementDataService.UpdateOutboundTransactionQueue(transactionQueueItem);

						returnResponse.Entity.Add(message);
					}
				}

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();
				_salesOrderManagementDataService.CloseConnection();

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
				_sending = false;
			}

			return returnResponse;

		}

		/// <summary>
		/// Commit Inbound Message
		/// </summary>
		/// <param name="messageQueue"></param>
		/// <returns></returns>
		public async Task<ResponseModel<MessageQueue>> CommitInboundMessage(MessageQueue messageQueue, ConnectionStrings connectionStrings)
		{

			ResponseModel<MessageQueue> returnResponse = new ResponseModel<MessageQueue>();

			try
			{
				_salesOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				TransactionQueueInbound transactionQueue = new TransactionQueueInbound();
				transactionQueue.ExchangeName = messageQueue.ExchangeName;
				transactionQueue.SenderTransactionQueueId = messageQueue.TransactionQueueId;
				transactionQueue.TransactionCode = messageQueue.TransactionCode;
				transactionQueue.Payload = messageQueue.Payload;

				await _salesOrderManagementDataService.CreateInboundTransactionQueue(transactionQueue);

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

			returnResponse.Entity = messageQueue;

			return returnResponse;

		}

		/// <summary>
		/// Process Messages
		/// </summary>
		/// <returns></returns>
		public async Task<ResponseModel<List<MessageQueue>>> ProcessMessages(string inboundSemaphoreKey, ConnectionStrings connectionStrings)
		{

			ResponseModel<List<MessageQueue>> returnResponse = new ResponseModel<List<MessageQueue>>();
			returnResponse.Entity = new List<MessageQueue>();

			TransactionQueueSemaphore transactionQueueSemaphore = null;

			lock (_processingLock)
			{
				if (_processing == true)
				{
					Console.WriteLine("Processing iteration aborted");
					return returnResponse;
				}

				_processing = true;
			}

			try
			{
				_salesOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_salesOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _salesOrderManagementDataService.GetTransactionQueueSemaphore(inboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = inboundSemaphoreKey;
					await _salesOrderManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _salesOrderManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueInbound> transactionQueue = await _salesOrderManagementDataService.GetInboundTransactionQueue();
				foreach (TransactionQueueInbound transactionQueueItem in transactionQueue)
				{
	
					int senderId = transactionQueueItem.SenderTransactionQueueId;
					string exchangeName = transactionQueueItem.ExchangeName;
					string transactionCode = transactionQueueItem.TransactionCode;

					TransactionQueueInboundHistory transactionHistory = await _salesOrderManagementDataService.GetInboundTransactionQueueHistoryBySender(senderId, exchangeName);
					if (transactionHistory != null)
					{ 
						await LogDuplicateMessage(transactionQueueItem);
						await _salesOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.ProductUpdated)
					{
						await ProductUpdated(transactionQueueItem);
						await _salesOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.InventoryReceived)
					{
						await InventoryReceived(transactionQueueItem);
						await _salesOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.InventoryShipped)
					{
						await InventoryShipped(transactionQueueItem);
						await _salesOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.Acknowledgement)
					{
						await ProcessAcknowledgement(transactionQueueItem);
						await _salesOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}

				}

				await _salesOrderManagementDataService.UpdateDatabase();

				_salesOrderManagementDataService.CommitTransaction();

				_salesOrderManagementDataService.CloseConnection();

			}
			catch (Exception ex)
			{
				_salesOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_processing = false;
				_salesOrderManagementDataService.CloseConnection();
			}

			return returnResponse;
		}

		/// <summary>
		/// Product Updated
		/// </summary>
		/// <param name="transaction"></param>
		private async Task ProductUpdated(TransactionQueueInbound transaction)
		{

			ProductUpdatePayload payload = JsonConvert.DeserializeObject<ProductUpdatePayload>(transaction.Payload);

			int productMasterId = payload.ProductId;

			Product product = await _salesOrderManagementDataService.GetProductInformationByProductMasterForUpdate(productMasterId);
			if (product != null)
			{
				product.ProductNumber = payload.ProductNumber;
				product.Description = payload.Description;
				product.UnitPrice = payload.UnitPrice;

				await _salesOrderManagementDataService.UpdateProduct(product);
			}
			else
			{
				product = new Product();
				product.AccountId = payload.AccountId;
				product.ProductNumber = payload.ProductNumber;
				product.ProductMasterId = payload.ProductId;
				product.Description = payload.Description;
				product.UnitPrice = payload.UnitPrice;

				await _salesOrderManagementDataService.CreateProduct(product);

			}

			await LogSuccessfullyProcessed(transaction);
		}

		/// <summary>
		/// Inventory Received
		/// </summary>
		/// <param name="transaction"></param>
		/// <returns></returns>
		private async Task InventoryReceived(TransactionQueueInbound transaction)
		{
			InventoryTransactionPayload payload = JsonConvert.DeserializeObject<InventoryTransactionPayload>(transaction.Payload);

			int productMasterId = payload.ProductId;

			Product product = await _salesOrderManagementDataService.GetProductInformationByProductMasterForUpdate(productMasterId);
			if (product != null)
			{
				product.OnHandQuantity = product.OnHandQuantity + payload.Quantity;
				
				await _salesOrderManagementDataService.UpdateProduct(product);
			}

			await LogSuccessfullyProcessed(transaction);
		}

		/// <summary>
		/// Inventory Shipped
		/// </summary>
		/// <param name="transaction"></param>
		/// <returns></returns>
		private async Task InventoryShipped(TransactionQueueInbound transaction)
		{
			InventoryTransactionPayload payload = JsonConvert.DeserializeObject<InventoryTransactionPayload>(transaction.Payload);

			int productMasterId = payload.ProductId;

			Product product = await _salesOrderManagementDataService.GetProductInformationByProductMasterForUpdate(productMasterId);
			if (product != null)
			{
				product.OnHandQuantity = product.OnHandQuantity - payload.Quantity;
				product.CommittedQuantity = product.CommittedQuantity - payload.Quantity;

				await _salesOrderManagementDataService.UpdateProduct(product);
			}

			SalesOrderDetail salesOrderDetail = await _salesOrderManagementDataService.GetSalesOrderDetailForUpdate(payload.MasterEntityId);
			if (salesOrderDetail != null)
			{
				salesOrderDetail.ShippedQuantity = salesOrderDetail.ShippedQuantity + payload.Quantity;
				await _salesOrderManagementDataService.UpdateSalesOrderDetail(salesOrderDetail);
			}

			await LogSuccessfullyProcessed(transaction);
		}

		/// <summary>
		/// Process Acknowledgement
		/// </summary>
		/// <param name="transaction"></param>
		private async Task ProcessAcknowledgement(TransactionQueueInbound transaction)
		{

			int transactionId = transaction.SenderTransactionQueueId;

			TransactionQueueOutbound transactionQueueItem = await _salesOrderManagementDataService.GetOutboundTransactionQueueItemById(transactionId);
			if (transactionQueueItem != null)
			{
				await LogOutboundTransactionToHistory(transactionQueueItem);

			}

		}

		/// <summary>
		/// Log Outbound Transaction To History
		/// </summary>
		/// <param name="transactionQueueItem"></param>
		/// <returns></returns>
		private async Task LogOutboundTransactionToHistory(TransactionQueueOutbound transactionQueueItem)
		{
			TransactionQueueOutboundHistory transactionHistory = new TransactionQueueOutboundHistory();
			transactionHistory.TransactionQueueOutboundId = transactionQueueItem.TransactionQueueOutboundId;
			transactionHistory.TransactionCode = transactionQueueItem.TransactionCode;
			transactionHistory.Payload = transactionQueueItem.Payload;
			transactionHistory.ExchangeName = transactionQueueItem.ExchangeName;
			transactionHistory.SentToExchange = transactionQueueItem.SentToExchange;
			transactionHistory.DateOutboundTransactionCreated = transactionQueueItem.DateCreated;
			transactionHistory.DateSentToExchange = transactionQueueItem.DateSentToExchange;
			transactionHistory.DateToResendToExchange = transactionQueueItem.DateToResendToExchange;

			await _salesOrderManagementDataService.CreateOutboundTransactionQueueHistory(transactionHistory);
			await _salesOrderManagementDataService.DeleteOutboundTransactionQueueEntry(transactionQueueItem.TransactionQueueOutboundId);

		}

		/// <summary>
		/// Log Successfully Processed
		/// </summary>
		/// <param name="transaction"></param>
		/// <returns></returns>
		private async Task LogSuccessfullyProcessed(TransactionQueueInbound transaction)
		{
			TransactionQueueInboundHistory transactionHistory = new TransactionQueueInboundHistory();
			transactionHistory.TransactionQueueInboundId = transaction.TransactionQueueInboundId;
			transactionHistory.SenderTransactionQueueId = transaction.SenderTransactionQueueId;
			transactionHistory.TransactionCode = transaction.TransactionCode;
			transactionHistory.Payload = transaction.Payload;
			transactionHistory.ExchangeName = transaction.ExchangeName;
			transactionHistory.ProcessedSuccessfully = true;
			transactionHistory.DuplicateMessage = false;
			transactionHistory.ErrorMessage = string.Empty;
			transactionHistory.DateCreatedInbound = transaction.DateCreated;

			await _salesOrderManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);
		}


		/// <summary>
		///  Log Duplicate Message
		/// </summary>
		/// <param name="transactionQueueItem"></param>
		/// <returns></returns>
		private async Task LogDuplicateMessage(TransactionQueueInbound transactionQueueItem)
		{
			// log history as duplicate
			TransactionQueueInboundHistory transactionHistory = new TransactionQueueInboundHistory();
			transactionHistory.TransactionQueueInboundId = transactionQueueItem.TransactionQueueInboundId;
			transactionHistory.SenderTransactionQueueId = transactionQueueItem.SenderTransactionQueueId;
			transactionHistory.TransactionCode = transactionQueueItem.TransactionCode;
			transactionHistory.Payload = transactionQueueItem.Payload;
			transactionHistory.ExchangeName = transactionQueueItem.ExchangeName;
			transactionHistory.ProcessedSuccessfully = false;
			transactionHistory.DuplicateMessage = true;
			transactionHistory.ErrorMessage = string.Empty;
			transactionHistory.DateCreatedInbound = transactionQueueItem.DateCreated;

			await _salesOrderManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);
			
		}
	}

}

