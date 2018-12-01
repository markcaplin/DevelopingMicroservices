using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Transformations
{
    public class ProductDataTransformation
    {
		public int AccountId { get; set; }
		public int ProductId { get; set; }
		public string ProductNumber { get; set; }
		public string Description { get; set; }
		public string BinLocation { get; set; }
		public double UnitPrice { get; set; }
		public double AverageCost { get; set; }
		public int OnHandQuantity { get; set; }
		public int OnOrderQuantity { get; set; }
		public int CommittedQuantity { get; set; }
		public DateTime DateCreated { get; set; }
	}
}
