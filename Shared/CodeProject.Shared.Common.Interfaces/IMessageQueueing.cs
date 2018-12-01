using CodeProject.Shared.Common.Models;
using System;
using System.Collections.Generic;
using System.Reactive.Subjects;
using System.Text;
using System.Threading.Tasks;

namespace CodeProject.Shared.Common.Interfaces
{
    public interface IMessageQueueing
    {
		void SetConnectionStrings(ConnectionStrings connectionStrings);
		void InitializeMessageQueueing(string hostName, string userName, string password);
		ResponseModel<MessageQueue> SendMessage(object entity);
		Task ReceiveMessages(string queueName, Subject<MessageQueue> subject, IMessageQueueProcessing _messageProcessor);
		void SendAcknowledgement(Guid messageGuid);
		ResponseModel<MessageQueue> BroadcastTransaction(MessageQueueAppConfig messageQueueAppConfig);
		void SetOutboundSemaphoreKey(string outboundSemaphoreKey);
		void SetInboundSemaphoreKey(string inboundSemaphoreKey);
		void InitializeExchange(string exchangeName, string routingKey);
		void InitializeLoggingExchange(string exchangeName, string routingKey);
		void InitializeQueue(string queueName);
		void InitializeQueue(string queueName, string routingKey);
		void InitializeLogging(string originatingQueueName, string loggingQueueName, Boolean sendToLoggingQueue);
		ResponseModel<MessageQueue> SendReceivedMessageToLoggingQueue(MessageQueue messageQueue);
		ResponseModel<MessageQueue> SendAcknowledgementMessage(MessageQueue messageQueue);
		void InitializeAcknowledgementConfiguration(string acknowledgementMessageExchangeSuffix, string acknowledgementMessageQueueSuffix);


	}
}
