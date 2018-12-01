using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.PurchaseOrderManagement.Data.Entities
{
    public class PurchaseOrder
    {
		public int PurchaseOrderId { get; set; }
		public int PurchaseOrderNumber { get; set; }
		public int AccountId { get; set; }
		public int SupplierId { get; set; }
		public double OrderTotal { get; set; }
		public int PurchaseOrderStatusId { get; set; }
		public Supplier Supplier { get; set; }
		public PurchaseOrderStatus PurchaseOrderStatus { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public List<PurchaseOrderDetail> PurchaseOrderDetails { get; set; }
	}

}
