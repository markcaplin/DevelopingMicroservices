using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class PromotionalDiscountCalculation: ICalculation
	{
		public string CalculationType { get; set; } = "PromotionalDiscount";

		public int Priority { get; set; } = 1;

		private readonly IDataAccessService _dataAccessService;

		public PromotionalDiscountCalculation(IDataAccessService dataAccessService)
		{
			_dataAccessService = dataAccessService;
		}

		/// <summary>
		/// Calculate
		/// </summary>
		/// <param name="promotionalCode"></param>
		/// <param name="orderValue"></param>
		/// <returns></returns>
		public decimal Calculate(string promotionalCode, decimal orderValue)
		{			
			PromotionalDiscountTable promotion = _dataAccessService.GetPromotionalDiscount(promotionalCode);

			if (promotion.DiscountAmount > orderValue)
			{
				return orderValue;
			}
				
			decimal orderTotal = orderValue - promotion.DiscountAmount;
			
			return orderTotal;
		}

	}
}
