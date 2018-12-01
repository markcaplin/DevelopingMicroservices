using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Interfaces
{
	public interface IMessageQueue
	{
		int TransactionQueueId { get; set; }
		string TransactionCode { get; set; }
		string Payload { get; set; }
		string ExchangeName { get; set; }
	}
}
