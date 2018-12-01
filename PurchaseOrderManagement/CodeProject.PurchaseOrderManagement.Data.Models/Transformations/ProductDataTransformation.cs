using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.PurchaseOrderManagement.Data.Transformations
{
    public class ProductDataTransformation
    {
		public int AccountId { get; set; }
		public int ProductId { get; set; }
		public int ProductMasterId { get; set; }
		public string ProductNumber { get; set; }
		public string Description { get; set; }
	}
}
