using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Entities
{
    public class SalesOrder
    {
		public int SalesOrderId { get; set; }
		public int SalesOrderNumber { get; set; }
		public int AccountId { get; set; }
		public int CustomerId { get; set; }
		public string ShipToAddressLine1 { get; set; }
		public string ShipToAddressLine2 { get; set; }
		public string ShipToCity { get; set; }
		public string ShipToRegion { get; set; }
		public string ShipToPostalCode { get; set; }
		public double OrderTotal { get; set; }
		public int SalesOrderStatusId { get; set; }
		public Customer Customer { get; set; }
		public SalesOrderStatus SalesOrderStatus { get; set; }
		public List<SalesOrderDetail> SalesOrderDetails { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}

}
