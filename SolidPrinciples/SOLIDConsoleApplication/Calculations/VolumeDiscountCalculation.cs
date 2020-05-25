using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class VolumeDiscountCalculation : ICalculation
	{
		public string CalculationType { get; set; } = "VolumeDiscount";

		public int Priority { get; set; } = 2;

		private readonly IDataAccessService _dataAccessService;

		public VolumeDiscountCalculation(IDataAccessService dataAccessService)
		{
			_dataAccessService = dataAccessService;
		}

		/// <summary>
		/// Calculate
		/// </summary>
		/// <param name="tierLevel"></param>
		/// <param name="orderValue"></param>
		/// <returns></returns>
		public decimal Calculate(string tierLevel, decimal orderValue)
		{
			TierDiscountTable discountLevel = _dataAccessService.GetVolumeDiscount(tierLevel);

			decimal discount = orderValue * discountLevel.DiscountPercentage;

			decimal orderTotal = orderValue - discount;

			return orderTotal;
		}
	}
}
