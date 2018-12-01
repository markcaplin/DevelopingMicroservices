using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Transformations
{
    public class PurchaseOrderDetailDataTransformation
    {
		public int AccountId { get; set; }
		public int PurchaseOrderDetailId { get; set; }
		public int PurchaseOrderId { get; set; }
		public int ProductId { get; set; }
		public int ProductMasterId { get; set; }
		public string ProductNumber { get; set; }
		public string ProductDescription { get; set; }
		public double UnitPrice { get; set; }
		public int OrderQuantity { get; set; }
		public int ReceivedQuantity { get; set; }
		public int CurrentReceivedQuantity { get; set; }
		public double OrderTotal { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}
}
