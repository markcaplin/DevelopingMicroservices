using CodeProject.Shared.Common.Models;
using RabbitMQ.Client.MessagePatterns;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Interfaces
{

	public interface IMessageQueueConfiguration
	{
		string GetOriginatingQueueName();
		Subscription GetSubscription();
		void AddQueue(string queueName);
		void InitializeInboundMessageQueueing(string queueName);
		void InitializeOutboundMessageQueueing();
		void InitializeLoggingExchange(string loggingExchangeName, string loggingQueueName);
		ResponseModel<MessageQueue> SendMessage(MessageQueue entity);
		ResponseModel<MessageQueue> SendAcknowledgementMessage(MessageQueue entity);
		ResponseModel<MessageQueue> SendReceivedMessageToLoggingQueue(MessageQueue messageQueue, string loggingExchangeName);

		string TransactionCode { get; set; }
		

	}
}
