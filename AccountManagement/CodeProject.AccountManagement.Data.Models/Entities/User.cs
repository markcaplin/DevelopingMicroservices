using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.AccountManagement.Data.Entities
{
	public class User
	{
		public int UserId { get; set; }
		public string EmailAddress { get; set; }
		public string Password { get; set; }
		public string PasswordSalt { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public int AccountId { get; set; }
		public int UserTypeId { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }
		public DateTime DateLastLogin { get; set; }
		public Account Account { get; set; }
		public UserType UserType { get; set; }
    }
}
