using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http.Headers;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	class Program
	{
		static void Main(string[] args)
		{
		
			Order order = new Order();
			order.CustomerName = "Microsoft";
			order.CustomerNumber = 1000;
			order.ShipToAddress = "One Microsoft Way";
			order.ShipToCity = "Redmond";
			order.ShipToState = "WA";
			order.ShipToZipCode = "98052";
			order.ShipToCountryCode = "USA";
			order.TotalOrderValue = Convert.ToDecimal(500.00);
			order.OrderAdjustments = new List<OrderAdjustment>();

			OrderAdjustment adjustment1 = new OrderAdjustment();
			adjustment1.CalculationType = "StateSalesTax";
			adjustment1.CalculationEntity = order.ShipToState;

			order.OrderAdjustments.Add(adjustment1);

			OrderAdjustment adjustment2 = new OrderAdjustment();
			adjustment2.CalculationType = "PromotionalDiscount";
			adjustment2.CalculationEntity = "PROMO50";

			order.OrderAdjustments.Add(adjustment2);

			OrderAdjustment adjustment3 = new OrderAdjustment();
			adjustment3.CalculationType = "VolumeDiscount";
			adjustment3.CalculationEntity = "TIER1";

			order.OrderAdjustments.Add(adjustment3);

			IDataAccessService dataAccessService = new DataAccessService();

			List<ICalculation> calculations = new List<ICalculation>();

			ICalculation promotionalCalculation = new PromotionalDiscountCalculation(dataAccessService);
			ICalculation stateCalculation = new StateSalesTaxCalculation(dataAccessService);
			ICalculation valueAddedCalculation = new ValueAddedTaxCalculation(dataAccessService);
			ICalculation volumeDiscountCalculation = new VolumeDiscountCalculation(dataAccessService);

			calculations.Add(promotionalCalculation);
			calculations.Add(stateCalculation);
			calculations.Add(valueAddedCalculation);
			calculations.Add(volumeDiscountCalculation);

			OrderAdjustmentsBusinessService businessService = new OrderAdjustmentsBusinessService(dataAccessService, calculations);
			order.NetOrderValue = businessService.CalculateOrderAdjustments(order.OrderAdjustments, order.TotalOrderValue);

			Console.WriteLine(order.NetOrderValue);
			Console.ReadLine();

		}
	}
}
