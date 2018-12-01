using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{
    public class MessageQueueReceipt
    {
		public string TransactionCode { get; set; }
		public int TransactionQueueId { get; set; }
		public int MessageQueueDirection { get; set; }
		public string Payload { get; set; }
	}
}
