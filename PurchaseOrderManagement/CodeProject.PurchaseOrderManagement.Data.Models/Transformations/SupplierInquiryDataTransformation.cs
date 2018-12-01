using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.PurchaseOrderManagement.Data.Transformations
{
    public class SupplierInquiryDataTransformation
    {
		public string SupplierName { get; set; }
		public int CurrentPageNumber { get; set; }
		public int PageSize { get; set; }
		public string SortDirection { get; set; }
		public string SortExpression { get; set; }
    }
}
