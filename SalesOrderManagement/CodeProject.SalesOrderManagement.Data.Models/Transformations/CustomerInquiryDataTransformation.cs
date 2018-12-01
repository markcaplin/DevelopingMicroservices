using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Transformations
{
    public class CustomerInquiryDataTransformation
    {
		public string CustomerName { get; set; }
		public int CurrentPageNumber { get; set; }
		public int PageSize { get; set; }
		public string SortDirection { get; set; }
		public string SortExpression { get; set; }
	}
}
