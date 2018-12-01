
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerViewModelResponse } from './../view-models/customer-response.viewmodel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { CustomerInquiryViewModelResponse } from '../view-models/customer-inquiry-response.viewmodel';
import { CustomerViewModel } from '../view-models/customer.viewmodel';
import { CustomerInquiryViewModel } from '../view-models/customer-inquiry.viewmodel';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { MatSort } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-inquiry',
  templateUrl: './customer-inquiry.component.html',
  styleUrls: ['./customer-inquiry.component.css']
})

export class CustomerInquiryComponent implements OnInit {

  @ViewChild('form') searchForm: NgForm;

  public customerInquiryViewModel: CustomerInquiryViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, private sessionService: SessionService, private httpService: HttpService,
     private alertService: AlertService) {

    this.sessionService.moduleLoadedEvent.emit();

    this.customerInquiryViewModel = new CustomerInquiryViewModel();
    this.customerInquiryViewModel.pageSize = 20;

    this.customerInquiryViewModel.displayedColumns = ['customerName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
    this.customerInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];

    this.initializeSearch();
 }

  ngOnInit() {

    this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
      changes => {
          this.customerInquiryViewModel.currentPageNumber = 1;
          this.customerInquiryViewModel.currentPageIndex = 0;
          if (this.lastSearchValue !== this.customerInquiryViewModel.customerName) {
            this.executeSearch();
          }
        }
      );

    this.executeSearch();

  }

  private initializeSearch() {

    this.customerInquiryViewModel.customerName = '';
    this.customerInquiryViewModel.currentPageNumber = 1;
    this.customerInquiryViewModel.currentPageIndex = 0;
    this.customerInquiryViewModel.totalPages = 0;
    this.customerInquiryViewModel.totalCustomers = 0;
    this.customerInquiryViewModel.sortDirection = '';
    this.customerInquiryViewModel.sortExpression = '';

    this.customerInquiryViewModel.customers = new Array<CustomerViewModel>();

  }

  private executeSearch() {
    let url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/customerinquiry';
    this.httpService.HttpPost<CustomerInquiryViewModelResponse>(url, this.customerInquiryViewModel).
        subscribe((response: CustomerInquiryViewModelResponse) => {this.customerInquirySuccess(response);
    }, response => this.customerInquiryFailed(response));
  }

  private customerInquirySuccess(response: CustomerInquiryViewModelResponse) {
    this.customerInquiryViewModel.customers = response.entity;
    this.customerInquiryViewModel.totalCustomers = response.totalRows;
    this.customerInquiryViewModel.totalPages = response.totalPages;
  }

  private customerInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: CustomerViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.customerInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.customerInquiryViewModel.currentPageIndex = event.pageIndex;
    this.customerInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.customerInquiryViewModel.currentPageNumber = 1;
    this.customerInquiryViewModel.currentPageIndex = 0;
    this.customerInquiryViewModel.sortDirection = sort.direction;
    this.customerInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.customerInquiryViewModel.customerName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  public selectCustomer(row){
    let customerId = this.customerInquiryViewModel.customers[row].customerId;
    this.router.navigate(['/salesordermanagement/customer-maintenance'], { queryParams: { id: customerId } });
  }

}

