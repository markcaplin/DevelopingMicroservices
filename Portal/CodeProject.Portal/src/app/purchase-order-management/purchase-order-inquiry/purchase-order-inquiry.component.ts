
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseOrderViewModelResponse } from './../view-models/purchase-order-response.viewmodel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { PurchaseOrderInquiryViewModelResponse } from '../view-models/purchase-order-inquiry-response.viewmodel';
import { PurchaseOrderViewModel } from '../view-models/purchase-order.viewmodel';
import { PurchaseOrderInquiryViewModel } from '../view-models/purchase-order-inquiry.viewmodel';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { MatSort } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-purchase-order-inquiry',
  templateUrl: './purchase-order-inquiry.component.html',
  styleUrls: ['./purchase-order-inquiry.component.css']
})

export class PurchaseOrderInquiryComponent implements OnInit {

  @ViewChild('form') searchForm: NgForm;

  public purchaseOrderInquiryViewModel: PurchaseOrderInquiryViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, private sessionService: SessionService, private httpService: HttpService, 
    private alertService: AlertService) {

    this.sessionService.moduleLoadedEvent.emit();

    this.purchaseOrderInquiryViewModel = new PurchaseOrderInquiryViewModel();
    this.purchaseOrderInquiryViewModel.pageSize = 20;

    this.purchaseOrderInquiryViewModel.displayedColumns = ['purchaseOrderNumber', 'supplierName',
     'city', 'region', 'orderTotal', 'orderDate', 'purchaseOrderStatusDescription'];
    this.purchaseOrderInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];

    this.initializeSearch();

 }

  ngOnInit() {

    this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
      changes => {
          this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
          this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
          if (this.lastSearchValue !== this.purchaseOrderInquiryViewModel.supplierName) {
            this.executeSearch();
          }
        }
      );

    this.executeSearch();

  }

  private initializeSearch() {

    this.purchaseOrderInquiryViewModel.supplierName = '';
    this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
    this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
    this.purchaseOrderInquiryViewModel.totalPages = 0;
    this.purchaseOrderInquiryViewModel.totalPurchaseOrders = 0;
    this.purchaseOrderInquiryViewModel.sortDirection = 'DESC';
    this.purchaseOrderInquiryViewModel.sortExpression = 'PurchaseOrderNumber';

    this.purchaseOrderInquiryViewModel.purchaseOrders = new Array<PurchaseOrderViewModel>();

  }

  private executeSearch() {
    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/purchaseorderinquiry';
    this.httpService.HttpPost<PurchaseOrderInquiryViewModelResponse>(url, this.purchaseOrderInquiryViewModel).
        subscribe((response: PurchaseOrderInquiryViewModelResponse) => {this.purchaseOrderInquirySuccess(response);
    }, response => this.purchaseOrderInquiryFailed(response));
  }

  private purchaseOrderInquirySuccess(response: PurchaseOrderInquiryViewModelResponse) {
    response.entity.forEach(element => {
      let orderDate = element.dateCreated.toString().substring(0, 10);
      element.orderDate = orderDate.substring(5, 7) + '/' + orderDate.substring(8, 10) + '/' + orderDate.substring(0, 4);
    });
    this.purchaseOrderInquiryViewModel.purchaseOrders = response.entity;
    this.purchaseOrderInquiryViewModel.totalPurchaseOrders = response.totalRows;
    this.purchaseOrderInquiryViewModel.totalPages = response.totalPages;
  }

  private purchaseOrderInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: PurchaseOrderViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.purchaseOrderInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.purchaseOrderInquiryViewModel.currentPageIndex = event.pageIndex;
    this.purchaseOrderInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
    this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
    this.purchaseOrderInquiryViewModel.sortDirection = sort.direction;
    this.purchaseOrderInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.purchaseOrderInquiryViewModel.supplierName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  public selectPurchaseOrder(row) {
    let purchaseOrderId = this.purchaseOrderInquiryViewModel.purchaseOrders[row].purchaseOrderId;
    this.router.navigate(['/purchaseordermanagement/purchase-order-maintenance'], { queryParams: { id: purchaseOrderId } });
  }

}

