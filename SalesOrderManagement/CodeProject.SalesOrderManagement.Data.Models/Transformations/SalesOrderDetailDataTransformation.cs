using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Transformations
{
    public class SalesOrderDetailDataTransformation
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
		public int ShippedQuantity { get; set; }
		public double OrderTotal { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}

}
