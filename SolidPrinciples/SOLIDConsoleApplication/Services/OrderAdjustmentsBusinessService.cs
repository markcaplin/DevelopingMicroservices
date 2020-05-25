using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class OrderAdjustmentsBusinessService: IAdjustmentsBusinessService
	{
		List<ICalculation> _calculations;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="calculations"></param>
		public OrderAdjustmentsBusinessService(List<ICalculation> calculations)
		{
			_calculations = calculations;
		}

		/// <summary>
		/// Calculate Adjustments On Sales Order
		/// </summary>
		/// <param name="orderAdjustments"></param>
		/// <param name="orderValue"></param>
		/// <returns></returns>
		public decimal CalculateOrderAdjustments(List<OrderAdjustment> orderAdjustments, decimal orderValue)
		{
			
			List<ICalculation> calculations = _calculations.OrderBy(x => x.Priority).ToList();

			decimal netOrderAmount = Calculate(orderAdjustments, calculations, orderValue);
		
			return netOrderAmount;
		}

		/// <summary>
		/// Calculate each adjustment
		/// </summary>
		/// <param name="orderAdjustments"></param>
		/// <param name="calculations"></param>
		/// <param name="orderValue"></param>
		/// <returns></returns>
		private decimal Calculate(List<OrderAdjustment> orderAdjustments, List<ICalculation> calculations, decimal orderValue)
		{
			decimal netOrderAmount = orderValue;

			foreach (ICalculation calculation in calculations)
			{
				OrderAdjustment orderAdjustment = orderAdjustments.Where(x => x.CalculationType == calculation.CalculationType).FirstOrDefault();
				if (orderAdjustment != null)
				{
					netOrderAmount = calculation.Calculate(orderAdjustment.CalculationEntity, netOrderAmount);
				}
			}

			return netOrderAmount;
		}

	}
}
