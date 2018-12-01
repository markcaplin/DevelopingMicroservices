using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{
	public class MessageQueueAppConfig
	{
		public string MessageQueueHostName { get; set; }
		public string MessageQueueUserName { get; set; }
		public string MessageQueuePassword { get; set; }
		public string MessageQueueEnvironment { get; set; }
		public string ExchangeName { get; set; }
		public string RoutingKey { get; set; }
		public string InboundMessageQueue { get; set; }
		public string OutboundMessageQueues { get; set; }
		public string LoggingExchangeName { get; set; }
		public string LoggingMessageQueue { get; set; }
		public string OriginatingQueueName { get; set; }
		public Boolean SendToLoggingQueue { get; set; }
		public string AcknowledgementMessageExchangeSuffix { get; set; }
		public string AcknowledgementMessageQueueSuffix { get; set; } 
		public string TriggerExchangeName { get; set; }
		public string TriggerQueueName { get; set; }
		public Boolean QueueImmediately { get; set; }
		public string InboundSemaphoreKey { get; set; }
		public string OutboundSemaphoreKey { get; set; }
	   
		public int ProcessingIntervalSeconds { get; set; }
		public int SendingIntervalSeconds { get; set; }
		public int ReceivingIntervalSeconds { get; set; }
		public string SignalRHubUrl { get; set; }
	}
}
