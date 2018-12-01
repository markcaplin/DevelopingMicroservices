using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.LoggingManagement.Data.Entities
{
    public class MessagesReceived
    {
		public int MessagesReceivedId { get; set; }
		public int SenderTransactionQueueId { get; set; }
		public string QueueName { get; set; }
		public string TransactionCode { get; set; }
		public string ExchangeName { get; set; }
		public string Payload { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
