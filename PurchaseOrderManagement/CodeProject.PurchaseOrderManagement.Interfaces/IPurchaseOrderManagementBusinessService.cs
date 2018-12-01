using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Models;
using CodeProject.PurchaseOrderManagement.Data.Entities;
using CodeProject.PurchaseOrderManagement.Data.Transformations;

namespace CodeProject.PurchaseOrderManagement.Interfaces
{
	public interface IPurchaseOrderManagementBusinessService
	{
		Task<ResponseModel<SupplierDataTransformation>> CreateSupplier(SupplierDataTransformation supplierDataTransformation);
		Task<ResponseModel<SupplierDataTransformation>> UpdateSupplier(SupplierDataTransformation supplierDataTransformation);
		Task<ResponseModel<SupplierDataTransformation>> GetSupplierInformation(int accountId, int supplierId);
		Task<ResponseModel<PurchaseOrderDataTransformation>> CreatePurchaseOrder(PurchaseOrderDataTransformation purchaseOrderDataTransformation);
		Task<ResponseModel<List<SupplierDataTransformation>>> SupplierInquiry(int accountId, string supplierName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection);
		Task<ResponseModel<PurchaseOrderDataTransformation>> GetPurchaseOrder(int accountId, int purchaseOrderId);
		Task<ResponseModel<ProductDataTransformation>> GetProduct(int accountId, string productNumber);
		Task<ResponseModel<PurchaseOrderDetailDataTransformation>> CreatePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation);
		Task<ResponseModel<List<PurchaseOrderDataTransformation>>> PurchaseOrderInquiry(int accountId, string supplierName, int currentPageNumber, int pageSize, string sortExpression, string sortDirection);
		Task<ResponseModel<PurchaseOrderDetailDataTransformation>> UpdatePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation);
		Task<ResponseModel<PurchaseOrderDetailDataTransformation>> DeletePurchaseOrderDetail(PurchaseOrderDetailDataTransformation purchaseOrderDetailDataTransformation);
		Task<ResponseModel<PurchaseOrderDataTransformation>> SubmitPurchaseOrder(PurchaseOrderDataTransformation purchaseOrderDataTransformation);


	}

}
