using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.InventoryManagement.Data.Transformations
{
   
	public class ProductInquiryDataTransformation
	{
		public string ProductNumber { get; set; }
		public int CurrentPageNumber { get; set; }
		public int PageSize { get; set; }
		public string SortDirection { get; set; }
		public string SortExpression { get; set; }
	}
}
