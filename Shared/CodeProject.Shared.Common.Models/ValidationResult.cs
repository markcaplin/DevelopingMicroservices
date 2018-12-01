using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models
{
	public class ValidationResult
	{
		public Boolean ValidationStatus { get; set; }
		public List<String> ValidationMessages { get; set; }

		public ValidationResult()
		{
			ValidationStatus = true;
			ValidationMessages = new List<String>();
		}
	}
}
