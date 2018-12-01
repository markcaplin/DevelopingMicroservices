using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.PurchaseOrderManagement.Interfaces;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.BusinessRules;
using System.Threading.Tasks;

namespace CodeProject.InventoryManagement.BusinessRules
{
	public class PurchaseOrderDetailBusinessRules<T> : ValidationRules<T>
	{
		public T _entity;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="entity"></param>
		/// <param name="userDataService"></param>
		public PurchaseOrderDetailBusinessRules(T entity) : base(entity)
		{
			_entity = entity;
		}

		/// <summary>
		/// Validate
		/// </summary>
		/// <returns></returns>
		public ValidationResult Validate()
		{
		
			ValidateGreaterThanZero("OrderQuantity", "Order Quantity");
			ValidateDecimalGreaterThanZero("UnitPrice", "Unit Price");

			return ValidationResult;
		}
	
	}
}

