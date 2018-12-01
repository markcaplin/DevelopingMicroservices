using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Entities
{
    public class TransactionQueueSemaphore
    {
		public int TransactionQueueSemaphoreId { get; set; }
		public string SemaphoreKey { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }

	}
}
