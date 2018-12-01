using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models.MessageQueuePayloads
{
   
	public class PurchaseOrderUpdatePayload
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
		public List<PurchaseOrderDetailUpdatePayload> PurchaseOrderDetails { get; set; }
	}

	public class PurchaseOrderDetailUpdatePayload
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
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}
}
