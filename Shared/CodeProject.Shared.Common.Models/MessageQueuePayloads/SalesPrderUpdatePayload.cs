using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models.MessageQueuePayloads
{
    
	public class SalesOrderUpdatePayload
	{
		public int SalesOrderId { get; set; }
		public int SalesOrderNumber { get; set; }
		public int AccountId { get; set; }
		public int CustomerId { get; set; }
		public string CustomerName { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
		public double OrderTotal { get; set; }
		public int SalesOrderStatusId { get; set; }
		public string SalesOrderStatusDescription { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public List<SalesOrderDetailUpdatePayload> SalesOrderDetails { get; set; }
	}

	public class SalesOrderDetailUpdatePayload
	{
		public int AccountId { get; set; }
		public int SalesOrderDetailId { get; set; }
		public int SalesOrderId { get; set; }
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
