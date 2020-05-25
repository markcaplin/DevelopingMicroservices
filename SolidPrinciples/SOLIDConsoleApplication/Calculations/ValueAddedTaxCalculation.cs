using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class ValueAddedTaxCalculation : ICalculation
	{
		public string CalculationType { get; set; } = "ValueAddedTax";

		public int Priority { get; set; } = 3;

		private readonly IDataAccessService _dataAccessService;

		public ValueAddedTaxCalculation(IDataAccessService dataAccessService)
		{
			_dataAccessService = dataAccessService;
		}

		/// <summary>
		/// Calculate
		/// </summary>
		/// <param name="countryCode"></param>
		/// <param name="orderValue"></param>
		/// <returns></returns>
		public decimal Calculate(string countryCode, decimal orderValue)
		{
			ValueAddedTaxTable taxTable = _dataAccessService.GetValueAddedTax(countryCode);

			decimal taxAmount = orderValue * taxTable.TaxRate;

			decimal orderTotal = orderValue + taxAmount;

			return orderTotal;
		}

	}
}
