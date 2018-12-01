using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.LoggingManagement.Data.Entities
{
    public class AcknowledgementsQueue
    {
		public int AcknowledgementsQueueId { get; set; }
		public int SenderTransactionQueueId { get; set; }
		public string TransactionCode { get; set; }
		public string ExchangeName { get; set; }
		public string AcknowledgementQueue { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
