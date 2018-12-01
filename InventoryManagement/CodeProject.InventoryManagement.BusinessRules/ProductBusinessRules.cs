using System;
using System.Collections.Generic;
using System.Text;
using CodeProject.InventoryManagement.Interfaces;
using CodeProject.InventoryManagement.Data.Entities;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.BusinessRules;
using System.Threading.Tasks;

namespace CodeProject.InventoryManagement.BusinessRules
{
    public class ProductBusinessRules<T> : ValidationRules<T>
	{
		public T _entity;

		IInventoryManagementDataService _inventoryManagementDataService;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="entity"></param>
		/// <param name="userDataService"></param>
		public ProductBusinessRules(T entity, IInventoryManagementDataService inventoryDataService) : base(entity)
		{
			_inventoryManagementDataService = inventoryDataService;
			_entity = entity;
			
		}

		public async Task<ValidationResult> Validate()
		{
			ValidateRequired("ProductNumber", "Product Number");
			ValidateRequired("Description", "Description");
			ValidateRequired("UnitPrice", "Unit Price");

			await ValidateUniqueProductNumber("ProductId", "ProductNumber", "AccountId");

			return ValidationResult;
		}
		/// <summary>
		/// Validate Unique Email Address
		/// </summary>
		/// <param name="emailAddress"></param>
		private async Task ValidateUniqueProductNumber(string productId, string productNumber, string accountId)
		{
			object valueOfProductNumber = GetPropertyValue(productNumber);
			object valueOfAccountId = GetPropertyValue(accountId);
			object valueOfProductId = GetPropertyValue(productId);

			Product product = await _inventoryManagementDataService.GetProductInformationByProductNumber(valueOfProductNumber.ToString(), (int)valueOfAccountId);

			if (product != null && (int)valueOfProductId == 0)
			{
				AddValidationError(productNumber, "Product Number already exists.");
				return;
			}

			if (product != null && product.ProductId != (int)valueOfProductId)
			{
				AddValidationError(productNumber, "Product Number already exists.");
			}

		}
	}
}
