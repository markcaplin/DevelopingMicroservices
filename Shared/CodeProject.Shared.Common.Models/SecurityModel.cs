using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{

	public class SecurityModel
	{
		public string Token { get; set; }
		public int UserId { get; set; }
		public int AccountId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string EmailAddress { get; set; }
		public string CompanyName { get; set; }
	}
}
