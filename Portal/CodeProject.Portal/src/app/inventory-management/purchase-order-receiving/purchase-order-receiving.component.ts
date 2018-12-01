import { PurchaseOrderDetailViewModel } from './../view-models/purchase-order-detail.viewmodel';
import { AlertService } from './../../shared-components-services/alert.service';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { PurchaseOrderViewModel } from '../view-models/purchase-order.viewmodel';
import { PurchaseOrderViewModelResponse } from '../view-models/purchase-order-response.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from '../../shared-components-services/http.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseOrderDetailViewModelResponse } from '../view-models/purchase-order-detail-response.viewmodel';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-purchase-order-receiving',
  templateUrl: './purchase-order-receiving.component.html',
  styleUrls: ['./purchase-order-receiving.component.css']
})
export class PurchaseOrderReceivingComponent implements OnInit, OnDestroy {

  public purchaseOrderViewModel: PurchaseOrderViewModel;
  private routerSubscription: Subscription;
  public detailDataSource = new MatTableDataSource<PurchaseOrderDetailViewModel>();
  private currentLineItem: number;
  public disableSubmitButton: boolean;

  constructor(public dialog: MatDialog, private router: Router, private httpService: HttpService, private route: ActivatedRoute,
    private sessionService: SessionService, private alertService: AlertService) {

    this.disableSubmitButton = true;
    this.purchaseOrderViewModel = new PurchaseOrderViewModel();

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

    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'purchaseorder/getpurchaseorder';
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
      purchaseOrderDetailViewModel.receivedQuantityFormatted = element.receivedQuantity.toFixed(0);
      purchaseOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
      purchaseOrderDetailViewModel.editCurrentReceivedQuantity = false;
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
      purchaseOrderDetailViewModelOriginalValues.unitPrice = element.unitPrice;
      purchaseOrderDetailViewModelOriginalValues.orderQuantity = element.orderQuantity;
      purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted = element.orderQuantity.toFixed(0);
      purchaseOrderDetailViewModelOriginalValues.receivedQuantityFormatted = element.receivedQuantity.toFixed(0);
      purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);

      this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);

    });

    this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;

    this.purchaseOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice',
      'orderQuantity', 'receivedQuantity', 'currentReceivedQuantity', 'actions'];

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

  private getProductFailed(error: HttpErrorResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
    let errorResponse: PurchaseOrderViewModelResponse = error.error;

    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public editLineItem(i: number) {

    this.purchaseOrderViewModel.purchaseOrderDetails[i].editCurrentReceivedQuantity = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = true;

    let purchaseOrderDetailViewModelOriginalValues = new PurchaseOrderDetailViewModel();

    purchaseOrderDetailViewModelOriginalValues.unitPrice =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice;

    purchaseOrderDetailViewModelOriginalValues.orderQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity;

    purchaseOrderDetailViewModelOriginalValues.receivedQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].receivedQuantity;

    purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity.toFixed(0);

    purchaseOrderDetailViewModelOriginalValues.receivedQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[i].receivedQuantity.toFixed(0);

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
    purchaseOrderDetailViewModel.currentReceivedQuantity =
      parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].currentReceivedQuantityFormatted, 0);

    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'purchaseorder/updatepurchaseorderdetail';
    this.httpService.HttpPost<PurchaseOrderDetailViewModelResponse>(url, purchaseOrderDetailViewModel)
      .subscribe((response: PurchaseOrderDetailViewModelResponse) => {
        this.updateLineItemSuccess(response);
      }, response => this.updateLineItemFailed(response));

  }

  private cancelEdit(i: number) {

    this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPrice;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPriceFormatted;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantity;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].receivedQuantity =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].receivedQuantity;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].currentReceivedQuantity = 0;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].currentReceivedQuantityFormatted = '';

    this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantityFormatted;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].receivedQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].receivedQuantityFormatted;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].editCurrentReceivedQuantity = false;

    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = false;

    this.setEnableSubmitButton();

  }

  private updateLineItemSuccess(response: PurchaseOrderDetailViewModelResponse) {

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editCurrentReceivedQuantity = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableAddButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableSaveButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableCancelButton = true;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableDeleteButton = false;
    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableEditButton = false;

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].receivedQuantityFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].receivedQuantity.toFixed(0);

      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].currentReceivedQuantityFormatted  = '';

    this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted =
      this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice.toFixed(2);

    this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
    this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);

    this.setEnableSubmitButton();

    const message = 'Line Item successfully updated.';
    this.alertService.ShowSuccessMessage(message);

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
    if (this.purchaseOrderViewModel.orderTotal > 0 && this.purchaseOrderViewModel.purchaseOrderStatusDescription === 'Open') {
      this.disableSubmitButton = false;
    }
  }

  private disablePurchaseOrderButtons() {

  }

}

