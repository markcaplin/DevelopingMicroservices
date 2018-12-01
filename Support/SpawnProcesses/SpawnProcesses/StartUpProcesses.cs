using System;
using System.Collections.Generic;
using System.Text;

namespace SpawnProcesses
{
    public class StartUpProcesses
	{
		public Boolean InventoryManagementWebApi { get; set; }
		public Boolean InventoryManagementMessageQueue { get; set; }
		public Boolean SalesOrderManagementWebApi { get; set; }
		public Boolean SalesOrderManagementMessageQueue { get; set; }
		public Boolean PurchaseOrderManagementWebApi { get; set; }
		public Boolean PurchaseOrderManagementMessageQueue { get; set; }
		public Boolean AccountManagementWebApi { get; set; }
		public Boolean LoggingManagementMessageQueue { get; set; }
	}
}
