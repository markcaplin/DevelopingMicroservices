
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { SessionService } from './../../shared-components-services/session.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerViewModel } from '../view-models/customer.viewmodel';
import { CustomerViewModelResponse } from '../view-models/customer-response.viewmodel';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SalesOrderViewModel } from '../view-models/sales-order.viewmodel';
import { SalesOrderViewModelResponse } from '../view-models/sales-order-response.viewmodel';

@Component({
  selector: 'app-customer-maintenance',
  templateUrl: './customer-maintenance.component.html',
  styleUrls: ['./customer-maintenance.component.css']
})
export class CustomerMaintenanceComponent implements OnInit, OnDestroy {

  public customerViewModel: CustomerViewModel;
  public createMode: Boolean;
  public readonlyMode: Boolean;

  private routerSubscription: Subscription;


  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService,
    private alertService: AlertService, private httpService: HttpService) {

    this.customerViewModel = new CustomerViewModel();
    this.customerViewModel.customerName = '';
    this.customerViewModel.addressLine1 = '';
    this.customerViewModel.addressLine2 = '';
    this.customerViewModel.city = '';
    this.customerViewModel.region = '';
    this.customerViewModel.postalCode = '';
    this.customerViewModel.customerId = 0;

    this.createMode = true;
    this.readonlyMode = false;

  }

  ngOnInit() {

    this.routerSubscription = this.route
      .queryParams
      .subscribe(params => {
        this.customerViewModel.customerId = +params['id'] || 0;
        if (this.customerViewModel.customerId > 0) {
            this.createMode = false;
            this.readonlyMode = true;
            this.getCustomerInformation();
        }
      });

  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private getCustomerInformation() {
    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/getcustomer';
    this.httpService.HttpPost<CustomerViewModelResponse>(url, this.customerViewModel).subscribe((response: CustomerViewModelResponse) => {
      this.getCustomerSuccess(response);
    }, response => this.getCustomerFailed(response));

  }

  private initializeCustomer() {
    this.customerViewModel = new CustomerViewModel();
    this.customerViewModel.customerName = '';
    this.customerViewModel.addressLine1 = '';
    this.customerViewModel.addressLine2 = '';
    this.customerViewModel.city = '';
    this.customerViewModel.region = '';
    this.customerViewModel.postalCode = '';
    this.customerViewModel.customerId = 0;
  }

  public createNewCustomer() {
    this.readonlyMode = false;
    this.initializeCustomer();
  }

  private getCustomerSuccess(response: CustomerViewModelResponse) {
    this.customerViewModel = response.entity;
  }

  private getCustomerFailed(error: HttpErrorResponse) {

    let errorResponse: CustomerViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  public createOrUpdateCustomer() {

    let customer = new CustomerViewModel();
    customer = this.customerViewModel;

    let url = '';

    if (customer.customerId === 0) {
      url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/createcustomer';
    } else {
      url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/updatecustomer';
    }

    this.httpService.HttpPost<CustomerViewModelResponse>(url, customer).subscribe((response: CustomerViewModelResponse) => {
      this.createOrUpdateCustomerSuccess(response);
    }, response => this.createOrUpdateCustomerFailed(response));

  }

  private createOrUpdateCustomerSuccess(response: CustomerViewModelResponse) {

    let customerViewModel: CustomerViewModel = response.entity;
    this.customerViewModel.customerId = customerViewModel.customerId;
    const message = 'Customer successfully saved.';
    this.alertService.ShowSuccessMessage(message);

    this.createMode = false;
    this.readonlyMode = true;

  }

  private createOrUpdateCustomerFailed(error: HttpErrorResponse) {

    let errorResponse: CustomerViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }

  }

  private editCustomer() {
    this.createMode = false;
    this.readonlyMode = false;
  }

  public createSalesOrder() {

    let salesOrderViewModel = new SalesOrderViewModel();
    salesOrderViewModel.customerId = this.customerViewModel.customerId;

    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/createsalesorder';
    this.httpService.HttpPost<SalesOrderViewModelResponse>(url, salesOrderViewModel)
    .subscribe((response: SalesOrderViewModelResponse) => {
      this.createSalesOrderSuccess(response);
    }, response => this.createSalesOrderFailed(response));

  }

  private createSalesOrderSuccess(response: SalesOrderViewModelResponse) {
    let salesOrderId = response.entity.salesOrderId;
    this.router.navigate(['/salesordermanagement/sales-order-maintenance'], { queryParams: { id: salesOrderId } });
  }

  private createSalesOrderFailed(error: HttpErrorResponse) {
    let errorResponse: CustomerViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

}

