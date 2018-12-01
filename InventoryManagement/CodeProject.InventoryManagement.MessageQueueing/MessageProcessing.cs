using System;
using CodeProject.InventoryManagement.Interfaces;
using System.Collections.Generic;
using CodeProject.InventoryManagement.BusinessRules;
using CodeProject.InventoryManagement.Data.Entities;
using CodeProject.InventoryManagement.Data.Transformations;
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
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SignalR.Client;
using System.Threading;

namespace CodeProject.InventoryManagement.Business.MessageService
{
	public class MessageProcessing : IMessageQueueProcessing
	{
		private readonly IInventoryManagementDataService _inventoryManagementDataService;

		public IConfiguration configuration { get; }

		private Boolean _sending = false;
		private Boolean _processing = false;
		private readonly object _processingLock = new object();
		private readonly object _sendingLock = new object();

		/// <summary>
		/// Inventory Management Message Processing
		/// </summary>
		/// <param name="inventoryManagementDataService"></param>
		public MessageProcessing(IInventoryManagementDataService inventoryManagementDataService)
		{
			_inventoryManagementDataService = inventoryManagementDataService;
		}

		/// <summary>
		/// Send Queue Messages
		/// </summary>
		/// <param name="messageQueueConfigurations"></param>
		/// <param name="outboundSemaphoreKey"></param>
		/// <param name="connectionStrings"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<MessageQueue>>> SendQueueMessages(List<IMessageQueueConfiguration> messageQueueConfigurations, string outboundSemaphoreKey, ConnectionStrings connectionStrings)
		{
			ResponseModel<List<MessageQueue>> returnResponse = new ResponseModel<List<MessageQueue>>();
			returnResponse.Entity = new List<MessageQueue>();

			Console.WriteLine("sending = " + _sending);

			lock (_sendingLock)
			{
				if (_sending)
				{
					Console.WriteLine("Aborted iteration still sending");
					return returnResponse;
				}

				_sending = true;

			}

			Console.WriteLine("Start sending");

			Boolean getMessages = true;

			while (getMessages==true)
			{
				ResponseModel<List<MessageQueue>> response = await GetMessagesToSend(messageQueueConfigurations, outboundSemaphoreKey, connectionStrings);
				foreach (MessageQueue message in response.Entity)
				{
					returnResponse.Entity.Add(message);
				}

				if (response.Entity.Count == 0)
				{
					_sending = false;
					getMessages = false;
				}
			}

		
			return returnResponse;

		}
		/// <summary>
		/// Get Messages To Send
		/// </summary>
		/// <param name="messageQueueConfigurations"></param>
		/// <param name="outboundSemaphoreKey"></param>
		/// <param name="connectionStrings"></param>
		/// <returns></returns>
		private async Task<ResponseModel<List<MessageQueue>>> GetMessagesToSend(List<IMessageQueueConfiguration> messageQueueConfigurations, string outboundSemaphoreKey, ConnectionStrings connectionStrings)
		{
			TransactionQueueSemaphore transactionQueueSemaphore = null;

			ResponseModel<List<MessageQueue>> returnResponse = new ResponseModel<List<MessageQueue>>();
			returnResponse.Entity = new List<MessageQueue>();

			try
			{
				_inventoryManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_inventoryManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _inventoryManagementDataService.GetTransactionQueueSemaphore(outboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = outboundSemaphoreKey;
					await _inventoryManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _inventoryManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueOutbound> transactionQueue = await _inventoryManagementDataService.GetOutboundTransactionQueue();

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
						await _inventoryManagementDataService.UpdateOutboundTransactionQueue(transactionQueueItem);

						returnResponse.Entity.Add(message);
					}
					else
					{
						break;
					}

				}

				await _inventoryManagementDataService.UpdateDatabase();

				_inventoryManagementDataService.CommitTransaction();
				_inventoryManagementDataService.CloseConnection();

			}
			catch (Exception ex)
			{
				_inventoryManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_inventoryManagementDataService.CloseConnection();
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
				_inventoryManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_inventoryManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				TransactionQueueInbound transactionQueue = new TransactionQueueInbound();
				transactionQueue.ExchangeName = messageQueue.ExchangeName;
				transactionQueue.SenderTransactionQueueId = messageQueue.TransactionQueueId;
				transactionQueue.TransactionCode = messageQueue.TransactionCode;
				transactionQueue.Payload = messageQueue.Payload;

				await _inventoryManagementDataService.CreateInboundTransactionQueue(transactionQueue);

				await _inventoryManagementDataService.UpdateDatabase();

				_inventoryManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_inventoryManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_inventoryManagementDataService.CloseConnection();
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
				_inventoryManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);

