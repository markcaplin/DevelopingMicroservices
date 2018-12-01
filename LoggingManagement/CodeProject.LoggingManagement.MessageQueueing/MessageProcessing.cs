using System;
using CodeProject.LoggingManagement.Interfaces;
using System.Collections.Generic;
using CodeProject.LoggingManagement.Data.Entities;
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

namespace CodeProject.LoggingManagement.Business.MessageService
{
	public class MessageProcessing : IMessageQueueProcessing
	{
		ILoggingManagementDataService _loggingManagementDataService;

		public IConfiguration configuration { get; }

		private Boolean _sending = false;
		private readonly object _processingLock = new object();
		private readonly object _sendingLock = new object();
	
		/// <summary>
		/// Inventory Management Message Processing
		/// </summary>
		/// <param name="inventoryManagementDataService"></param>
		public MessageProcessing(ILoggingManagementDataService loggingManagementDataService)
		{
			_loggingManagementDataService = loggingManagementDataService;
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
				_loggingManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);

				_loggingManagementDataService.BeginTransaction((int)IsolationLevel.Serializable);

				transactionQueueSemaphore = await _loggingManagementDataService.GetTransactionQueueSemaphore(outboundSemaphoreKey);
				if (transactionQueueSemaphore == null)
				{
					transactionQueueSemaphore = new TransactionQueueSemaphore();
					transactionQueueSemaphore.SemaphoreKey = outboundSemaphoreKey;
					await _loggingManagementDataService.CreateTransactionQueueSemaphore(transactionQueueSemaphore);
				}
				else
				{
					await _loggingManagementDataService.UpdateTransactionQueueSemaphore(transactionQueueSemaphore);
				}

				List<AcknowledgementsQueue> acknowledgementsQueue = await _loggingManagementDataService.ProcessAcknowledgementsQueue();
				foreach (AcknowledgementsQueue transactionQueueItem in acknowledgementsQueue)
				{

					MessageQueue message = new MessageQueue();
					message.ExchangeName = transactionQueueItem.ExchangeName;
					message.TransactionQueueId = transactionQueueItem.SenderTransactionQueueId;
					message.TransactionCode = TransactionQueueTypes.Acknowledgement;
					message.QueueName = transactionQueueItem.AcknowledgementQueue;

					IMessageQueueConfiguration messageQueueConfiguration = messageQueueConfigurations.FirstOrDefault();
					if (messageQueueConfiguration == null)
					{
						break;
					}

					ResponseModel<MessageQueue> messageQueueResponse = messageQueueConfiguration.SendAcknowledgementMessage(message);
					if (messageQueueResponse.ReturnStatus == true)
					{
						await _loggingManagementDataService.DeleteAcknowledgementsQueue(transactionQueueItem.AcknowledgementsQueueId);
						returnResponse.Entity.Add(message);
					}

					
				}

				await _loggingManagementDataService.UpdateDatabase();

				_loggingManagementDataService.CommitTransaction();

