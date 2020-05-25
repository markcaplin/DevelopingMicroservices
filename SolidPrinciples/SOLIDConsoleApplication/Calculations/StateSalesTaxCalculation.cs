using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class StateSalesTaxCalculation: ICalculation
	{
		public string CalculationType { get; set; } = "StateSalesTax";

		public int Priority { get; set; } = 3;

		private readonly IDataAccessService _dataAccessService;

		public StateSalesTaxCalculation(IDataAccessService dataAccessService)
		{
			_dataAccessService = dataAccessService;
		}

		/// <summary>
		/// Calculate
		/// </summary>
		/// <param name="stateCode"></param>
		/// <param name="amount"></param>
		/// <returns></returns>
		public decimal Calculate(string stateCode, decimal orderValue)
		{
			StateTaxTable taxTable = _dataAccessService.GetStateTax(stateCode);

			decimal taxAmount = orderValue * taxTable.TaxRate;

			decimal orderTotal = orderValue + taxAmount;

			return orderTotal;
		}

	}
}
