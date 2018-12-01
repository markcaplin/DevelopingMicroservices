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
    public class SupplierBusinessRules<T> : ValidationRules<T>
	{
		public T _entity;

		IPurchaseOrderManagementDataService _purchaseOrderManagementDataService;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="entity"></param>
		/// <param name="userDataService"></param>
		public SupplierBusinessRules(T entity, IPurchaseOrderManagementDataService purchaseOrderManagementDataService) : base(entity)
		{
			_purchaseOrderManagementDataService = purchaseOrderManagementDataService;
			_entity = entity;
			
		}

		public async Task<ValidationResult> Validate()
		{
			ValidateRequired("SupplierName", "Supplier Name");
			ValidateRequired("AddressLine1", "Address Line 1");
			ValidateRequired("City", "City");
			ValidateRequired("Region", "State/Region");
			ValidateRequired("PostalCode", "Postal Code");

			await ValidateUniqueSupplierName("SupplierId", "SupplierName", "AccountId");

			return ValidationResult;
		}
		/// <summary>
		/// Validate Unique Email Address
		/// </summary>
		/// <param name="emailAddress"></param>
		private async Task ValidateUniqueSupplierName(string supplierId, string supplierName, string accountId)
		{
			object valueOfSupplierName = GetPropertyValue(supplierName);
			object valueOfAccountId = GetPropertyValue(accountId);
			object valueOfSupplierId = GetPropertyValue(supplierId);

			Supplier supplier = await _purchaseOrderManagementDataService.GetSupplierInformationBySupplierName(valueOfSupplierName.ToString(), (int)valueOfAccountId);

			if (supplier != null && (int)valueOfSupplierId == 0)
			{
				AddValidationError(supplierName, "Supplier Name already exists.");
				return;
			}

			if (supplier != null && supplier.SupplierId != (int)valueOfSupplierId)
			{
				AddValidationError(supplierName, "Supplier Name already exists.");
			}

		}
	}
}