				_inventoryManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				Console.WriteLine("Get Lock at " + DateTime.Now.ToString());
				transactionQueueSemaphore = await _inventoryManagementDataService.GetTransactionQueueSemaphore(inboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = inboundSemaphoreKey;
					await _inventoryManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _inventoryManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<TransactionQueueInbound> transactionQueue = await _inventoryManagementDataService.GetInboundTransactionQueue();
				foreach (TransactionQueueInbound transactionQueueItem in transactionQueue)
				{

					int senderId = transactionQueueItem.SenderTransactionQueueId;
					string exchangeName = transactionQueueItem.ExchangeName;
					string transactionCode = transactionQueueItem.TransactionCode;

					TransactionQueueInboundHistory transactionHistory = await _inventoryManagementDataService.GetInboundTransactionQueueHistoryBySender(senderId, exchangeName);
					if (transactionHistory != null)
					{
						await LogDuplicateMessage(transactionQueueItem);
						await _inventoryManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.PurchaseOrderSubmitted)
					{
						await PurchaseOrderSubmitted(transactionQueueItem);
						await _inventoryManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.SalesOrderSubmitted)
					{
						await SalesOrderSubmitted(transactionQueueItem);
						await _inventoryManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
					else if (transactionCode == TransactionQueueTypes.Acknowledgement)
					{
						await ProcessAcknowledgement(transactionQueueItem);
						await _inventoryManagementDataService.DeleteInboundTransactionQueueEntry(transactionQueueItem.TransactionQueueInboundId);
					}
				
				}

				await _inventoryManagementDataService.UpdateDatabase();

				_inventoryManagementDataService.CommitTransaction();

				_inventoryManagementDataService.CloseConnection();

			}
			catch (Exception ex)
			{
				_inventoryManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_inventoryManagementDataService.CloseConnection();
				_processing = false;
			}

			return returnResponse;
		}

		/// <summary>
		/// Process Acknowledgement
		/// </summary>
		/// <param name="transaction"></param>
		private async Task ProcessAcknowledgement(TransactionQueueInbound transaction)
		{

			int transactionId = transaction.SenderTransactionQueueId;

			TransactionQueueOutbound transactionQueueItem = await _inventoryManagementDataService.GetOutboundTransactionQueueItemById(transactionId);
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

			await _inventoryManagementDataService.CreateOutboundTransactionQueueHistory(transactionHistory);
			await _inventoryManagementDataService.DeleteOutboundTransactionQueueEntry(transactionQueueItem.TransactionQueueOutboundId);

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

			await _inventoryManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);

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

			await _inventoryManagementDataService.CreateInboundTransactionQueueHistory(transactionHistory);
		}


