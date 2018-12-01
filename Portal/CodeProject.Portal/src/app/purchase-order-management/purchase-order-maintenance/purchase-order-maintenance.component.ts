
import { PurchaseOrderDetailViewModel } from './../view-models/purchase-order-detail.viewmodel';
import { ProductViewModel } from './../view-models/product.viewmodel';
import { AlertService } from './../../shared-components-services/alert.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PurchaseOrderViewModel } from '../view-models/purchase-order.viewmodel';
import { PurchaseOrderViewModelResponse } from '../view-models/purchase-order-response.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared-components-services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductViewModelResponse } from '../view-models/product-response.viewmodel';
import { PurchaseOrderDetailViewModelResponse } from '../view-models/purchase-order-detail-response.viewmodel';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DeletePurchaseOrderLineItemDialogData {
  title: string;
  index: number;
  productNumber: string;
  orderQuantity: string;
  unitPrice: string;
}

export interface SubmitPurchaseOrderDialogData {
  title: string;
  purchaseOrderNumber: string;
  orderTotal: string;
}

@Component({
  selector: 'app-purchase-order-maintenance',
  templateUrl: './purchase-order-maintenance.component.html',
  styleUrls: ['./purchase-order-maintenance.component.css']
})
export class PurchaseOrderMaintenanceComponent implements OnInit, OnDestroy {

  public purchaseOrderViewModel: PurchaseOrderViewModel;
  private routerSubscription: Subscription;
  public detailDataSource = new MatTableDataSource<PurchaseOrderDetailViewModel>();
  private currentLineItem: number;
  public disableSubmitButton: boolean;

  constructor(public dialog: MatDialog, private router: Router, private httpService: HttpService, private route: ActivatedRoute,
    private sessionService: SessionService, private alertService: AlertService) {

    this.disableSubmitButton = true;
    this.purchaseOrderViewModel = new PurchaseOrderViewModel();

    let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModel.productDescription = '';
    purchaseOrderDetailViewModel.productNumber = ' ';
    purchaseOrderDetailViewModel.unitPriceFormatted = '';
    purchaseOrderDetailViewModel.orderQuantityFormatted = '';
    purchaseOrderDetailViewModel.editProductNumber = true;
    purchaseOrderDetailViewModel.editQuantity = false;
    purchaseOrderDetailViewModel.editUnitPrice = false;
    purchaseOrderDetailViewModel.editMode = false;
    purchaseOrderDetailViewModel.disableAddButton = true;
    purchaseOrderDetailViewModel.disableCancelButton = true;
    purchaseOrderDetailViewModel.disableDeleteButton = true;
    purchaseOrderDetailViewModel.disableEditButton = true;
    purchaseOrderDetailViewModel.disableSaveButton = true;

    let purchaseOrderDetailViewModelOriginalValues = new PurchaseOrderDetailViewModel();

    this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
    this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);

