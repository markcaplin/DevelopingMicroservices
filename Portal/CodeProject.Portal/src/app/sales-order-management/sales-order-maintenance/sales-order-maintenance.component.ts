
import { SalesOrderDetailViewModel } from './../view-models/sales-order-detail.viewmodel';
import { ProductViewModel } from './../view-models/product.viewmodel';
import { AlertService } from './../../shared-components-services/alert.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SalesOrderViewModel } from '../view-models/sales-order.viewmodel';
import { SalesOrderViewModelResponse } from '../view-models/sales-order-response.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared-components-services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductViewModelResponse } from '../view-models/product-response.viewmodel';
import { SalesOrderDetailViewModelResponse } from '../view-models/sales-order-detail-response.viewmodel';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface DeleteSalesOrderLineItemDialogData {
  title: string;
  index: number;
  productNumber: string;
  orderQuantity: string;
  unitPrice: string;
}

export interface SubmitSalesOrderDialogData {
  title: string;
  salesOrderNumber: string;
  orderTotal: string;
}

@Component({
  selector: 'app-sales-order-maintenance',
  templateUrl: './sales-order-maintenance.component.html',
  styleUrls: ['./sales-order-maintenance.component.css']
})
export class SalesOrderMaintenanceComponent implements OnInit, OnDestroy {

  public salesOrderViewModel: SalesOrderViewModel;
  private routerSubscription: Subscription;
  public detailDataSource = new MatTableDataSource<SalesOrderDetailViewModel>();
  private currentLineItem: number;
  public disableSubmitButton: boolean;

  constructor(public dialog: MatDialog, private router: Router, private httpService: HttpService, private route: ActivatedRoute,
    private sessionService: SessionService, private alertService: AlertService) {

    this.disableSubmitButton = true;
    this.salesOrderViewModel = new SalesOrderViewModel();

    let salesOrderDetailViewModel = new SalesOrderDetailViewModel();

    salesOrderDetailViewModel.productDescription = '';
    salesOrderDetailViewModel.productNumber = ' ';
    salesOrderDetailViewModel.unitPriceFormatted = '';
    salesOrderDetailViewModel.orderQuantityFormatted = '';
    salesOrderDetailViewModel.editProductNumber = true;
    salesOrderDetailViewModel.editQuantity = false;
    salesOrderDetailViewModel.editUnitPrice = false;
    salesOrderDetailViewModel.editMode = false;
    salesOrderDetailViewModel.disableAddButton = true;
    salesOrderDetailViewModel.disableCancelButton = true;
    salesOrderDetailViewModel.disableDeleteButton = true;
    salesOrderDetailViewModel.disableEditButton = true;
    salesOrderDetailViewModel.disableSaveButton = true;

    let salesOrderDetailViewModelOriginalValues = new SalesOrderDetailViewModel();

    this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
    this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);