		/// <summary>
		/// Purchase Order Submitted
		/// </summary>
		/// <param name=""></param>
		private async Task PurchaseOrderSubmitted(TransactionQueueInbound transaction)
		{
			PurchaseOrderUpdatePayload payload = JsonConvert.DeserializeObject<PurchaseOrderUpdatePayload>(transaction.Payload);

			PurchaseOrder purchaseOrder = new PurchaseOrder();
			purchaseOrder.AccountId = payload.AccountId;
			purchaseOrder.AddressLine1 = payload.AddressLine1;
			purchaseOrder.AddressLine2 = payload.AddressLine2;
			purchaseOrder.City = payload.City;
			purchaseOrder.Region = payload.Region;
			purchaseOrder.PostalCode = payload.PostalCode;
			purchaseOrder.SupplierName = payload.SupplierName;
			purchaseOrder.PurchaseOrderStatusId = PurchaseOrderStatuses.Open;
			purchaseOrder.PurchaseOrderNumber = payload.PurchaseOrderNumber;
			purchaseOrder.MasterPurchaseOrderId = payload.PurchaseOrderId;
			purchaseOrder.OrderTotal = payload.OrderTotal;

			await _inventoryManagementDataService.CreatePurchaseOrder(purchaseOrder);

			await _inventoryManagementDataService.UpdateDatabase();

			foreach(PurchaseOrderDetailUpdatePayload detail in payload.PurchaseOrderDetails)
			{
				PurchaseOrderDetail purchaseOrderDetail = new PurchaseOrderDetail();

				purchaseOrderDetail.AccountId = payload.AccountId;
				purchaseOrderDetail.MasterPurchaseOrderDetailId = detail.PurchaseOrderDetailId;
				purchaseOrderDetail.PurchaseOrderId = purchaseOrder.PurchaseOrderId;
				purchaseOrderDetail.ProductId = detail.ProductMasterId;
				purchaseOrderDetail.ProductNumber = detail.ProductNumber;
				purchaseOrderDetail.ProductDescription = detail.ProductDescription;
				purchaseOrderDetail.UnitPrice = detail.UnitPrice;
				purchaseOrderDetail.OrderQuantity = detail.OrderQuantity;
				purchaseOrderDetail.ReceivedQuantity = 0;
				purchaseOrderDetail.OrderTotal = detail.UnitPrice * detail.OrderQuantity;

				await _inventoryManagementDataService.CreatePurchaseOrderDetail(purchaseOrderDetail);

			}

			await LogSuccessfullyProcessed(transaction);
		}


		/// <summary>
		/// Sales Order Submitted
		/// </summary>
		/// <param name=""></param>
		private async Task SalesOrderSubmitted(TransactionQueueInbound transaction)
		{
			SalesOrderUpdatePayload payload = JsonConvert.DeserializeObject<SalesOrderUpdatePayload>(transaction.Payload);

			SalesOrder salesOrder = new SalesOrder();
			salesOrder.AccountId = payload.AccountId;
			salesOrder.AddressLine1 = payload.AddressLine1;
			salesOrder.AddressLine2 = payload.AddressLine2;
			salesOrder.City = payload.City;
			salesOrder.Region = payload.Region;
			salesOrder.PostalCode = payload.PostalCode;
			salesOrder.CustomerName = payload.CustomerName;
			salesOrder.SalesOrderStatusId = SalesOrderStatuses.Open;
			salesOrder.SalesOrderNumber = payload.SalesOrderNumber;
			salesOrder.MasterSalesOrderId = payload.SalesOrderId;
			salesOrder.OrderTotal = payload.OrderTotal;

			await _inventoryManagementDataService.CreateSalesOrder(salesOrder);

			await _inventoryManagementDataService.UpdateDatabase();

			foreach (SalesOrderDetailUpdatePayload detail in payload.SalesOrderDetails)
			{
				SalesOrderDetail salesOrderDetail = new SalesOrderDetail();

				salesOrderDetail.AccountId = payload.AccountId;
				salesOrderDetail.MasterSalesOrderDetailId = detail.SalesOrderDetailId;
				salesOrderDetail.SalesOrderId = salesOrder.SalesOrderId;
				salesOrderDetail.ProductId = detail.ProductMasterId;
				salesOrderDetail.ProductNumber = detail.ProductNumber;
				salesOrderDetail.ProductDescription = detail.ProductDescription;
				salesOrderDetail.UnitPrice = detail.UnitPrice;
				salesOrderDetail.OrderQuantity = detail.OrderQuantity;
				salesOrderDetail.ShippedQuantity= 0;
				salesOrderDetail.OrderTotal = detail.UnitPrice * detail.OrderQuantity;

				await _inventoryManagementDataService.CreateSalesOrderDetail(salesOrderDetail);

			}

			await LogSuccessfullyProcessed(transaction);
		}

	}

}

