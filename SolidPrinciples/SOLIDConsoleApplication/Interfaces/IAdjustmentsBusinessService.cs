using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.SalesOrderManagement.BusinessServices.Interfaces
{
	public interface IAdjustmentsBusinessService
	{
		decimal CalculateOrderAdjustments(List<OrderAdjustment> orderAdjustments, decimal orderValue);
	}
}
