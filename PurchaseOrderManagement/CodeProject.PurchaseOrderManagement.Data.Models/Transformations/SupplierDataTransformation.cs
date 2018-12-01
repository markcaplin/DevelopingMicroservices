using CodeProject.PurchaseOrderManagement.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.PurchaseOrderManagement.Data.Transformations
{
    public class SupplierDataTransformation
    {
		public int AccountId { get; set; }
		public int SupplierId { get; set; }
		public string SupplierName { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
	}
}
