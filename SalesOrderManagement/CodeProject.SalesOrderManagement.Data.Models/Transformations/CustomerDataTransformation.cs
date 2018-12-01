using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Transformations
{
  
	public class CustomerDataTransformation
	{
		public int AccountId { get; set; }
		public int CustomerId { get; set; }
		public string CustomerName { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
	}
}
