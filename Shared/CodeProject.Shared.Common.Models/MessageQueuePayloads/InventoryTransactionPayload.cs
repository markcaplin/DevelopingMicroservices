using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models.MessageQueuePayloads
{
	public class InventoryTransactionPayload
	{
		public int ProductId { get; set; }
		public int Quantity { get; set; }
		public double UnitCost { get; set; }
		public int EntityId { get; set; }
		public int MasterEntityId { get; set; }
		public DateTime TransactionDate { get; set; }
	}
}
