using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.Data.Entities
{
   
	public class SalesOrderNumberSequence
	{
		public int SalesOrderNumberSequenceId { get; set; }
		public int AccountId { get; set; }
		public int SalesOrderNumber { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
	}
}
