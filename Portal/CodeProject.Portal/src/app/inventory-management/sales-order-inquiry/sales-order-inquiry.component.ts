import { HttpErrorResponse } from '@angular/common/http';
import { SalesOrderViewModelResponse } from './../view-models/sales-order-response.viewmodel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { SalesOrderInquiryViewModelResponse } from '../view-models/sales-order-inquiry-response.viewmodel';
import { SalesOrderViewModel } from '../view-models/sales-order.viewmodel';
import { SalesOrderInquiryViewModel } from '../view-models/sales-order-inquiry.viewmodel';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { MatSort } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-order-inquiry',
  templateUrl: './sales-order-inquiry.component.html',
  styleUrls: ['./sales-order-inquiry.component.css']
})

export class SalesOrderInquiryComponent implements OnInit {

  @ViewChild('form') searchForm: NgForm;

  public salesOrderInquiryViewModel: SalesOrderInquiryViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, 
    private sessionService: SessionService, 
    private httpService: HttpService, 
    private alertService: AlertService) {

    this.sessionService.moduleLoadedEvent.emit();

    this.salesOrderInquiryViewModel = new SalesOrderInquiryViewModel();
    this.salesOrderInquiryViewModel.pageSize = 20;

    this.salesOrderInquiryViewModel.displayedColumns = ['salesOrderNumber', 'customerName',
     'city', 'region', 'orderTotal', 'orderDate', 'salesOrderStatusDescription'];
    this.salesOrderInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];

    this.initializeSearch();

 }

  ngOnInit() {

    this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
      changes => {
          this.salesOrderInquiryViewModel.currentPageNumber = 1;
          this.salesOrderInquiryViewModel.currentPageIndex = 0;

          if (this.lastSearchValue !== this.salesOrderInquiryViewModel.customerName) {
            this.executeSearch();
          }
        }
      );

    this.executeSearch();

  }

  private initializeSearch() {

    this.salesOrderInquiryViewModel.customerName = '';
    this.salesOrderInquiryViewModel.currentPageNumber = 1;
    this.salesOrderInquiryViewModel.currentPageIndex = 0;
    this.salesOrderInquiryViewModel.totalPages = 0;
    this.salesOrderInquiryViewModel.totalSalesOrders = 0;
    this.salesOrderInquiryViewModel.sortDirection = 'DESC';
    this.salesOrderInquiryViewModel.sortExpression = 'SalesOrderNumber';

    this.salesOrderInquiryViewModel.salesOrders = new Array<SalesOrderViewModel>();

  }

  private executeSearch() {
    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/salesorderinquiry';
    this.httpService.HttpPost<SalesOrderInquiryViewModelResponse>(url, this.salesOrderInquiryViewModel).
        subscribe((response: SalesOrderInquiryViewModelResponse) => {this.salesOrderInquirySuccess(response);
    }, response => this.salesOrderInquiryFailed(response));
  }

  private salesOrderInquirySuccess(response: SalesOrderInquiryViewModelResponse) {
    response.entity.forEach(element => {
      let orderDate = element.dateCreated.toString().substring(0, 10);
      element.orderDate = orderDate.substring(5, 7) + '/' + orderDate.substring(8, 10) + '/' + orderDate.substring(0, 4);
    });
    this.salesOrderInquiryViewModel.salesOrders = response.entity;
    this.salesOrderInquiryViewModel.totalSalesOrders = response.totalRows;
    this.salesOrderInquiryViewModel.totalPages = response.totalPages;
  }

  private salesOrderInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: SalesOrderViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.salesOrderInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.salesOrderInquiryViewModel.currentPageIndex = event.pageIndex;
    this.salesOrderInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.salesOrderInquiryViewModel.currentPageNumber = 1;
    this.salesOrderInquiryViewModel.currentPageIndex = 0;
    this.salesOrderInquiryViewModel.sortDirection = sort.direction;
    this.salesOrderInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.salesOrderInquiryViewModel.customerName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  public selectSalesOrder(row) {
    let salesOrderId = this.salesOrderInquiryViewModel.salesOrders[row].salesOrderId;
    this.router.navigate(['/inventorymanagement/sales-order-shipping'], { queryParams: { id: salesOrderId } });
  }

}