    this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;

  }

  ngOnInit() {

    this.routerSubscription = this.route.queryParams.subscribe(params => {
      this.purchaseOrderViewModel.purchaseOrderId = +params['id'] || 0;
      if (this.purchaseOrderViewModel.purchaseOrderId > 0) {
        this.getPurchaseOrder();
      }
    });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private getPurchaseOrder() {

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/getpurchaseorder';
    this.httpService.HttpPost<PurchaseOrderViewModelResponse>(url, this.purchaseOrderViewModel)
      .subscribe((response: PurchaseOrderViewModelResponse) => {
        this.getPurchaseOrderSuccess(response);
      }, response => this.getPurchaseOrderFailed(response));

  }

  private getPurchaseOrderSuccess(response: PurchaseOrderViewModelResponse) {

    response.entity.orderDate = response.entity.dateCreated.toString().substring(0, 10);

    this.purchaseOrderViewModel.supplierName = response.entity.supplierName;
    this.purchaseOrderViewModel.accountId = response.entity.accountId;
    this.purchaseOrderViewModel.addressLine1 = response.entity.addressLine1;
    this.purchaseOrderViewModel.addressLine2 = response.entity.addressLine2;
    this.purchaseOrderViewModel.city = response.entity.city;
    this.purchaseOrderViewModel.region = response.entity.region;
    this.purchaseOrderViewModel.postalCode = response.entity.postalCode;
    this.purchaseOrderViewModel.purchaseOrderId = response.entity.purchaseOrderId;
    this.purchaseOrderViewModel.purchaseOrderNumber = response.entity.purchaseOrderNumber;
    this.purchaseOrderViewModel.orderDate = response.entity.orderDate;
    this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
    this.purchaseOrderViewModel.purchaseOrderStatusDescription = response.entity.purchaseOrderStatusDescription;

    this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
  
    this.setEnableSubmitButton();

    response.entity.purchaseOrderDetails.forEach(element => {

      let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();
      purchaseOrderDetailViewModel.purchaseOrderDetailId = element.purchaseOrderDetailId;
      purchaseOrderDetailViewModel.purchaseOrderId = element.purchaseOrderId;
      purchaseOrderDetailViewModel.productId = element.productId;
      purchaseOrderDetailViewModel.productDescription = element.productDescription;
      purchaseOrderDetailViewModel.productMasterId = element.productMasterId;
      purchaseOrderDetailViewModel.productNumber = element.productNumber;
      purchaseOrderDetailViewModel.unitPrice = element.unitPrice;
      purchaseOrderDetailViewModel.orderQuantity = element.orderQuantity;
      purchaseOrderDetailViewModel.orderQuantityFormatted = element.orderQuantity.toFixed(0);
      purchaseOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
      purchaseOrderDetailViewModel.editQuantity = false;
      purchaseOrderDetailViewModel.editUnitPrice = false;
      purchaseOrderDetailViewModel.editProductNumber = false;
      purchaseOrderDetailViewModel.editMode = false;
      purchaseOrderDetailViewModel.disableAddButton = true;
      purchaseOrderDetailViewModel.disableSaveButton = true;
      purchaseOrderDetailViewModel.disableCancelButton = true;
      purchaseOrderDetailViewModel.disableDeleteButton = false;
      purchaseOrderDetailViewModel.disableEditButton = false;

      let purchaseOrderDetailViewModelOriginalValues = new PurchaseOrderDetailViewModel();
      purchaseOrderDetailViewModelOriginalValues .unitPrice = element.unitPrice;
      purchaseOrderDetailViewModelOriginalValues .orderQuantity = element.orderQuantity;
      purchaseOrderDetailViewModelOriginalValues .orderQuantityFormatted = element.orderQuantity.toFixed(0);
      purchaseOrderDetailViewModelOriginalValues .unitPriceFormatted = element.unitPrice.toFixed(2);

      this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);

    });

    this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;

    this.purchaseOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice', 'orderQuantity', 'actions'];
 
    if (this.purchaseOrderViewModel.purchaseOrderStatusDescription !== 'Open') {
        this.disablePurchaseOrderButtons();
    }
 
  }

  private getPurchaseOrderFailed(error: HttpErrorResponse) {

    let errorResponse: PurchaseOrderViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public getProduct() {

    this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber
      = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber.trim();

    if (this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber.length === 0) {
      return;
    }

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/getproduct';
    let productViewModel = new ProductViewModel();
    productViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber;
    this.httpService.HttpPost<ProductViewModelResponse>(url, productViewModel)
      .subscribe((response: ProductViewModelResponse) => {
        this.getProductSuccess(response);
      }, response => this.getProductFailed(response));

  }

  private getProductSuccess(response: ProductViewModelResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails[0].productDescription = response.entity.description;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].productId = response.entity.productId;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editQuantity = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editUnitPrice = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editMode = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = false;

  }

  private getProductFailed(error: HttpErrorResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
    let errorResponse: PurchaseOrderViewModelResponse = error.error;

    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public addLineItem() {

    let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModel.purchaseOrderDetailId = 0;
    purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
    purchaseOrderDetailViewModel.productId = this.purchaseOrderViewModel.purchaseOrderDetails[0].productId;
    purchaseOrderDetailViewModel.productMasterId = this.purchaseOrderViewModel.purchaseOrderDetails[0].productMasterId;
    purchaseOrderDetailViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber;
    purchaseOrderDetailViewModel.unitPrice = parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPriceFormatted);
    purchaseOrderDetailViewModel.orderQuantity = parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantityFormatted, 0);

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/createpurchaseorderdetail';
    this.httpService.HttpPost<PurchaseOrderDetailViewModelResponse>(url, purchaseOrderDetailViewModel)
      .subscribe((response: PurchaseOrderDetailViewModelResponse) => {
        this.addLineItemSuccess(response);
      }, response => this.addLineItemFailed(response));

  }

  private addLineItemSuccess(response: PurchaseOrderDetailViewModelResponse) {

    let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModel.purchaseOrderDetailId = response.entity.purchaseOrderDetailId;
    purchaseOrderDetailViewModel.purchaseOrderId = response.entity.purchaseOrderId;
    purchaseOrderDetailViewModel.productId = response.entity.productId;
    purchaseOrderDetailViewModel.productDescription = response.entity.productDescription;
    purchaseOrderDetailViewModel.productMasterId = response.entity.productMasterId;
    purchaseOrderDetailViewModel.productNumber = response.entity.productNumber;
    purchaseOrderDetailViewModel.unitPrice = response.entity.unitPrice;
    purchaseOrderDetailViewModel.orderQuantity = response.entity.orderQuantity;
    purchaseOrderDetailViewModel.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
    purchaseOrderDetailViewModel.unitPriceFormatted = response.entity.unitPrice.toFixed(2);

    this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
    this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
  
    purchaseOrderDetailViewModel.editQuantity = false;
    purchaseOrderDetailViewModel.editUnitPrice = false;
    purchaseOrderDetailViewModel.editProductNumber = false;
    purchaseOrderDetailViewModel.editMode = false;
    purchaseOrderDetailViewModel.disableAddButton = true;
    purchaseOrderDetailViewModel.disableSaveButton = true;
    purchaseOrderDetailViewModel.disableCancelButton = true;
    purchaseOrderDetailViewModel.disableDeleteButton = false;
    purchaseOrderDetailViewModel.disableEditButton = false;

    let purchaseOrderDetailViewModelOriginalValues = new PurchaseOrderDetailViewModel();
    purchaseOrderDetailViewModelOriginalValues.unitPrice = response.entity.unitPrice;
    purchaseOrderDetailViewModelOriginalValues.orderQuantity = response.entity.orderQuantity;
    purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
    purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted = response.entity.unitPrice.toFixed(2);

    this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
    this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);

    this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;

    this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber = ' ';
    this.purchaseOrderViewModel.purchaseOrderDetails[0].productDescription = ' ';
    this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPrice = 0.0;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPriceFormatted = '';
    this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantity = 0;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantityFormatted = '';
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editQuantity = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editUnitPrice = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editProductNumber = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].editMode = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableCancelButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableDeleteButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableEditButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableSaveButton = true;

    const message = 'Line Item successfully saved.';
    this.alertService.ShowSuccessMessage(message);

  }

  private addLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: PurchaseOrderDetailViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public editLineItem(i: number) {

    this.purchaseOrderViewModel.purchaseOrderDetails[i].editQuantity = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].editUnitPrice = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].editMode = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = true;

    let purchaseOrderDetailViewModelOriginalValues = new PurchaseOrderDetailViewModel();
 
    purchaseOrderDetailViewModelOriginalValues.unitPrice =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice;

    purchaseOrderDetailViewModelOriginalValues.orderQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity;

    purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity.toFixed(0);

    purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice.toFixed(2);

    this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i] =
      purchaseOrderDetailViewModelOriginalValues;

    this.setDisableSubmitButton();

  }

  public updateLineItem(i: number) {

    this.currentLineItem = i;

    let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModel.purchaseOrderDetailId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderDetailId;
    purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
    purchaseOrderDetailViewModel.productId = this.purchaseOrderViewModel.purchaseOrderDetails[i].productId;
    purchaseOrderDetailViewModel.productMasterId = this.purchaseOrderViewModel.purchaseOrderDetails[i].productMasterId;
    purchaseOrderDetailViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[i].productNumber;
    purchaseOrderDetailViewModel.unitPrice = parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted);
    purchaseOrderDetailViewModel.orderQuantity = parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted, 0);

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantity =
        parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantityFormatted, 0);
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice =
        parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted);

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/updatepurchaseorderdetail';
    this.httpService.HttpPost<PurchaseOrderDetailViewModelResponse>(url, purchaseOrderDetailViewModel)
      .subscribe((response: PurchaseOrderDetailViewModelResponse) => {
        this.updateLineItemSuccess(response);
      }, response => this.updateLineItemFailed(response));

  }

  private deleteLineItem(i: number) {

    this.currentLineItem = i;

    let purchaseOrderDetailViewModel = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderId;
    purchaseOrderDetailViewModel.purchaseOrderDetailId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderDetailId;

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/deletepurchaseorderdetail';
    this.httpService.HttpPost<PurchaseOrderDetailViewModelResponse>(url, purchaseOrderDetailViewModel)
      .subscribe((response: PurchaseOrderDetailViewModelResponse) => {
        this.deleteLineItemSuccess(response);
      }, response => this.deleteLineItemFailed(response));

  }

  private cancelEdit(i: number) {

    this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice =
       this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPrice;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPriceFormatted;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantity;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantityFormatted;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].editQuantity = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].editUnitPrice = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].editMode = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = false;

    this.setEnableSubmitButton();

  }

  private updateLineItemSuccess(response: PurchaseOrderDetailViewModelResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editQuantity = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editUnitPrice = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editMode = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableSaveButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableCancelButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableDeleteButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableEditButton = false;

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice.toFixed(2);

    this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
    this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully updated.';
    this.alertService.ShowSuccessMessage(message);

  }

  private deleteLineItemSuccess(response: PurchaseOrderDetailViewModelResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails.splice(this.currentLineItem, 1);
    this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.splice(this.currentLineItem, 1);

    this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;

    this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
    this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully deleted.';
    this.alertService.ShowSuccessMessage(message);

  }

  private deleteLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: PurchaseOrderDetailViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private updateLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: PurchaseOrderDetailViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private setDisableSubmitButton() {
    this.disableSubmitButton = true;
  }

  private setEnableSubmitButton() {
    this.disableSubmitButton = true;
    if (this.purchaseOrderViewModel.purchaseOrderDetails.length > 0 && this.purchaseOrderViewModel.purchaseOrderStatusDescription === 'Open') {
      this.disableSubmitButton = false;
    }
  }

  private submitPurchaseOrder() {

    let purchaseOrderViewModel = new PurchaseOrderViewModel();

    purchaseOrderViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/submitpurchaseorder';
    this.httpService.HttpPost<PurchaseOrderViewModelResponse>(url, purchaseOrderViewModel)
      .subscribe((response: PurchaseOrderViewModelResponse) => {
        this.submitPurchaseOrderSuccess(response);
      }, response => this.submitPurchaseOrderFailed(response));

  }

  private submitPurchaseOrderSuccess(response: PurchaseOrderViewModelResponse) {

    this.purchaseOrderViewModel.purchaseOrderStatusDescription = response.entity.purchaseOrderStatusDescription;

    this.setDisableSubmitButton();

    const message = 'Purchase Order Submitted.';
    this.alertService.ShowSuccessMessage(message);

  }

  private submitPurchaseOrderFailed(error: HttpErrorResponse) {

    let errorResponse: PurchaseOrderViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private disablePurchaseOrderButtons()
  {

  }

  public deleteLineItemDialog(i: number): void {

    let productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[i].productNumber;
    let orderQuantity = this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted;
    let unitPrice = this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted;
    let index = i;

    const dialogRef = this.dialog.open(DeletePurchaseOrderLineItemDialogComponent, {
      width: '50%',
      data: {
        title: 'Delete Purchase Order Line Item',
        index: index,
        orderQuantity: orderQuantity,
        unitPrice: unitPrice,
        productNumber: productNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let returnedIndex = parseInt(result, 0);
      if (returnedIndex > 0 ) {
        this.deleteLineItem(returnedIndex);
      }
    });
  }

  public submitPurchaseOrderDialog(): void {

    let purchaseOrderNumber = this.purchaseOrderViewModel.purchaseOrderNumber;
    let orderTotal = this.purchaseOrderViewModel.orderTotalFormatted;
    const dialogRef = this.dialog.open(SubmitPurchaseOrderDialogComponent, {
      width: '50%',
      data: {
        title: 'Submit Purchase Order',
        orderTotal: orderTotal,
        purchaseOrderNumber: purchaseOrderNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let returnedResponse = parseInt(result, 0);
      if (returnedResponse > 0 ) {
        this.submitPurchaseOrder();
      }
    });
  }

}

@Component({
  selector: 'app-delete-purchase-order-lineitem-dialog',
  templateUrl: 'delete-purchase-order-lineitem-dialog.html',
})
export class DeletePurchaseOrderLineItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeletePurchaseOrderLineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeletePurchaseOrderLineItemDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-submit-purchase-order-dialog',
  templateUrl: 'submit-purchase-order-dialog.html',
})
export class SubmitPurchaseOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmitPurchaseOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubmitPurchaseOrderDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
