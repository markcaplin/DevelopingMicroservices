using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.AccountManagement.Data.Transformations
{
    public class AccountDataTransformation
    {
		public int UserId { get; set; }
		public int AccountId { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string CompanyName { get; set; }
		public string EmailAddress { get; set; }
		public string Password { get; set; }
		public string PasswordConfirmation { get; set; }
		public string Token { get; set; }
		public bool IsAuthenicated { get; set; }
	}
}
