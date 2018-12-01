import { SalesOrderDetailViewModel } from './../view-models/sales-order-detail.viewmodel';
import { AlertService } from './../../shared-components-services/alert.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SalesOrderViewModel } from '../view-models/sales-order.viewmodel';
import { SalesOrderViewModelResponse } from '../view-models/sales-order-response.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared-components-services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SalesOrderDetailViewModelResponse } from '../view-models/sales-order-detail-response.viewmodel';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-sales-order-shipments',
  templateUrl: './sales-order-shipments.component.html',
  styleUrls: ['./sales-order-shipments.component.css']
})
export class SalesOrderShipmentsComponent implements OnInit, OnDestroy {

  public salesOrderViewModel: SalesOrderViewModel;
  private routerSubscription: Subscription;
  public detailDataSource = new MatTableDataSource<SalesOrderDetailViewModel>();
  private currentLineItem: number;
  public disableSubmitButton: boolean;

  constructor(public dialog: MatDialog, private router: Router, private httpService: HttpService, private route: ActivatedRoute,
    private sessionService: SessionService, private alertService: AlertService) {

    this.disableSubmitButton = true;
    this.salesOrderViewModel = new SalesOrderViewModel();

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

    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/getsalesorder';
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
      salesOrderDetailViewModel.shippedQuantityFormatted = element.shippedQuantity.toFixed(0);
      salesOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
      salesOrderDetailViewModel.editCurrentShippedQuantity = false;
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
      salesOrderDetailViewModelOriginalValues.unitPrice = element.unitPrice;
      salesOrderDetailViewModelOriginalValues.orderQuantity = element.orderQuantity;
      salesOrderDetailViewModelOriginalValues.orderQuantityFormatted = element.orderQuantity.toFixed(0);
      salesOrderDetailViewModelOriginalValues.shippedQuantityFormatted = element.shippedQuantity.toFixed(0);
      salesOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);

      this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
      this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);

    });

    this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;

    this.salesOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice',
      'orderQuantity', 'shippedQuantity', 'currentShippedQuantity', 'actions'];

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

  private getProductFailed(error: HttpErrorResponse) {

    this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = true;
    let errorResponse: SalesOrderViewModelResponse = error.error;

    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public editLineItem(i: number) {

    this.salesOrderViewModel.salesOrderDetails[i].editCurrentShippedQuantity = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = true;

    let salesOrderDetailViewModelOriginalValues = new SalesOrderDetailViewModel();

    salesOrderDetailViewModelOriginalValues.unitPrice =
      this.salesOrderViewModel.salesOrderDetails[i].unitPrice;

    salesOrderDetailViewModelOriginalValues.orderQuantity =
      this.salesOrderViewModel.salesOrderDetails[i].orderQuantity;

    salesOrderDetailViewModelOriginalValues.shippedQuantity =
      this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity;

    salesOrderDetailViewModelOriginalValues.orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[i].orderQuantity.toFixed(0);

    salesOrderDetailViewModelOriginalValues.shippedQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity.toFixed(0);

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
    salesOrderDetailViewModel.currentShippedQuantity =
      parseInt(this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].currentShippedQuantityFormatted, 0);

    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/updatesalesorderdetail';
    this.httpService.HttpPost<SalesOrderDetailViewModelResponse>(url, salesOrderDetailViewModel)
      .subscribe((response: SalesOrderDetailViewModelResponse) => {
        this.updateLineItemSuccess(response);
      }, response => this.updateLineItemFailed(response));

  }

  private cancelEdit(i: number) {

    this.salesOrderViewModel.salesOrderDetails[i].unitPrice =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPrice;

    this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPriceFormatted;

    this.salesOrderViewModel.salesOrderDetails[i].orderQuantity =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantity;

    this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].shippedQuantity;

    this.salesOrderViewModel.salesOrderDetails[i].currentShippedQuantity = 0;
    this.salesOrderViewModel.salesOrderDetails[i].currentShippedQuantityFormatted = '';

    this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantityFormatted;

    this.salesOrderViewModel.salesOrderDetails[i].shippedQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].shippedQuantityFormatted;

    this.salesOrderViewModel.salesOrderDetails[i].editCurrentShippedQuantity = false;

    this.salesOrderViewModel.salesOrderDetails[i].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = true;
    this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = false;
    this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = false;

    this.setEnableSubmitButton();

  }

  private updateLineItemSuccess(response: SalesOrderDetailViewModelResponse) {

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].editCurrentShippedQuantity = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableAddButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableSaveButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableCancelButton = true;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableDeleteButton = false;
    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableEditButton = false;

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].shippedQuantityFormatted =
      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].shippedQuantity.toFixed(0);

      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].currentShippedQuantityFormatted  = '';

    this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPriceFormatted =
      this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPrice.toFixed(2);

    this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
    this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully updated.';
    this.alertService.ShowSuccessMessage(message);

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
    if (this.salesOrderViewModel.orderTotal > 0 && this.salesOrderViewModel.salesOrderStatusDescription === 'Open') {
      this.disableSubmitButton = false;
    }
  }

  private disableSalesOrderButtons() {

  }

}

