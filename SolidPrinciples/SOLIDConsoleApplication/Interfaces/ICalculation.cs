using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public interface ICalculation
	{
		public string CalculationType { get; set; }
		public int Priority { get; set; }
		public decimal Calculate(string code, decimal orderValue);
	}
}
