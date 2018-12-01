using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{
    public static class TransactionQueueTypes
    {
		public static string ProductUpdated = "ProductUpdated";
		public static string InventoryReceived = "InventoryReceived";
		public static string InventoryShipped = "InventoryShipped";
		public static string PurchaseOrderSubmitted = "PurchaseOrderSubmitted";
		public static string SalesOrderSubmitted = "SalesOrderSubmitted";
		public static string Acknowledgement = "Acknowledgement";
		public static string TriggerImmediately = "TriggerImmediately";
	}
}
