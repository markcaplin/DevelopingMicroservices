using CodeProject.SalesOrderManagement.BusinessServices.Tables;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices.Interfaces
{
	public interface IDataAccessService
	{
		TierDiscountTable GetVolumeDiscount(string tierLevel);
		ValueAddedTaxTable GetValueAddedTax(string countryCode);
		StateTaxTable GetStateTax(string stateCode);
		PromotionalDiscountTable GetPromotionalDiscount(string promotionalCode);
	}
}