				_loggingManagementDataService.CloseConnection();

			

			}
			catch (Exception ex)
			{
				_loggingManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_loggingManagementDataService.CloseConnection();
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
				_loggingManagementDataService.OpenConnection(connectionStrings.PrimaryDatabaseConnectionString);
				_loggingManagementDataService.BeginTransaction((int)IsolationLevel.ReadCommitted);

				MessagesSent existingMessageSent = await _loggingManagementDataService.GetMessageSent(messageQueue.TransactionQueueId, messageQueue.ExchangeName, messageQueue.TransactionCode);

				if (messageQueue.QueueName != string.Empty && messageQueue.QueueName != null)
				{
					MessagesReceived existingMessageReceived = await _loggingManagementDataService.GetMessageReceived(messageQueue.TransactionQueueId, messageQueue.ExchangeName, messageQueue.TransactionCode, messageQueue.QueueName);
					if (existingMessageReceived != null)
					{
						returnResponse.ReturnStatus = true;
						return returnResponse;
					}

				}

				if (existingMessageSent == null)
				{
					MessagesSent messageSent = new MessagesSent();

					messageSent.ExchangeName = messageQueue.ExchangeName;
					messageSent.SenderTransactionQueueId = messageQueue.TransactionQueueId;
					messageSent.TransactionCode = messageQueue.TransactionCode;
					messageSent.Payload = messageQueue.Payload;

					if (messageSent.TransactionCode == MessageQueueExchanges.ProductUpdated)
					{
						messageSent.AcknowledgementsRequired = MessageExchangeFanouts.ProductUpdated;
						messageSent.AcknowledgementsReceived = 0;
					}
					else if (messageSent.TransactionCode == MessageQueueExchanges.PurchaseOrderSubmitted)
					{
						messageSent.AcknowledgementsRequired = MessageExchangeFanouts.PurchaseOrderSubmitted;
						messageSent.AcknowledgementsReceived = 0;
					}
					else if (messageSent.TransactionCode == MessageQueueExchanges.SalesOrderSubmitted)
					{
						messageSent.AcknowledgementsRequired = MessageExchangeFanouts.SalesOrderSubmitted;
						messageSent.AcknowledgementsReceived = 0;
					}
					else if (messageSent.TransactionCode == MessageQueueExchanges.InventoryReceived)
					{
						messageSent.AcknowledgementsRequired = MessageExchangeFanouts.InventoryReceived;
						messageSent.AcknowledgementsReceived = 0;
					}
					else if (messageSent.TransactionCode == MessageQueueExchanges.InventoryShipped)
					{
						messageSent.AcknowledgementsRequired = MessageExchangeFanouts.InventoryShipped;
						messageSent.AcknowledgementsReceived = 0;
					}

					if (messageQueue.QueueName != string.Empty && messageQueue.QueueName != null)
					{
						existingMessageSent.AcknowledgementsReceived = existingMessageSent.AcknowledgementsReceived + 1;
					}

					await _loggingManagementDataService.CreateMessagesSent(messageSent);
				}

				if (messageQueue.QueueName != string.Empty && messageQueue.QueueName != null)
				{
					if (existingMessageSent != null)
					{
						existingMessageSent.AcknowledgementsReceived = existingMessageSent.AcknowledgementsReceived + 1;
						await _loggingManagementDataService.UpdateMessagesSent(existingMessageSent);
					}

					MessagesReceived messageReceived = new MessagesReceived();
					messageReceived.ExchangeName = messageQueue.ExchangeName;
					messageReceived.SenderTransactionQueueId = messageQueue.TransactionQueueId;
					messageReceived.TransactionCode = messageQueue.TransactionCode;
					messageReceived.Payload = messageQueue.Payload;
					messageReceived.QueueName = messageQueue.QueueName;

					await _loggingManagementDataService.CreateMessagesReceived(messageReceived);

					if (existingMessageSent.AcknowledgementsReceived == existingMessageSent.AcknowledgementsRequired)
					{
						AcknowledgementsQueue acknowledgementsQueue = new AcknowledgementsQueue();
						acknowledgementsQueue.ExchangeName = messageQueue.ExchangeName;
						acknowledgementsQueue.SenderTransactionQueueId = messageQueue.TransactionQueueId;
						acknowledgementsQueue.TransactionCode = messageQueue.TransactionCode;

						if (acknowledgementsQueue.TransactionCode == MessageQueueExchanges.ProductUpdated)
						{
							acknowledgementsQueue.AcknowledgementQueue = MessageQueueEndpoints.InventoryQueue;
						}
						else if (acknowledgementsQueue.TransactionCode == MessageQueueExchanges.PurchaseOrderSubmitted)
						{
							acknowledgementsQueue.AcknowledgementQueue = MessageQueueEndpoints.PurchaseOrderQueue;
						}
						else if (acknowledgementsQueue.TransactionCode == MessageQueueExchanges.SalesOrderSubmitted)
						{
							acknowledgementsQueue.AcknowledgementQueue = MessageQueueEndpoints.SalesOrderQueue;
						}
						else if (acknowledgementsQueue.TransactionCode == MessageQueueExchanges.InventoryReceived)
						{
							acknowledgementsQueue.AcknowledgementQueue = MessageQueueEndpoints.InventoryQueue;
						}
						else if (acknowledgementsQueue.TransactionCode == MessageQueueExchanges.InventoryShipped)
						{
							acknowledgementsQueue.AcknowledgementQueue = MessageQueueEndpoints.InventoryQueue;
						}

						await _loggingManagementDataService.CreateAcknowledgementsQueue(acknowledgementsQueue);

					}
				}

				await _loggingManagementDataService.UpdateDatabase();

				_loggingManagementDataService.CommitTransaction();

				returnResponse.ReturnStatus = true;

			}
			catch (Exception ex)
			{
				_loggingManagementDataService.RollbackTransaction();
				returnResponse.ReturnStatus = false;
				returnResponse.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				_loggingManagementDataService.CloseConnection();
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
			await Task.Delay(0);
			ResponseModel<List<MessageQueue>> returnResponse = new ResponseModel<List<MessageQueue>>();
			returnResponse.Entity = new List<MessageQueue>();
			return returnResponse;
		}


	}

}

