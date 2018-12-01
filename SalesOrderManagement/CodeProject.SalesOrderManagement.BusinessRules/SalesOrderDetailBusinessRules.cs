
using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.SalesOrderManagement.Interfaces;
using CodeProject.SalesOrderManagement.Data.Entities;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.BusinessRules;
using System.Threading.Tasks;

namespace CodeProject.SalesOrderManagement.BusinessRules
{
	public class SalesOrderDetailBusinessRules<T> : ValidationRules<T>
	{
		public T _entity;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="entity"></param>
		/// <param name="userDataService"></param>
		public SalesOrderDetailBusinessRules(T entity) : base(entity)
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
	
			return ValidationResult;
		}

	}
}

