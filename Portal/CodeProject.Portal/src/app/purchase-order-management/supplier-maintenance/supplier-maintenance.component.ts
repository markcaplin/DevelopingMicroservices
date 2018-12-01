
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { SessionService } from './../../shared-components-services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupplierViewModel } from '../view-models/supplier.viewmodel';
import { SupplierViewModelResponse } from '../view-models/supplier-response.viewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PurchaseOrderViewModel } from '../view-models/purchase-order.viewmodel';
import { PurchaseOrderViewModelResponse } from '../view-models/purchase-order-response.viewmodel';

@Component({
  selector: 'app-supplier-maintenance',
  templateUrl: './supplier-maintenance.component.html',
  styleUrls: ['./supplier-maintenance.component.css']
})
export class SupplierMaintenanceComponent implements OnInit, OnDestroy {

  public supplierViewModel: SupplierViewModel;
  public createMode: Boolean;
  public readonlyMode: Boolean;

  private routerSubscription: Subscription;


  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService,
    private alertService: AlertService, private httpService: HttpService) {

    this.supplierViewModel = new SupplierViewModel();
    this.supplierViewModel.supplierName = '';
    this.supplierViewModel.addressLine1 = '';
    this.supplierViewModel.addressLine2 = '';
    this.supplierViewModel.city = '';
    this.supplierViewModel.region = '';
    this.supplierViewModel.postalCode = '';
    this.supplierViewModel.supplierId = 0;

    this.createMode = true;
    this.readonlyMode = false;

  }

  ngOnInit() {

    this.routerSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.supplierViewModel.supplierId = +params['id'] || 0;
        if (this.supplierViewModel.supplierId > 0) {
            this.createMode = false;
            this.readonlyMode = true;
            this.getSupplierInformation();
        }
      });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private getSupplierInformation() {
    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/getsupplier';
    this.httpService.HttpPost<SupplierViewModelResponse>(url, this.supplierViewModel).subscribe((response: SupplierViewModelResponse) => {
      this.getSupplierSuccess(response);
    }, response => this.getSupplierFailed(response));

  }

  private initializeSupplier() {
    this.supplierViewModel = new SupplierViewModel();
    this.supplierViewModel.supplierName = '';
    this.supplierViewModel.addressLine1 = '';
    this.supplierViewModel.addressLine2 = '';
    this.supplierViewModel.city = '';
    this.supplierViewModel.region = '';
    this.supplierViewModel.postalCode = '';
    this.supplierViewModel.supplierId = 0;
  }

  public createNewSupplier() {
    this.readonlyMode = false;
    this.initializeSupplier();
  }

  private getSupplierSuccess(response: SupplierViewModelResponse) {
    this.supplierViewModel = response.entity;
  }

  private getSupplierFailed(error: HttpErrorResponse) {

    let errorResponse: SupplierViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public createOrUpdateSupplier() {

    let supplier = new SupplierViewModel();
    supplier = this.supplierViewModel;

    let url = '';

    if (supplier.supplierId === 0) {
      url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl +   'supplier/createsupplier';
    } else {
      url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl +   'supplier/updatesupplier';
    }

    this.httpService.HttpPost<SupplierViewModelResponse>(url, supplier).subscribe((response: SupplierViewModelResponse) => {
      this.createOrUpdateSupplierSuccess(response);
    }, response => this.createOrUpdateSupplierFailed(response));

  }

  private createOrUpdateSupplierSuccess(response: SupplierViewModelResponse) {

    let supplierViewModel: SupplierViewModel = response.entity;
    this.supplierViewModel.supplierId = supplierViewModel.supplierId;
    const message = 'Supplier successfully saved.';
    this.alertService.ShowSuccessMessage(message);

    this.createMode = false;
    this.readonlyMode = true;

  }

  private createOrUpdateSupplierFailed(error: HttpErrorResponse) {

    let errorResponse: SupplierViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private editSupplier() {
    this.createMode = false;
    this.readonlyMode = false;
  }

  public createPurchaseOrder() {

    let purchaseOrderViewModel = new PurchaseOrderViewModel();
    purchaseOrderViewModel.supplierId = this.supplierViewModel.supplierId;

    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/createpurchaseorder';
    this.httpService.HttpPost<PurchaseOrderViewModelResponse>(url, purchaseOrderViewModel)
    .subscribe((response: PurchaseOrderViewModelResponse) => {
      this.createPurchaseOrderSuccess(response);
    }, response => this.createPurchaseOrderFailed(response));

  }

  private createPurchaseOrderSuccess(response: PurchaseOrderViewModelResponse) {
    let purchaseOrderId = response.entity.purchaseOrderId;
    this.router.navigate(['/purchaseordermanagement/purchase-order-maintenance'], { queryParams: { id: purchaseOrderId } });
  }

  private createPurchaseOrderFailed(error: HttpErrorResponse) {
    let errorResponse: SupplierViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

}

