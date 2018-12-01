using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Entities
{
   
	public class SalesOrder
	{
		public int SalesOrderId { get; set; }
		public int MasterSalesOrderId { get; set; }
		public int SalesOrderNumber { get; set; }
		public int AccountId { get; set; }
		public string CustomerName { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
		public double OrderTotal { get; set; }
		public int SalesOrderStatusId { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public SalesOrderStatus SalesOrderStatus { get; set; }
		public List<SalesOrderDetail> SalesOrderDetails { get; set; }
	}
}
