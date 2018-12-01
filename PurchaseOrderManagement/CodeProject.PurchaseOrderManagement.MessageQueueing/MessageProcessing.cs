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
using CodeProject.Shared.Common.Utilties;
using CodeProject.Shared.Common.Interfaces;
using Newtonsoft.Json;

namespace CodeProject.PurchaseOrderManagement.Business.MessageService
{
	public class MessageProcessing : IMessageQueueProcessing
	{
		IPurchaseOrderManagementDataService _purchaseOrderManagementDataService;

		public IConfiguration configuration { get; }

		private Boolean _sending = false;
		private Boolean _processing = false;
		private readonly object _processingLock = new object();
		private readonly object _sendingLock = new object();

		/// <summary>
		/// PurchaseOrder Management Message Processing
		/// </summary>
		/// <param name="purchaseOrderManagementDataService"></param>
		public MessageProcessing(IPurchaseOrderManagementDataService purchaseOrderManagementDataService)
		{
			_purchaseOrderManagementDataService = purchaseOrderManagementDataService;
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
				_purchaseOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _purchaseOrderManagementDataService.GetTransactionQueueSemaphore(outboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = outboundSemaphoreKey;
					await _purchaseOrderManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _purchaseOrderManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueOutbound> transactionQueue = await _purchaseOrderManagementDataService.GetOutboundTransactionQueue();
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
						await _purchaseOrderManagementDataService.UpdateOutboundTransactionQueue(transactionQueueItem);

						returnResponse.Entity.Add(message);
					}
				}

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();
				_purchaseOrderManagementDataService.CloseConnection();

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
				_purchaseOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				TransactionQueueInbound transactionQueue = new TransactionQueueInbound();
				transactionQueue.ExchangeName = messageQueue.ExchangeName;
				transactionQueue.SenderTransactionQueueId = messageQueue.TransactionQueueId;
				transactionQueue.TransactionCode = messageQueue.TransactionCode;
				transactionQueue.Payload = messageQueue.Payload;

				await _purchaseOrderManagementDataService.CreateInboundTransactionQueue(transactionQueue);

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
				_purchaseOrderManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_purchaseOrderManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _purchaseOrderManagementDataService.GetTransactionQueueSemaphore(inboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = inboundSemaphoreKey;
					await _purchaseOrderManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _purchaseOrderManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueInbound> transactionQueue = await _purchaseOrderManagementDataService.GetInboundTransactionQueue();
				foreach (TransactionQueueInbound transactionQueueItem in transactionQueue)
				{
	
					int senderId = transactionQueueItem.SenderTransactionQueueId;
					string exchangeName = transactionQueueItem.ExchangeName;
					string transactionCode = transactionQueueItem.TransactionCode;

					TransactionQueueInboundHistory transactionHistory = await _purchaseOrderManagementDataService.GetInboundTransactionQueueHistoryBySender(senderId, exchangeName);
					if (transactionHistory != null)
					{ 
						await LogDuplicateMessage(transactionQueueItem);
						await _purchaseOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.ProductUpdated)
					{
						await ProductUpdated(transactionQueueItem);
						await _purchaseOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.InventoryReceived)
					{
						await InventoryReceived(transactionQueueItem);
						await _purchaseOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.Acknowledgement)
					{
						await ProcessAcknowledgement(transactionQueueItem);
						await _purchaseOrderManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}

				}

				await _purchaseOrderManagementDataService.UpdateDatabase();

				_purchaseOrderManagementDataService.CommitTransaction();

				_purchaseOrderManagementDataService.CloseConnection();

			}
			catch (Exception ex)
			{
				_purchaseOrderManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_processing = false;
				_purchaseOrderManagementDataService.CloseConnection();
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

			Product product = await _purchaseOrderManagementDataService.GetProductInformationByProductMasterForUpdate(productMasterId);
			if (product != null)
			{
				product.ProductNumber = payload.ProductNumber;
				product.Description = payload.Description;
				product.UnitPrice = payload.UnitPrice;

				await _purchaseOrderManagementDataService.UpdateProduct(product);
			}
			else
			{
				product = new Product();
				product.AccountId = payload.AccountId;
				product.ProductNumber = payload.ProductNumber;
				product.ProductMasterId = payload.ProductId;
				product.Description = payload.Description;
				product.UnitPrice = payload.UnitPrice;

				await _purchaseOrderManagementDataService.CreateProduct(product);

			}

			await LogSuccessfullyProcessed(transaction);
		}

		/// <summary>
		/// Inventory Received
		/// </summary>
		/// <param name="transaction"></param>
		private async Task InventoryReceived(TransactionQueueInbound transaction)
		{

			InventoryTransactionPayload payload = JsonConvert.DeserializeObject<InventoryTransactionPayload>(transaction.Payload);

			int purchaseOrderDetailId = payload.MasterEntityId;

			PurchaseOrderDetail purchaseOrderDetail = await _purchaseOrderManagementDataService.GetPurchaseOrderDetailForUpdate(purchaseOrderDetailId);
			if (purchaseOrderDetail != null)
			{
				purchaseOrderDetail.ReceiviedQuantity = purchaseOrderDetail.ReceiviedQuantity + payload.Quantity;

				await _purchaseOrderManagementDataService.UpdatePurchaseOrderDetail(purchaseOrderDetail);
			}
		
			await LogSuccessfullyProcessed(transaction);
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

			await _purchaseOrderManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);
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

			await _purchaseOrderManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);
			
		}

		/// <summary>
		/// Process Acknowledgement
		/// </summary>
		/// <param name="transaction"></param>
		private async Task ProcessAcknowledgement(TransactionQueueInbound transaction)
		{

			int transactionId = transaction.SenderTransactionQueueId;

			TransactionQueueOutbound transactionQueueItem = await _purchaseOrderManagementDataService.GetOutboundTransactionQueueItemById(transactionId);
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

			await _purchaseOrderManagementDataService.CreateOutboundTransactionQueueHistory(transactionHistory);
			await _purchaseOrderManagementDataService.DeleteOutboundTransactionQueueEntry(transactionQueueItem.TransactionQueueOutboundId);

		}
	}

}

