
import { HttpErrorResponse } from '@angular/common/http';
import { SupplierViewModelResponse } from './../view-models/supplier-response.viewmodel';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionService } from '../../shared-components-services/session.service';
import { SupplierInquiryViewModelResponse } from '../view-models/supplier-inquiry-response.viewmodel';
import { SupplierViewModel } from '../view-models/supplier.viewmodel';
import { SupplierInquiryViewModel } from '../view-models/supplier-inquiry.viewmodel';
import { HttpService } from './../../shared-components-services/http.service';
import { AlertService } from './../../shared-components-services/alert.service';
import { MatSort } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-inquiry',
  templateUrl: './supplier-inquiry.component.html',
  styleUrls: ['./supplier-inquiry.component.css']
})

export class SupplierInquiryComponent implements OnInit {

  @ViewChild('form') searchForm: NgForm;

  public supplierInquiryViewModel: SupplierInquiryViewModel;
  public selectedRowIndex = -1;
  private lastSearchValue: string;

  constructor(private router: Router, private sessionService: SessionService, private httpService: HttpService,
     private alertService: AlertService) {

    this.sessionService.moduleLoadedEvent.emit();

    this.supplierInquiryViewModel = new SupplierInquiryViewModel();
    this.supplierInquiryViewModel.pageSize = 20;

    this.supplierInquiryViewModel.displayedColumns = ['supplierName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
    this.supplierInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];

    this.initializeSearch();
 }

  ngOnInit() {

    this.searchForm.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(
      changes => {
          this.supplierInquiryViewModel.currentPageNumber = 1;
          this.supplierInquiryViewModel.currentPageIndex = 0;
          if (this.lastSearchValue !== this.supplierInquiryViewModel.supplierName) {
            this.executeSearch();
          }
        }
      );

    this.executeSearch();

  }

  private initializeSearch() {

    this.supplierInquiryViewModel.supplierName = '';
    this.supplierInquiryViewModel.currentPageNumber = 1;
    this.supplierInquiryViewModel.currentPageIndex = 0;
    this.supplierInquiryViewModel.totalPages = 0;
    this.supplierInquiryViewModel.totalSuppliers = 0;
    this.supplierInquiryViewModel.sortDirection = '';
    this.supplierInquiryViewModel.sortExpression = '';

    this.supplierInquiryViewModel.suppliers = new Array<SupplierViewModel>();

  }

  private executeSearch() {
    let url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/supplierinquiry';
    this.httpService.HttpPost<SupplierInquiryViewModelResponse>(url, this.supplierInquiryViewModel).
        subscribe((response: SupplierInquiryViewModelResponse) => {this.supplierInquirySuccess(response);
    }, response => this.supplierInquiryFailed(response));
  }

  private supplierInquirySuccess(response: SupplierInquiryViewModelResponse) {
    this.supplierInquiryViewModel.suppliers = response.entity;
    this.supplierInquiryViewModel.totalSuppliers = response.totalRows;
    this.supplierInquiryViewModel.totalPages = response.totalPages;
  }

  private supplierInquiryFailed(error: HttpErrorResponse) {
    let errorResponse: SupplierViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }

  public onPaginateChange(event) {
    this.supplierInquiryViewModel.currentPageNumber = event.pageIndex + 1;
    this.supplierInquiryViewModel.currentPageIndex = event.pageIndex;
    this.supplierInquiryViewModel.pageSize = event.pageSize;
    this.executeSearch();
  }

  public sortData(sort: MatSort) {
    this.supplierInquiryViewModel.currentPageNumber = 1;
    this.supplierInquiryViewModel.currentPageIndex = 0;
    this.supplierInquiryViewModel.sortDirection = sort.direction;
    this.supplierInquiryViewModel.sortExpression = sort.active;
    this.executeSearch();
  }

  public resetSearch() {
    this.lastSearchValue = '';
    this.supplierInquiryViewModel.supplierName = '';
    this.initializeSearch();
    this.executeSearch();
  }

  public selectSupplier(row){
    let supplierId = this.supplierInquiryViewModel.suppliers[row].supplierId;
    this.router.navigate(['/purchaseordermanagement/supplier-maintenance'], { queryParams: { id: supplierId } });
  }

}
