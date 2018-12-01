using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.LoggingManagement.Data.Entities;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Interfaces;

namespace CodeProject.LoggingManagement.Interfaces
{
    public interface ILoggingManagementDataService : IDataRepository, IDisposable
	{
		Task CreateMessagesSent(MessagesSent messagesSent);
		Task CreateAcknowledgementsQueue(AcknowledgementsQueue acknowledgementsQueue);
		Task CreateMessagesReceived(MessagesReceived messagesReceived);
		Task<MessagesSent> GetMessageSent(int senderId, string exchangeName, string transactionCode);
		Task<MessagesReceived> GetMessageReceived(int senderId, string exchangeName, string transactionCode, string queueName);
		Task UpdateMessagesSent(MessagesSent messagesSent);
		Task<List<AcknowledgementsQueue>> ProcessAcknowledgementsQueue();
		Task DeleteAcknowledgementsQueue(int acknowledgementsQueueId);
		Task<TransactionQueueSemaphore> GetTransactionQueueSemaphore(string semaphoreKey);
		Task UpdateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
		Task CreateTransactionQueueSemaphore(TransactionQueueSemaphore transactionQueueSemaphore);
	}
}
