using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CodeProject.SalesOrderManagement.BusinessServices.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices.Tables;

namespace CodeProject.SalesOrderManagement.BusinessServices
{
	public class DataAccessService: IDataAccessService
	{
		private List<TierDiscountTable> _tierDiscounts;
		private List<StateTaxTable> _stateTaxes;
		private List<PromotionalDiscountTable> _promotionalDiscounts;
		private List<ValueAddedTaxTable> _valueAddedTaxes;

		public DataAccessService()
		{
			PopulateVolumeDiscountTable();
			PopulateStateTaxTable();
			PopulatePromotionalTable();
			PopulateValueAddedTaxTable();
		}

		private void PopulateVolumeDiscountTable()
		{
			_tierDiscounts = new List<TierDiscountTable>();
		
			TierDiscountTable tier1 = new TierDiscountTable();
			tier1.TierLevel = "TIER1";
			tier1.DiscountPercentage = Convert.ToDecimal(".05");

			_tierDiscounts.Add(tier1);

			TierDiscountTable tier2 = new TierDiscountTable();
			tier2.TierLevel = "TIER2";
			tier2.DiscountPercentage = Convert.ToDecimal(".10");

			_tierDiscounts.Add(tier2);

			TierDiscountTable tier3 = new TierDiscountTable();
			tier3.TierLevel = "TIER3";
			tier3.DiscountPercentage = Convert.ToDecimal(".15");

			_tierDiscounts.Add(tier3);
		}

		private void PopulatePromotionalTable()
		{
			_promotionalDiscounts = new List<PromotionalDiscountTable>();

			PromotionalDiscountTable discount1 = new PromotionalDiscountTable();
			discount1.PromotionalCode = "PROMO25";
			discount1.DiscountAmount = Convert.ToDecimal("25.00");

			_promotionalDiscounts.Add(discount1);

			PromotionalDiscountTable discount2 = new PromotionalDiscountTable();
			discount2.PromotionalCode = "PROMO50";
			discount2.DiscountAmount = Convert.ToDecimal("50.00");

			_promotionalDiscounts.Add(discount2);

			PromotionalDiscountTable discount3 = new PromotionalDiscountTable();
			discount3.PromotionalCode = "PROMO75";
			discount3.DiscountAmount = Convert.ToDecimal("75.00");

			_promotionalDiscounts.Add(discount3);

		}

		private void PopulateStateTaxTable()
		{
			_stateTaxes = new List<StateTaxTable>();

			StateTaxTable state1 = new StateTaxTable();
			state1.StateCode = "NY";
			state1.TaxRate = Convert.ToDecimal(".04");

			_stateTaxes.Add(state1);

			StateTaxTable state2 = new StateTaxTable();
			state2.StateCode = "FL";
			state2.TaxRate = Convert.ToDecimal(".06");

			_stateTaxes.Add(state2);

			StateTaxTable state3 = new StateTaxTable();
			state3.StateCode = "CA";
			state3.TaxRate = Convert.ToDecimal(".0725");

			_stateTaxes.Add(state3);

			StateTaxTable state4 = new StateTaxTable();
			state4.StateCode = "WA";
			state4.TaxRate = Convert.ToDecimal(".0650");

			_stateTaxes.Add(state4);

		}

		private void PopulateValueAddedTaxTable()
		{
			_valueAddedTaxes = new List<ValueAddedTaxTable>();

			ValueAddedTaxTable state1 = new ValueAddedTaxTable();
			state1.CountryCode = "USA";
			state1.TaxRate = Convert.ToDecimal(".04");

			_valueAddedTaxes.Add(state1);

			ValueAddedTaxTable state2 = new ValueAddedTaxTable();
			state2.CountryCode = "France";
			state2.TaxRate = Convert.ToDecimal(".06");

			_valueAddedTaxes.Add(state2);

			ValueAddedTaxTable state3 = new ValueAddedTaxTable();
			state3.CountryCode = "Germany";
			state3.TaxRate = Convert.ToDecimal(".0725");

			_valueAddedTaxes.Add(state3);


		}

		public TierDiscountTable GetVolumeDiscount(string tierLevel)
		{
			return _tierDiscounts.Where(x => x.TierLevel == tierLevel).FirstOrDefault();
		}

		public ValueAddedTaxTable GetValueAddedTax(string countryCode)
		{
			return _valueAddedTaxes.Where(x => x.CountryCode == countryCode).FirstOrDefault();
		}

		public StateTaxTable GetStateTax(string stateCode)
		{
			return _stateTaxes.Where(x => x.StateCode == stateCode).FirstOrDefault();
		}

		public PromotionalDiscountTable GetPromotionalDiscount(string promotionalCode)
		{
			return _promotionalDiscounts.Where(x => x.PromotionalCode == promotionalCode).FirstOrDefault();
		}


	}
}
