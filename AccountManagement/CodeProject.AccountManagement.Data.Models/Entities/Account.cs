using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.AccountManagement.Data.Entities
{
    public class Account
    {
		public int AccountId { get; set; }
		public string Name { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public int PurchasedApplications { get; set; }
    }
}
