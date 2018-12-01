using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Entities
{
   
	public class PurchaseOrderDetail
	{
		public int PurchaseOrderDetailId { get; set; }
		public int AccountId { get; set; }
		public int MasterPurchaseOrderDetailId { get; set; }
		public int PurchaseOrderId { get; set; }
		public int ProductId { get; set; }
		public string ProductNumber { get; set; }
		public string ProductDescription { get; set; }
		public double UnitPrice { get; set; }
		public int OrderQuantity { get; set; }
		public int ReceivedQuantity { get; set; }
		public double OrderTotal { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public Product Product { get; set; }
		public PurchaseOrder PurchaseOrder { get; set; }
	}


}
