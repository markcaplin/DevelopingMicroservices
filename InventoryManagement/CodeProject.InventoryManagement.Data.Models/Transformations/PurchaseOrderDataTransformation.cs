using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Transformations
{
	public class PurchaseOrderDataTransformation
	{
		public int PurchaseOrderId { get; set; }
		public int PurchaseOrderNumber { get; set; }
		public int AccountId { get; set; }
		public int SupplierId { get; set; }
		public string SupplierName { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
		public double OrderTotal { get; set; }
		public int PurchaseOrderStatusId { get; set; }
		public string PurchaseOrderStatusDescription { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public List<PurchaseOrderDetailDataTransformation> PurchaseOrderDetails { get; set; }
	}
}
