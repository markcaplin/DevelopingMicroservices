using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Entities
{
    public class TransactionQueueInboundHistory
    {
		public int TransactionQueueInboundHistoryId { get; set; }
		public int TransactionQueueInboundId { get; set; }
		public int SenderTransactionQueueId { get; set; }
		public string TransactionCode { get; set; }
		public string Payload { get; set; }
		public string ExchangeName { get; set; }
		public bool ProcessedSuccessfully { get; set; }
		public bool DuplicateMessage { get; set; }
		public string ErrorMessage { get; set; }
		public DateTime DateCreatedInbound { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
