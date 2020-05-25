using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class Order
	{	
		public int OrderNumber { get; set; }
		public int CustomerNumber { get; set; }
		public string CustomerName { get; set; }
		public string ShipToAddress { get; set; }
		public string ShipToCity { get; set; }
		public string ShipToState { get; set; }
		public string ShipToZipCode { get; set; }
		public string ShipToCountryCode { get; set; }
		public decimal TotalOrderValue { get; set; }
		public decimal NetOrderValue { get; set; }
		public List<OrderAdjustment> OrderAdjustments { get; set; }

	}
}
