using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{
    public static class MessageQueueEndpoints
    {
		public static string SalesOrderQueue = "SalesOrder_Queue";
		public static string PurchaseOrderQueue = "PurchaseOrder_Queue";
		public static string InventoryQueue = "Inventory_Queue";
		public static string LoggingQueue = "Logging_Queue";
	}
}
