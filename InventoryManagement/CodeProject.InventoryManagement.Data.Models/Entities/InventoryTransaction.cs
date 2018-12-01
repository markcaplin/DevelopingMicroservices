using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Entities
{
    public class InventoryTransaction
    {
		public int InventoryTransactionId { get; set; }
		public int ProductId { get; set; }
		public int Quantity { get; set; }
		public double UnitCost { get; set; }
		public int EntityId { get; set; }
		public int MasterEntityId { get; set; }
		public DateTime TransactionDate { get; set; }
    }
}