    this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;

  }

  ngOnInit() {

    this.routerSubscription = this.route.queryParams.subscribe(params => {
      this.salesOrderViewModel.salesOrderId = +params['id'] || 0;
      if (this.salesOrderViewModel.salesOrderId > 0) {
        this.getSalesOrder();
      }
    });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private getSalesOrder() {

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/getsalesorder';
    this.httpService.HttpPost<SalesOrderViewModelResponse>(url, this.salesOrderViewModel)
      .subscribe((response: SalesOrderViewModelResponse) => {
        this.getSalesOrderSuccess(response);
      }, response => this.getSalesOrderFailed(response));

  }

  private getSalesOrderSuccess(response: SalesOrderViewModelResponse) {

    response.entity.orderDate = response.entity.dateCreated.toString().substring(0, 10);

    this.salesOrderViewModel.customerName = response.entity.customerName;
    this.salesOrderViewModel.accountId = response.entity.accountId;
    this.salesOrderViewModel.addressLine1 = response.entity.addressLine1;
    this.salesOrderViewModel.addressLine2 = response.entity.addressLine2;
    this.salesOrderViewModel.city = response.entity.city;
    this.salesOrderViewModel.region = response.entity.region;
    this.salesOrderViewModel.postalCode = response.entity.postalCode;
    this.salesOrderViewModel.salesOrderId = response.entity.salesOrderId;
    this.salesOrderViewModel.salesOrderNumber = response.entity.salesOrderNumber;
    this.salesOrderViewModel.orderDate = response.entity.orderDate;
    this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
    this.salesOrderViewModel.salesOrderStatusDescription = response.entity.salesOrderStatusDescription;

    this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    response.entity.salesOrderDetails.forEach(element => {

      let salesOrderDetailViewModel = new SalesOrderDetailViewModel();
      salesOrderDetailViewModel.salesOrderDetailId = element.salesOrderDetailId;
      salesOrderDetailViewModel.salesOrderId = element.salesOrderId;
      salesOrderDetailViewModel.productId = element.productId;
      salesOrderDetailViewModel.productDescription = element.productDescription;
      salesOrderDetailViewModel.productMasterId = element.productMasterId;
      salesOrderDetailViewModel.productNumber = element.productNumber;
      salesOrderDetailViewModel.unitPrice = element.unitPrice;
      salesOrderDetailViewModel.orderQuantity = element.orderQuantity;
      salesOrderDetailViewModel.orderQuantityFormatted = element.orderQuantity.toFixed(0);
      salesOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
      salesOrderDetailViewModel.shippedQuantityFormatted = element.shippedQuantity.toFixed(0);

      salesOrderDetailViewModel.editQuantity = false;
      salesOrderDetailViewModel.editUnitPrice = false;
      salesOrderDetailViewModel.editProductNumber = false;
      salesOrderDetailViewModel.editMode = false;
      salesOrderDetailViewModel.disableAddButton = true;
      salesOrderDetailViewModel.disableSaveButton = true;
      salesOrderDetailViewModel.disableCancelButton = true;
      salesOrderDetailViewModel.disableDeleteButton = false;
      salesOrderDetailViewModel.disableEditButton = false;

      let salesOrderDetailViewModelOriginalValues = new SalesOrderDetailViewModel();
      salesOrderDetailViewModelOriginalValues .unitPrice = element.unitPrice;
      salesOrderDetailViewModelOriginalValues .orderQuantity = element.orderQuantity;
      salesOrderDetailViewModelOriginalValues .orderQuantityFormatted = element.orderQuantity.toFixed(0);
      salesOrderDetailViewModelOriginalValues .unitPriceFormatted = element.unitPrice.toFixed(2);

      this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
      this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);

    });

    this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;

    this.salesOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice', 'orderQuantity', 'shippedQuantity', 'actions'];

    if (this.salesOrderViewModel.salesOrderStatusDescription !== 'Open') {
        this.disableSalesOrderButtons();
    }

  }

  private getSalesOrderFailed(error: HttpErrorResponse) {

    let errorResponse: SalesOrderViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public getProduct() {

    this.salesOrderViewModel.salesOrderDetails[0].productNumber
      = this.salesOrderViewModel.salesOrderDetails[0].productNumber.trim();

    if (this.salesOrderViewModel.salesOrderDetails[0].productNumber.length === 0) {
      return;
    }

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/getproduct';
    let productViewModel = new ProductViewModel();
    productViewModel.productNumber = this.salesOrderViewModel.salesOrderDetails[0].productNumber;
    this.httpService.HttpPost<ProductViewModelResponse>(url, productViewModel)
      .subscribe((response: ProductViewModelResponse) => {
        this.getProductSuccess(response);
      }, response => this.getProductFailed(response));

  }

  private getProductSuccess(response: ProductViewModelResponse) {

    this.salesOrderViewModel.salesOrderDetails[0].productDescription = response.entity.description;
    this.salesOrderViewModel.salesOrderDetails[0].productId = response.entity.productId;
    this.salesOrderViewModel.salesOrderDetails[0].editQuantity = true;
    this.salesOrderViewModel.salesOrderDetails[0].editUnitPrice = true;
    this.salesOrderViewModel.salesOrderDetails[0].editMode = true;
    this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = false;

  }

  private getProductFailed(error: HttpErrorResponse) {

    this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = true;
    let errorResponse: SalesOrderViewModelResponse = error.error;

    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public addLineItem() {

    let salesOrderDetailViewModel = new SalesOrderDetailViewModel();

    salesOrderDetailViewModel.salesOrderDetailId = 0;
    salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;
    salesOrderDetailViewModel.productId = this.salesOrderViewModel.salesOrderDetails[0].productId;
    salesOrderDetailViewModel.productMasterId = this.salesOrderViewModel.salesOrderDetails[0].productMasterId;
    salesOrderDetailViewModel.productNumber = this.salesOrderViewModel.salesOrderDetails[0].productNumber;
    salesOrderDetailViewModel.unitPrice = parseFloat(this.salesOrderViewModel.salesOrderDetails[0].unitPriceFormatted);
    salesOrderDetailViewModel.orderQuantity = parseInt(this.salesOrderViewModel.salesOrderDetails[0].orderQuantityFormatted, 0);

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/createsalesorderdetail';
    this.httpService.HttpPost<SalesOrderDetailViewModelResponse>(url, salesOrderDetailViewModel)
      .subscribe((response: SalesOrderDetailViewModelResponse) => {
        this.addLineItemSuccess(response);
      }, response => this.addLineItemFailed(response));

  }

  private addLineItemSuccess(response: SalesOrderDetailViewModelResponse) {

    let salesOrderDetailViewModel = new SalesOrderDetailViewModel();

    salesOrderDetailViewModel.salesOrderDetailId = response.entity.salesOrderDetailId;
    salesOrderDetailViewModel.salesOrderId = response.entity.salesOrderId;
    salesOrderDetailViewModel.productId = response.entity.productId;
    salesOrderDetailViewModel.productDescription = response.entity.productDescription;
    salesOrderDetailViewModel.productMasterId = response.entity.productMasterId;
    salesOrderDetailViewModel.productNumber = response.entity.productNumber;
    salesOrderDetailViewModel.unitPrice = response.entity.unitPrice;
    salesOrderDetailViewModel.orderQuantity = response.entity.orderQuantity;
    salesOrderDetailViewModel.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
    salesOrderDetailViewModel.unitPriceFormatted = response.entity.unitPrice.toFixed(2);

    this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
    this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    salesOrderDetailViewModel.editQuantity = false;
    salesOrderDetailViewModel.editUnitPrice = false;
    salesOrderDetailViewModel.editProductNumber = false;
    salesOrderDetailViewModel.editMode = false;
    salesOrderDetailViewModel.disableAddButton = true;
    salesOrderDetailViewModel.disableSaveButton = true;
    salesOrderDetailViewModel.disableCancelButton = true;
    salesOrderDetailViewModel.disableDeleteButton = false;
    salesOrderDetailViewModel.disableEditButton = false;


    let salesOrderDetailViewModelOriginalValues = new SalesOrderDetailViewModel();
    salesOrderDetailViewModelOriginalValues.unitPrice = response.entity.unitPrice;
    salesOrderDetailViewModelOriginalValues.orderQuantity = response.entity.orderQuantity;
    salesOrderDetailViewModelOriginalValues.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
    salesOrderDetailViewModelOriginalValues.unitPriceFormatted = response.entity.unitPrice.toFixed(2);

    this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
    this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);

    this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;

    this.salesOrderViewModel.salesOrderDetails[0].productNumber = ' ';
    this.salesOrderViewModel.salesOrderDetails[0].productDescription = ' ';
    this.salesOrderViewModel.salesOrderDetails[0].unitPrice = 0.0;
    this.salesOrderViewModel.salesOrderDetails[0].unitPriceFormatted = '';
    this.salesOrderViewModel.salesOrderDetails[0].orderQuantity = 0;
    this.salesOrderViewModel.salesOrderDetails[0].orderQuantityFormatted = '';
    this.salesOrderViewModel.salesOrderDetails[0].editQuantity = false;
    this.salesOrderViewModel.salesOrderDetails[0].editUnitPrice = false;
    this.salesOrderViewModel.salesOrderDetails[0].editProductNumber = true;
    this.salesOrderViewModel.salesOrderDetails[0].editMode = false;
    this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[0].disableCancelButton = true;
    this.salesOrderViewModel.salesOrderDetails[0].disableDeleteButton = true;
    this.salesOrderViewModel.salesOrderDetails[0].disableEditButton = true;
    this.salesOrderViewModel.salesOrderDetails[0].disableSaveButton = true;

    const message = 'Line Item successfully saved.';
    this.alertService.ShowSuccessMessage(message);

  }

  private addLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: SalesOrderDetailViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public editLineItem(i: number) {

    this.salesOrderViewModel.salesOrderDetails[i].editQuantity = true;
    this.salesOrderViewModel.salesOrderDetails[i].editUnitPrice = true;
    this.salesOrderViewModel.salesOrderDetails[i].editMode = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = true;

    let salesOrderDetailViewModelOriginalValues = new SalesOrderDetailViewModel();
 
    salesOrderDetailViewModelOriginalValues.unitPrice =
      this.salesOrderViewModel.salesOrderDetails[i].unitPrice;

    salesOrderDetailViewModelOriginalValues.orderQuantity =
      this.salesOrderViewModel.salesOrderDetails[i].orderQuantity;

    salesOrderDetailViewModelOriginalValues.orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[i].orderQuantity.toFixed(0);

    salesOrderDetailViewModelOriginalValues.unitPriceFormatted =
      this.salesOrderViewModel.salesOrderDetails[i].unitPrice.toFixed(2);

    this.salesOrderViewModel.salesOrderDetailsOriginalValues[i] =
      salesOrderDetailViewModelOriginalValues;

    this.setDisableSubmitButton();

  }

  public updateLineItem(i: number) {

    this.currentLineItem = i;

    let salesOrderDetailViewModel = new SalesOrderDetailViewModel();

    salesOrderDetailViewModel.salesOrderDetailId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderDetailId;
    salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;
    salesOrderDetailViewModel.productId = this.salesOrderViewModel.salesOrderDetails[i].productId;
    salesOrderDetailViewModel.productMasterId = this.salesOrderViewModel.salesOrderDetails[i].productMasterId;
    salesOrderDetailViewModel.productNumber = this.salesOrderViewModel.salesOrderDetails[i].productNumber;
    salesOrderDetailViewModel.unitPrice = parseFloat(this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted);
    salesOrderDetailViewModel.orderQuantity = parseInt(this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted, 0);

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantity =
        parseInt(this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantityFormatted, 0);
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPrice =
        parseFloat(this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPriceFormatted);

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/updatesalesorderdetail';
    this.httpService.HttpPost<SalesOrderDetailViewModelResponse>(url, salesOrderDetailViewModel)
      .subscribe((response: SalesOrderDetailViewModelResponse) => {
        this.updateLineItemSuccess(response);
      }, response => this.updateLineItemFailed(response));

  }

  private deleteLineItem(i: number) {

    this.currentLineItem = i;

    let salesOrderDetailViewModel = new SalesOrderDetailViewModel();

    salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderId;
    salesOrderDetailViewModel.salesOrderDetailId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderDetailId;

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/deletesalesorderdetail';
    this.httpService.HttpPost<SalesOrderDetailViewModelResponse>(url, salesOrderDetailViewModel)
      .subscribe((response: SalesOrderDetailViewModelResponse) => {
        this.deleteLineItemSuccess(response);
      }, response => this.deleteLineItemFailed(response));

  }

  private cancelEdit(i: number) {

    this.salesOrderViewModel.salesOrderDetails[i].unitPrice =
       this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPrice;

    this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPriceFormatted;

    this.salesOrderViewModel.salesOrderDetails[i].orderQuantity =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantity;

    this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantityFormatted;

    this.salesOrderViewModel.salesOrderDetails[i].editQuantity = false;
    this.salesOrderViewModel.salesOrderDetails[i].editUnitPrice = false;
    this.salesOrderViewModel.salesOrderDetails[i].editMode = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = false;

    this.setEnableSubmitButton();

  }

  private updateLineItemSuccess(response: SalesOrderDetailViewModelResponse) {

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].editQuantity = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].editUnitPrice = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].editMode = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableSaveButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableCancelButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableDeleteButton = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableEditButton = false;

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPriceFormatted =
      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPrice.toFixed(2);

    this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
    this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully updated.';
    this.alertService.ShowSuccessMessage(message);

  }

  private deleteLineItemSuccess(response: SalesOrderDetailViewModelResponse) {

    this.salesOrderViewModel.salesOrderDetails.splice(this.currentLineItem, 1);
    this.salesOrderViewModel.salesOrderDetailsOriginalValues.splice(this.currentLineItem, 1);

    this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;

    this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
    this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully deleted.';
    this.alertService.ShowSuccessMessage(message);

  }

  private deleteLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: SalesOrderDetailViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private updateLineItemFailed(error: HttpErrorResponse) {

    let errorResponse: SalesOrderDetailViewModelResponse = error.error;
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
    if (this.salesOrderViewModel.salesOrderDetails.length > 0 && this.salesOrderViewModel.salesOrderStatusDescription === 'Open') {
      this.disableSubmitButton = false;
    }
  }

  private submitSalesOrder() {
    let salesOrderViewModel = new SalesOrderViewModel();

    salesOrderViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/submitsalesorder';
    this.httpService.HttpPost<SalesOrderViewModelResponse>(url, salesOrderViewModel)
      .subscribe((response: SalesOrderViewModelResponse) => {
        this.submitSalesOrderSuccess(response);
      }, response => this.submitSalesOrderFailed(response));

  }

  private submitSalesOrderSuccess(response: SalesOrderViewModelResponse) {

    this.salesOrderViewModel.salesOrderStatusDescription = response.entity.salesOrderStatusDescription;

    this.setDisableSubmitButton();

    const message = 'Sales Order Submitted.';
    this.alertService.ShowSuccessMessage(message);

  }

  private submitSalesOrderFailed(error: HttpErrorResponse) {

    let errorResponse: SalesOrderViewModelResponse = error.error;
    console.log(error.status + ' error status');
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private disableSalesOrderButtons()
  {

  }

  public deleteLineItemDialog(i: number): void {

    let productNumber = this.salesOrderViewModel.salesOrderDetails[i].productNumber;
    let orderQuantity = this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted;
    let unitPrice = this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted;
    let index = i;

    const dialogRef = this.dialog.open(DeleteSalesOrderLineItemDialogComponent, {
      width: '50%',
      data: {
        title: 'Delete Sales Order Line Item',
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

  public submitSalesOrderDialog(): void {

    let salesOrderNumber = this.salesOrderViewModel.salesOrderNumber;
    let orderTotal = this.salesOrderViewModel.orderTotalFormatted;
    const dialogRef = this.dialog.open(SubmitSalesOrderDialogComponent, {
      width: '50%',
      data: {
        title: 'Submit Sales Order',
        orderTotal: orderTotal,
        salesOrderNumber: salesOrderNumber
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      let returnedResponse = parseInt(result, 0);
      if (returnedResponse > 0 ) {
        this.submitSalesOrder();
      }
    });
  }

}

@Component({
  selector: 'app-delete-sales-order-lineitem-dialog',
  templateUrl: 'delete-sales-order-lineitem-dialog.html',
})
export class DeleteSalesOrderLineItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteSalesOrderLineItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteSalesOrderLineItemDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-submit-sales-order-dialog',
  templateUrl: 'submit-sales-order-dialog.html',
})
export class SubmitSalesOrderDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SubmitSalesOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubmitSalesOrderDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
