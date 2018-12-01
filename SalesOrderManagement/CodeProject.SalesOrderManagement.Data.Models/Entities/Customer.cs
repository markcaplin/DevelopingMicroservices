using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Entities
{
    public class Customer
    {
		public int CustomerId { get; set; }
		public int AccountId { get; set; }
		public string Name { get; set; }
		public string AddressLine1 { get; set; }
		public string AddressLine2 { get; set; }
		public string City { get; set; }
		public string Region { get; set; }
		public string PostalCode { get; set; }
		public double AmountOrdered { get; set; }
		public double AmountShipped { get; set; }
		public double CreditLimit { get; set; }
		public DateTime DateShipped { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}
}
