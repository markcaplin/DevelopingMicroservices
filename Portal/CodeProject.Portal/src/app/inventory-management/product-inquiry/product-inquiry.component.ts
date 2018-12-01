import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseOrderViewModelResponse } from './../view-models/purchase-order-response.viewmodel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { ProductInquiryViewModelResponse } from '../view-models/product-inquiry-response.viewmodel';
import { ProductViewModel } from './../view-models/product.viewmodel';
import { ProductInquiryViewModel } from './/../view-models/product-inquiry.viewmodel';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { MatSort } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-inquiry',
  templateUrl: './product-inquiry.component.html',
  styleUrls: ['./product-inquiry.component.css']
})

export class ProductInquiryComponent implements OnInit {

  @ViewChild('form') searchForm: NgForm;

  public productInquiryViewModel: ProductInquiryViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router,
    private sessionService: SessionService,
    private httpService: HttpService,
    private alertService: AlertService) {

    this.sessionService.moduleLoadedEvent.emit();

    this.productInquiryViewModel = new ProductInquiryViewModel();
    this.productInquiryViewModel.pageSize = 20;

    this.productInquiryViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice'];
    this.productInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
    this.productInquiryViewModel.products = new Array<ProductViewModel>();
    this.lastSearchValue = '';

    this.initializeSearch();

  }

  ngOnInit() {

    this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
      changes => {
        this.productInquiryViewModel.currentPageNumber = 1;
        this.productInquiryViewModel.currentPageIndex = 0;
        if (this.lastSearchValue !== this.productInquiryViewModel.productNumber) {
          this.executeSearch();
        }
      }
    );

    this.executeSearch();

  }

  private initializeSearch() {

    this.productInquiryViewModel.productNumber = '';
    this.productInquiryViewModel.currentPageNumber = 1;
    this.productInquiryViewModel.currentPageIndex = 0;
    this.productInquiryViewModel.totalPages = 0;
    this.productInquiryViewModel.totalProducts = 0;
    this.productInquiryViewModel.sortDirection = 'ASC';
    this.productInquiryViewModel.sortExpression = 'ProductNumber';
    this.productInquiryViewModel.products = new Array<ProductViewModel>();

  }

  private executeSearch() {
    this.lastSearchValue = this.productInquiryViewModel.productNumber;
    let url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/productinquiry';
    this.httpService.HttpPost<ProductInquiryViewModelResponse>(url, this.productInquiryViewModel).
      subscribe((response: ProductInquiryViewModelResponse) => {
        this.productInquirySuccess(response);
      }, response => this.productInquiryFailed(response));
  }

  private productInquirySuccess(response: ProductInquiryViewModelResponse) {

    this.productInquiryViewModel.products = response.entity;
    this.productInquiryViewModel.totalProducts = response.totalRows;
    this.productInquiryViewModel.totalPages = response.totalPages;
  }

  private productInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: PurchaseOrderViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.productInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.productInquiryViewModel.currentPageIndex = event.pageIndex;
    this.productInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.productInquiryViewModel.currentPageNumber = 1;
    this.productInquiryViewModel.currentPageIndex = 0;
    this.productInquiryViewModel.sortDirection = sort.direction;
    this.productInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.productInquiryViewModel.productNumber = '';
    this.initializeSearch();
    this.executeSearch();
  }

  public selectProduct(row) {
    let productId = this.productInquiryViewModel.products[row].productId;
    this.router.navigate(['/inventorymanagement/product-maintenance'], { queryParams: { id: productId } });
  }

}


