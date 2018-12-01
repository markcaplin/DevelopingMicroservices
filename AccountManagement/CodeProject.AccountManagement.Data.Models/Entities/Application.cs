using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.AccountManagement.Data.Entities
{
    public class Application
    {
		public int ApplicationId { get; set; }
		public string Description { get; set; }
		public string ApplicationCode { get; set; }
		public int ApplicationSeed { get; set; }
		public DateTime DateCreated { get; set; }
		public DateTime DateUpdated { get; set; }

    }
}
