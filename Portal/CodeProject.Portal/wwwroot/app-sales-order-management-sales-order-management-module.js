(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-sales-order-management-sales-order-management-module"],{

/***/ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.css":
/*!****************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.css ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.html":
/*!*****************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-sales-order-management-nav-bar></app-sales-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Customer Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{customerInquiryViewModel.customerName}}\"\n           [(ngModel)]=\"customerInquiryViewModel.customerName\"\n            placeholder=\"Customer Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"customerInquiryViewModel.totalCustomers\" [showFirstLastButtons]=\"true\" [pageIndex]=\"customerInquiryViewModel.currentPageIndex\"\n      [pageSize]=\"customerInquiryViewModel.pageSize\" [pageSizeOptions]=\"customerInquiryViewModel.pageSizeOptions\"\n      (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table class=\"table\" mat-table [dataSource]=\"customerInquiryViewModel.customers\" matSort (matSortChange)=\"sortData($event)\" class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"customerName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"CustomerName\">\n            Customer Name\n         </th>\n        <td mat-cell *matCellDef=\"let element\">\n           <span class=\"table-responsive-custom\">Customer Name:&nbsp;</span>\n          {{element.customerName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"addressLine1\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"AddressLine1\"> Address Line 1 </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Address Line 1:&nbsp;</span>\n          {{element.addressLine1}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"addressLine2\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"AddressLine2\"> Address Line 2 </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Address Line 2:&nbsp;</span>\n          {{element.addressLine2}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <span class=\"table-responsive-custom\">City:&nbsp;</span>\n          {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">State:&nbsp;</span>\n           {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"postalCode\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PostalCode\"> Postal Code </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Postal Code:&nbsp;</span>\n           {{element.postalCode}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"customerInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: customerInquiryViewModel.displayedColumns; let i = index\" (click)=\"selectCustomer(i)\"></tr>\n  \n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"customerInquiryViewModel.totalCustomers\" [showFirstLastButtons]=\"true\" [pageSize]=\"customerInquiryViewModel.pageSize\"\n      [pageIndex]=\"customerInquiryViewModel.currentPageIndex\" [pageSizeOptions]=\"customerInquiryViewModel.pageSizeOptions\"\n      (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.ts":
/*!***************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.ts ***!
  \***************************************************************************************/
/*! exports provided: CustomerInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerInquiryComponent", function() { return CustomerInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_customer_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/customer-inquiry.viewmodel */ "./src/app/sales-order-management/view-models/customer-inquiry.viewmodel.ts");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CustomerInquiryComponent = /** @class */ (function () {
    function CustomerInquiryComponent(router, sessionService, httpService, alertService) {
        this.router = router;
        this.sessionService = sessionService;
        this.httpService = httpService;
        this.alertService = alertService;
        this.selectedRowIndex = -1;
        this.sessionService.moduleLoadedEvent.emit();
        this.customerInquiryViewModel = new _view_models_customer_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__["CustomerInquiryViewModel"]();
        this.customerInquiryViewModel.pageSize = 20;
        this.customerInquiryViewModel.displayedColumns = ['customerName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
        this.customerInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
        this.initializeSearch();
    }
    CustomerInquiryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (changes) {
            _this.customerInquiryViewModel.currentPageNumber = 1;
            _this.customerInquiryViewModel.currentPageIndex = 0;
            if (_this.lastSearchValue !== _this.customerInquiryViewModel.customerName) {
                _this.executeSearch();
            }
        });
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.initializeSearch = function () {
        this.customerInquiryViewModel.customerName = '';
        this.customerInquiryViewModel.currentPageNumber = 1;
        this.customerInquiryViewModel.currentPageIndex = 0;
        this.customerInquiryViewModel.totalPages = 0;
        this.customerInquiryViewModel.totalCustomers = 0;
        this.customerInquiryViewModel.sortDirection = '';
        this.customerInquiryViewModel.sortExpression = '';
        this.customerInquiryViewModel.customers = new Array();
    };
    CustomerInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/customerinquiry';
        this.httpService.HttpPost(url, this.customerInquiryViewModel).
            subscribe(function (response) {
            _this.customerInquirySuccess(response);
        }, function (response) { return _this.customerInquiryFailed(response); });
    };
    CustomerInquiryComponent.prototype.customerInquirySuccess = function (response) {
        this.customerInquiryViewModel.customers = response.entity;
        this.customerInquiryViewModel.totalCustomers = response.totalRows;
        this.customerInquiryViewModel.totalPages = response.totalPages;
    };
    CustomerInquiryComponent.prototype.customerInquiryFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    CustomerInquiryComponent.prototype.onPaginateChange = function (event) {
        this.customerInquiryViewModel.currentPageNumber = event.pageIndex + 1;
        this.customerInquiryViewModel.currentPageIndex = event.pageIndex;
        this.customerInquiryViewModel.pageSize = event.pageSize;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.sortData = function (sort) {
        this.customerInquiryViewModel.currentPageNumber = 1;
        this.customerInquiryViewModel.currentPageIndex = 0;
        this.customerInquiryViewModel.sortDirection = sort.direction;
        this.customerInquiryViewModel.sortExpression = sort.active;
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.resetSearch = function () {
        this.lastSearchValue = '';
        this.customerInquiryViewModel.customerName = '';
        this.initializeSearch();
        this.executeSearch();
    };
    CustomerInquiryComponent.prototype.selectCustomer = function (row) {
        var customerId = this.customerInquiryViewModel.customers[row].customerId;
        this.router.navigate(['/salesordermanagement/customer-maintenance'], { queryParams: { id: customerId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], CustomerInquiryComponent.prototype, "searchForm", void 0);
    CustomerInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customer-inquiry',
            template: __webpack_require__(/*! ./customer-inquiry.component.html */ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./customer-inquiry.component.css */ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], CustomerInquiryComponent);
    return CustomerInquiryComponent;
}());



/***/ }),

/***/ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-sales-order-management-nav-bar></app-sales-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Customer Maintenance</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"CustomerName\" value=\"{{customerViewModel.customerName}}\" \n          [(ngModel)]=\"customerViewModel.customerName\" placeholder=\"Customer Name\">\n        </mat-form-field>\n      </div>\n\n      \n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"AddressLine1\" value=\"{{customerViewModel.AddressLine1}}\" \n          [(ngModel)]=\"customerViewModel.addressLine1\" placeholder=\"Address Line 1\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"AddressLine2\" value=\"{{customerViewModel.AddressLine2}}\" \n          [(ngModel)]=\"customerViewModel.addressLine2\" placeholder=\"Address Line 2\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"City\" value=\"{{customerViewModel.city}}\" \n          [(ngModel)]=\"customerViewModel.city\" placeholder=\"City\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"Region\" value=\"{{customerViewModel.region}}\" \n          [(ngModel)]=\"customerViewModel.region\" placeholder=\"State/Region\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"PostalCode\" value=\"{{customerViewModel.postalCode}}\" \n          [(ngModel)]=\"customerViewModel.postalCode\" placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n    <button [disabled]=\"readonlyMode==false\" mat-flat-button color=\"primary\" (click)=\"editCustomer()\">Edit Customer</button>&nbsp;\n    <button [disabled]=\"readonlyMode==true\" mat-flat-button color=\"primary\" (click)=\"createOrUpdateCustomer()\">Save Customer</button>&nbsp;\n    <button [disabled]=\"createMode==true\" mat-flat-button color=\"primary\"  (click)=\"createNewCustomer()\">Create New Customer</button>&nbsp;\n    <button [disabled]=\"createMode==true || readonlyMode==false\" mat-flat-button color=\"primary\" (click)=\"createSalesOrder()\">Create Sales Order</button>\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: CustomerMaintenanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerMaintenanceComponent", function() { return CustomerMaintenanceComponent; });
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_customer_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view-models/customer.viewmodel */ "./src/app/sales-order-management/view-models/customer.viewmodel.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view-models/sales-order.viewmodel */ "./src/app/sales-order-management/view-models/sales-order.viewmodel.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var CustomerMaintenanceComponent = /** @class */ (function () {
    function CustomerMaintenanceComponent(router, route, sessionService, alertService, httpService) {
        this.router = router;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.httpService = httpService;
        this.customerViewModel = new _view_models_customer_viewmodel__WEBPACK_IMPORTED_MODULE_4__["CustomerViewModel"]();
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
    CustomerMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route
            .queryParams
            .subscribe(function (params) {
            _this.customerViewModel.customerId = +params['id'] || 0;
            if (_this.customerViewModel.customerId > 0) {
                _this.createMode = false;
                _this.readonlyMode = true;
                _this.getCustomerInformation();
            }
        });
    };
    CustomerMaintenanceComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    CustomerMaintenanceComponent.prototype.getCustomerInformation = function () {
        var _this = this;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/getcustomer';
        this.httpService.HttpPost(url, this.customerViewModel).subscribe(function (response) {
            _this.getCustomerSuccess(response);
        }, function (response) { return _this.getCustomerFailed(response); });
    };
    CustomerMaintenanceComponent.prototype.initializeCustomer = function () {
        this.customerViewModel = new _view_models_customer_viewmodel__WEBPACK_IMPORTED_MODULE_4__["CustomerViewModel"]();
        this.customerViewModel.customerName = '';
        this.customerViewModel.addressLine1 = '';
        this.customerViewModel.addressLine2 = '';
        this.customerViewModel.city = '';
        this.customerViewModel.region = '';
        this.customerViewModel.postalCode = '';
        this.customerViewModel.customerId = 0;
    };
    CustomerMaintenanceComponent.prototype.createNewCustomer = function () {
        this.readonlyMode = false;
        this.initializeCustomer();
    };
    CustomerMaintenanceComponent.prototype.getCustomerSuccess = function (response) {
        this.customerViewModel = response.entity;
    };
    CustomerMaintenanceComponent.prototype.getCustomerFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    CustomerMaintenanceComponent.prototype.createOrUpdateCustomer = function () {
        var _this = this;
        var customer = new _view_models_customer_viewmodel__WEBPACK_IMPORTED_MODULE_4__["CustomerViewModel"]();
        customer = this.customerViewModel;
        var url = '';
        if (customer.customerId === 0) {
            url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/createcustomer';
        }
        else {
            url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'customer/updatecustomer';
        }
        this.httpService.HttpPost(url, customer).subscribe(function (response) {
            _this.createOrUpdateCustomerSuccess(response);
        }, function (response) { return _this.createOrUpdateCustomerFailed(response); });
    };
    CustomerMaintenanceComponent.prototype.createOrUpdateCustomerSuccess = function (response) {
        var customerViewModel = response.entity;
        this.customerViewModel.customerId = customerViewModel.customerId;
        var message = 'Customer successfully saved.';
        this.alertService.ShowSuccessMessage(message);
        this.createMode = false;
        this.readonlyMode = true;
    };
    CustomerMaintenanceComponent.prototype.createOrUpdateCustomerFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    CustomerMaintenanceComponent.prototype.editCustomer = function () {
        this.createMode = false;
        this.readonlyMode = false;
    };
    CustomerMaintenanceComponent.prototype.createSalesOrder = function () {
        var _this = this;
        var salesOrderViewModel = new _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_6__["SalesOrderViewModel"]();
        salesOrderViewModel.customerId = this.customerViewModel.customerId;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/createsalesorder';
        this.httpService.HttpPost(url, salesOrderViewModel)
            .subscribe(function (response) {
            _this.createSalesOrderSuccess(response);
        }, function (response) { return _this.createSalesOrderFailed(response); });
    };
    CustomerMaintenanceComponent.prototype.createSalesOrderSuccess = function (response) {
        var salesOrderId = response.entity.salesOrderId;
        this.router.navigate(['/salesordermanagement/sales-order-maintenance'], { queryParams: { id: salesOrderId } });
    };
    CustomerMaintenanceComponent.prototype.createSalesOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    CustomerMaintenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-customer-maintenance',
            template: __webpack_require__(/*! ./customer-maintenance.component.html */ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.html"),
            styles: [__webpack_require__(/*! ./customer-maintenance.component.css */ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__["SessionService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__["HttpService"]])
    ], CustomerMaintenanceComponent);
    return CustomerMaintenanceComponent;
}());



/***/ }),

/***/ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.css":
/*!**********************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-sales-order-management-nav-bar></app-sales-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Sales Order Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{salesOrderInquiryViewModel.customerName}}\" [(ngModel)]=\"salesOrderInquiryViewModel.customerName\"\n            placeholder=\"Customer Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"salesOrderInquiryViewModel.totalSalesOrders\" [showFirstLastButtons]=\"true\"\n      [pageIndex]=\"salesOrderInquiryViewModel.currentPageIndex\" [pageSize]=\"salesOrderInquiryViewModel.pageSize\"\n      [pageSizeOptions]=\"salesOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table mat-table [dataSource]=\"salesOrderInquiryViewModel.salesOrders\" matSort (matSortChange)=\"sortData($event)\"\n      class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"salesOrderNumber\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"SalesOrderNumber\"> PO Number</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.salesOrderNumber}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"customerName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.Name\"> Customer Name </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.customerName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"orderTotal\">\n          <th mat-header-cell *matHeaderCellDef  mat-sort-header=\"OrderTotal\">Order Total</th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.orderTotal | currency}} </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"orderDate\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"DateCreated\"> Order Date</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.orderDate}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"salesOrderStatusDescription\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"SalesOrderStatus.Description\">Status</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.salesOrderStatusDescription}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"salesOrderInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: salesOrderInquiryViewModel.displayedColumns; let i = index\"\n        (click)=\"selectSalesOrder(i)\"></tr>\n\n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"salesOrderInquiryViewModel.totalSalesOrders\" [showFirstLastButtons]=\"true\"\n      [pageSize]=\"salesOrderInquiryViewModel.pageSize\" [pageIndex]=\"salesOrderInquiryViewModel.currentPageIndex\"\n      [pageSizeOptions]=\"salesOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: SalesOrderInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderInquiryComponent", function() { return SalesOrderInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_sales_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/sales-order-inquiry.viewmodel */ "./src/app/sales-order-management/view-models/sales-order-inquiry.viewmodel.ts");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SalesOrderInquiryComponent = /** @class */ (function () {
    function SalesOrderInquiryComponent(router, sessionService, httpService, alertService) {
        this.router = router;
        this.sessionService = sessionService;
        this.httpService = httpService;
        this.alertService = alertService;
        this.selectedRowIndex = -1;
        this.sessionService.moduleLoadedEvent.emit();
        this.salesOrderInquiryViewModel = new _view_models_sales_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__["SalesOrderInquiryViewModel"]();
        this.salesOrderInquiryViewModel.pageSize = 20;
        this.salesOrderInquiryViewModel.displayedColumns = ['salesOrderNumber', 'customerName',
            'city', 'region', 'orderTotal', 'orderDate', 'salesOrderStatusDescription'];
        this.salesOrderInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
        this.initializeSearch();
    }
    SalesOrderInquiryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (changes) {
            _this.salesOrderInquiryViewModel.currentPageNumber = 1;
            _this.salesOrderInquiryViewModel.currentPageIndex = 0;
            if (_this.lastSearchValue !== _this.salesOrderInquiryViewModel.customerName) {
                _this.executeSearch();
            }
        });
        this.executeSearch();
    };
    SalesOrderInquiryComponent.prototype.initializeSearch = function () {
        this.salesOrderInquiryViewModel.customerName = '';
        this.salesOrderInquiryViewModel.currentPageNumber = 1;
        this.salesOrderInquiryViewModel.currentPageIndex = 0;
        this.salesOrderInquiryViewModel.totalPages = 0;
        this.salesOrderInquiryViewModel.totalSalesOrders = 0;
        this.salesOrderInquiryViewModel.sortDirection = 'DESC';
        this.salesOrderInquiryViewModel.sortExpression = 'SalesOrderNumber';
        this.salesOrderInquiryViewModel.salesOrders = new Array();
    };
    SalesOrderInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/salesorderinquiry';
        this.httpService.HttpPost(url, this.salesOrderInquiryViewModel).
            subscribe(function (response) {
            _this.salesOrderInquirySuccess(response);
        }, function (response) { return _this.salesOrderInquiryFailed(response); });
    };
    SalesOrderInquiryComponent.prototype.salesOrderInquirySuccess = function (response) {
        response.entity.forEach(function (element) {
            var orderDate = element.dateCreated.toString().substring(0, 10);
            element.orderDate = orderDate.substring(5, 7) + '/' + orderDate.substring(8, 10) + '/' + orderDate.substring(0, 4);
        });
        this.salesOrderInquiryViewModel.salesOrders = response.entity;
        this.salesOrderInquiryViewModel.totalSalesOrders = response.totalRows;
        this.salesOrderInquiryViewModel.totalPages = response.totalPages;
    };
    SalesOrderInquiryComponent.prototype.salesOrderInquiryFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderInquiryComponent.prototype.onPaginateChange = function (event) {
        this.salesOrderInquiryViewModel.currentPageNumber = event.pageIndex + 1;
        this.salesOrderInquiryViewModel.currentPageIndex = event.pageIndex;
        this.salesOrderInquiryViewModel.pageSize = event.pageSize;
        this.executeSearch();
    };
    SalesOrderInquiryComponent.prototype.sortData = function (sort) {
        this.salesOrderInquiryViewModel.currentPageNumber = 1;
        this.salesOrderInquiryViewModel.currentPageIndex = 0;
        this.salesOrderInquiryViewModel.sortDirection = sort.direction;
        this.salesOrderInquiryViewModel.sortExpression = sort.active;
        this.executeSearch();
    };
    SalesOrderInquiryComponent.prototype.resetSearch = function () {
        this.lastSearchValue = '';
        this.salesOrderInquiryViewModel.customerName = '';
        this.initializeSearch();
        this.executeSearch();
    };
    SalesOrderInquiryComponent.prototype.selectSalesOrder = function (row) {
        var salesOrderId = this.salesOrderInquiryViewModel.salesOrders[row].salesOrderId;
        this.router.navigate(['/salesordermanagement/sales-order-maintenance'], { queryParams: { id: salesOrderId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], SalesOrderInquiryComponent.prototype, "searchForm", void 0);
    SalesOrderInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sales-order-inquiry',
            template: __webpack_require__(/*! ./sales-order-inquiry.component.html */ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./sales-order-inquiry.component.css */ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], SalesOrderInquiryComponent);
    return SalesOrderInquiryComponent;
}());



/***/ }),

/***/ "./src/app/sales-order-management/sales-order-maintenance/delete-sales-order-lineitem-dialog.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-maintenance/delete-sales-order-lineitem-dialog.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.title}}</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to Delete this line item?</p>\n  <mat-form-field>\n    <input matInput [disabled]=\"true\" [(ngModel)]=\"data.productNumber\" placeholder=\"Product Number\">\n  </mat-form-field>&nbsp;\n\n  <mat-form-field>\n        <input matInput [disabled]=\"true\" [(ngModel)]=\"data.orderQuantity\" placeholder=\"Order Quanitity\">\n      </mat-form-field>&nbsp;\n\n      <mat-form-field>\n            <input matInput [disabled]=\"true\" [(ngModel)]=\"data.unitPrice\" placeholder=\"Unit Price\">\n          </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"0\">No</button>\n  <button mat-button [mat-dialog-close]=\"data.index\" cdkFocusInitial>Yes</button>\n</div>\n\n"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.css":
/*!******************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.html":
/*!*******************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-sales-order-management-nav-bar></app-sales-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Sales Order Entry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SalesOrderNumber\" value=\"{{salesOrderViewModel.salesOrderNumber}}\"\n            [(ngModel)]=\"salesOrderViewModel.salesOrderNumber\" placeholder=\"Sales Order #\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" type=\"date\" matInput name=\"OrderDate\" value=\"{{salesOrderViewModel.orderDate}}\"\n            [(ngModel)]=\"salesOrderViewModel.orderDate\" placeholder=\"Order Date\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SalesOrderStatusDescription\" value=\"{{salesOrderViewModel.salesOrderStatusDescription}}\"\n            [(ngModel)]=\"salesOrderViewModel.salesOrderStatusDescription\" placeholder=\"Status\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n            <input [disabled]=\"true\" matInput name=\"SalesOrderTotal\" value=\"{{salesOrderViewModel.orderTotalFormatted}}\"\n              [(ngModel)]=\"salesOrderViewModel.orderTotalFormatted\" placeholder=\"Order Total\">\n          </mat-form-field>\n\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"CustomerName\" value=\"{{salesOrderViewModel.customerName}}\"\n            [(ngModel)]=\"salesOrderViewModel.customerName\" placeholder=\"Customer Name\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine1\" value=\"{{salesOrderViewModel.addressLine1}}\"\n            [(ngModel)]=\"salesOrderViewModel.addressLine1\" placeholder=\"Address\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine2\" value=\"{{salesOrderViewModel.addressLine2}}\"\n            [(ngModel)]=\"salesOrderViewModel.addressLine2\" placeholder=\"Address\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"City\" value=\"{{salesOrderViewModel.city}}\" [(ngModel)]=\"salesOrderViewModel.city\"\n            placeholder=\"City\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"Region\" value=\"{{salesOrderViewModel.region}}\" [(ngModel)]=\"salesOrderViewModel.region\"\n            placeholder=\"State/Region\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PostalCode\" value=\"{{salesOrderViewModel.postalCode}}\" [(ngModel)]=\"salesOrderViewModel.postalCode\"\n            placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n      <div style=\"margin-top:10px; margin-bottom:20px\">\n        Sales Order Details\n      </div>\n\n      <table #table mat-table [dataSource]=\"detailDataSource\" class=\"mat-elevation-z8\">\n        <ng-container matColumnDef=\"productNumber\">\n          <th mat-header-cell *matHeaderCellDef> Product Number</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input tabindex=\"1\" required [disabled]=\"!element.editProductNumber\" (blur)=\"getProduct()\" matInput name=\"ProductNumberGrid{{i}}\"\n                     [value]=\"element.productNumber\" [(ngModel)]=\"element.productNumber\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef> Description</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input [disabled]=\"true\" matInput name=\"DescriptionGrid{{i}}\" [value]=\"element.productDescription\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"unitPrice\">\n          <th mat-header-cell *matHeaderCellDef> Unit Price</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"2\" type=\"number\" required [disabled]=\"!element.editUnitPrice\" matInput name=\"UnitPriceGrid{{i}}\" [value]=\"element.unitPriceFormatted\"\n                     [(ngModel)]=\"element.unitPriceFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"orderQuantity\">\n          <th mat-header-cell *matHeaderCellDef> Order Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" required [disabled]=\"!element.editQuantity\" matInput name=\"OrderQuantityGrid{{i}}\" [value]=\"element.orderQuantityFormatted\"\n                     [(ngModel)]=\"element.orderQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"shippedQuantity\">\n          <th mat-header-cell *matHeaderCellDef> Shipped Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" [disabled]=\"true\" matInput name=\"ShippedQuantityGrid{{i}}\" [value]=\"element.shippedQuantityFormatted\"\n                     [(ngModel)]=\"element.shippedQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef>Actions</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n              <button mat-menu-item [disabled]=\"element.disableAddButton\" (click)=\"addLineItem()\">\n                <mat-icon>add</mat-icon>\n                <span>Add</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableEditButton\" (click)=\"editLineItem(i)\">\n                <mat-icon>edit</mat-icon>\n                <span>Edit</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableCancelButton\" (click)=\"cancelEdit(i)\">\n                <mat-icon>undo</mat-icon>\n                <span>Cancel</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableSaveButton\" (click)=\"updateLineItem(i)\">\n                <mat-icon>save</mat-icon>\n                <span>Save</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableDeleteButton\" (click)=\"deleteLineItemDialog(i)\">\n                <mat-icon>remove</mat-icon>\n                <span>Delete</span>\n              </button>\n            </mat-menu>\n          </td>\n        </ng-container>\n        <tr mat-header-row *matHeaderRowDef=\"salesOrderViewModel.displayedColumns\"></tr>\n        <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: salesOrderViewModel.displayedColumns; let i = index\"></tr>\n      </table>\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n      <button [disabled]=\"disableSubmitButton\" mat-flat-button color=\"primary\"\n      (click)=\"submitSalesOrderDialog()\">Submit Sales Order</button>&nbsp;\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: SalesOrderMaintenanceComponent, DeleteSalesOrderLineItemDialogComponent, SubmitSalesOrderDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderMaintenanceComponent", function() { return SalesOrderMaintenanceComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteSalesOrderLineItemDialogComponent", function() { return DeleteSalesOrderLineItemDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitSalesOrderDialogComponent", function() { return SubmitSalesOrderDialogComponent; });
/* harmony import */ var _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-models/sales-order-detail.viewmodel */ "./src/app/sales-order-management/view-models/sales-order-detail.viewmodel.ts");
/* harmony import */ var _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../view-models/product.viewmodel */ "./src/app/sales-order-management/view-models/product.viewmodel.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view-models/sales-order.viewmodel */ "./src/app/sales-order-management/view-models/sales-order.viewmodel.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var SalesOrderMaintenanceComponent = /** @class */ (function () {
    function SalesOrderMaintenanceComponent(dialog, router, httpService, route, sessionService, alertService) {
        this.dialog = dialog;
        this.router = router;
        this.httpService = httpService;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.detailDataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"]();
        this.disableSubmitButton = true;
        this.salesOrderViewModel = new _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__["SalesOrderViewModel"]();
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
        var salesOrderDetailViewModelOriginalValues = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
        this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
        this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);
        this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;
    }
    SalesOrderMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.queryParams.subscribe(function (params) {
            _this.salesOrderViewModel.salesOrderId = +params['id'] || 0;
            if (_this.salesOrderViewModel.salesOrderId > 0) {
                _this.getSalesOrder();
            }
        });
    };
    SalesOrderMaintenanceComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    SalesOrderMaintenanceComponent.prototype.getSalesOrder = function () {
        var _this = this;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/getsalesorder';
        this.httpService.HttpPost(url, this.salesOrderViewModel)
            .subscribe(function (response) {
            _this.getSalesOrderSuccess(response);
        }, function (response) { return _this.getSalesOrderFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.getSalesOrderSuccess = function (response) {
        var _this = this;
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
        response.entity.salesOrderDetails.forEach(function (element) {
            var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
            var salesOrderDetailViewModelOriginalValues = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
            salesOrderDetailViewModelOriginalValues.unitPrice = element.unitPrice;
            salesOrderDetailViewModelOriginalValues.orderQuantity = element.orderQuantity;
            salesOrderDetailViewModelOriginalValues.orderQuantityFormatted = element.orderQuantity.toFixed(0);
            salesOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);
            _this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
            _this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);
        });
        this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;
        this.salesOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice', 'orderQuantity', 'shippedQuantity', 'actions'];
        if (this.salesOrderViewModel.salesOrderStatusDescription !== 'Open') {
            this.disableSalesOrderButtons();
        }
    };
    SalesOrderMaintenanceComponent.prototype.getSalesOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.getProduct = function () {
        var _this = this;
        this.salesOrderViewModel.salesOrderDetails[0].productNumber
            = this.salesOrderViewModel.salesOrderDetails[0].productNumber.trim();
        if (this.salesOrderViewModel.salesOrderDetails[0].productNumber.length === 0) {
            return;
        }
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/getproduct';
        var productViewModel = new _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_1__["ProductViewModel"]();
        productViewModel.productNumber = this.salesOrderViewModel.salesOrderDetails[0].productNumber;
        this.httpService.HttpPost(url, productViewModel)
            .subscribe(function (response) {
            _this.getProductSuccess(response);
        }, function (response) { return _this.getProductFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.getProductSuccess = function (response) {
        this.salesOrderViewModel.salesOrderDetails[0].productDescription = response.entity.description;
        this.salesOrderViewModel.salesOrderDetails[0].productId = response.entity.productId;
        this.salesOrderViewModel.salesOrderDetails[0].editQuantity = true;
        this.salesOrderViewModel.salesOrderDetails[0].editUnitPrice = true;
        this.salesOrderViewModel.salesOrderDetails[0].editMode = true;
        this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = false;
    };
    SalesOrderMaintenanceComponent.prototype.getProductFailed = function (error) {
        this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = true;
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.addLineItem = function () {
        var _this = this;
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
        salesOrderDetailViewModel.salesOrderDetailId = 0;
        salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;
        salesOrderDetailViewModel.productId = this.salesOrderViewModel.salesOrderDetails[0].productId;
        salesOrderDetailViewModel.productMasterId = this.salesOrderViewModel.salesOrderDetails[0].productMasterId;
        salesOrderDetailViewModel.productNumber = this.salesOrderViewModel.salesOrderDetails[0].productNumber;
        salesOrderDetailViewModel.unitPrice = parseFloat(this.salesOrderViewModel.salesOrderDetails[0].unitPriceFormatted);
        salesOrderDetailViewModel.orderQuantity = parseInt(this.salesOrderViewModel.salesOrderDetails[0].orderQuantityFormatted, 0);
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/createsalesorderdetail';
        this.httpService.HttpPost(url, salesOrderDetailViewModel)
            .subscribe(function (response) {
            _this.addLineItemSuccess(response);
        }, function (response) { return _this.addLineItemFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.addLineItemSuccess = function (response) {
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
        var salesOrderDetailViewModelOriginalValues = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
        var message = 'Line Item successfully saved.';
        this.alertService.ShowSuccessMessage(message);
    };
    SalesOrderMaintenanceComponent.prototype.addLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.editLineItem = function (i) {
        this.salesOrderViewModel.salesOrderDetails[i].editQuantity = true;
        this.salesOrderViewModel.salesOrderDetails[i].editUnitPrice = true;
        this.salesOrderViewModel.salesOrderDetails[i].editMode = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableAddButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = true;
        var salesOrderDetailViewModelOriginalValues = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
    };
    SalesOrderMaintenanceComponent.prototype.updateLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
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
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/updatesalesorderdetail';
        this.httpService.HttpPost(url, salesOrderDetailViewModel)
            .subscribe(function (response) {
            _this.updateLineItemSuccess(response);
        }, function (response) { return _this.updateLineItemFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.deleteLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
        salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderId;
        salesOrderDetailViewModel.salesOrderDetailId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderDetailId;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/deletesalesorderdetail';
        this.httpService.HttpPost(url, salesOrderDetailViewModel)
            .subscribe(function (response) {
            _this.deleteLineItemSuccess(response);
        }, function (response) { return _this.deleteLineItemFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.cancelEdit = function (i) {
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
    };
    SalesOrderMaintenanceComponent.prototype.updateLineItemSuccess = function (response) {
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
        var message = 'Line Item successfully updated.';
        this.alertService.ShowSuccessMessage(message);
    };
    SalesOrderMaintenanceComponent.prototype.deleteLineItemSuccess = function (response) {
        this.salesOrderViewModel.salesOrderDetails.splice(this.currentLineItem, 1);
        this.salesOrderViewModel.salesOrderDetailsOriginalValues.splice(this.currentLineItem, 1);
        this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;
        this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
        this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        this.setEnableSubmitButton();
        var message = 'Line Item successfully deleted.';
        this.alertService.ShowSuccessMessage(message);
    };
    SalesOrderMaintenanceComponent.prototype.deleteLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.updateLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.setDisableSubmitButton = function () {
        this.disableSubmitButton = true;
    };
    SalesOrderMaintenanceComponent.prototype.setEnableSubmitButton = function () {
        this.disableSubmitButton = true;
        if (this.salesOrderViewModel.salesOrderDetails.length > 0 && this.salesOrderViewModel.salesOrderStatusDescription === 'Open') {
            this.disableSubmitButton = false;
        }
    };
    SalesOrderMaintenanceComponent.prototype.submitSalesOrder = function () {
        var _this = this;
        var salesOrderViewModel = new _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__["SalesOrderViewModel"]();
        salesOrderViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;
        var url = this.sessionService.appSettings.salesOrderManagementWebApiUrl + 'salesorder/submitsalesorder';
        this.httpService.HttpPost(url, salesOrderViewModel)
            .subscribe(function (response) {
            _this.submitSalesOrderSuccess(response);
        }, function (response) { return _this.submitSalesOrderFailed(response); });
    };
    SalesOrderMaintenanceComponent.prototype.submitSalesOrderSuccess = function (response) {
        this.salesOrderViewModel.salesOrderStatusDescription = response.entity.salesOrderStatusDescription;
        this.setDisableSubmitButton();
        var message = 'Sales Order Submitted.';
        this.alertService.ShowSuccessMessage(message);
    };
    SalesOrderMaintenanceComponent.prototype.submitSalesOrderFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderMaintenanceComponent.prototype.disableSalesOrderButtons = function () {
    };
    SalesOrderMaintenanceComponent.prototype.deleteLineItemDialog = function (i) {
        var _this = this;
        var productNumber = this.salesOrderViewModel.salesOrderDetails[i].productNumber;
        var orderQuantity = this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted;
        var unitPrice = this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted;
        var index = i;
        var dialogRef = this.dialog.open(DeleteSalesOrderLineItemDialogComponent, {
            width: '50%',
            data: {
                title: 'Delete Sales Order Line Item',
                index: index,
                orderQuantity: orderQuantity,
                unitPrice: unitPrice,
                productNumber: productNumber
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var returnedIndex = parseInt(result, 0);
            if (returnedIndex > 0) {
                _this.deleteLineItem(returnedIndex);
            }
        });
    };
    SalesOrderMaintenanceComponent.prototype.submitSalesOrderDialog = function () {
        var _this = this;
        var salesOrderNumber = this.salesOrderViewModel.salesOrderNumber;
        var orderTotal = this.salesOrderViewModel.orderTotalFormatted;
        var dialogRef = this.dialog.open(SubmitSalesOrderDialogComponent, {
            width: '50%',
            data: {
                title: 'Submit Sales Order',
                orderTotal: orderTotal,
                salesOrderNumber: salesOrderNumber
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var returnedResponse = parseInt(result, 0);
            if (returnedResponse > 0) {
                _this.submitSalesOrder();
            }
        });
    };
    SalesOrderMaintenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-sales-order-maintenance',
            template: __webpack_require__(/*! ./sales-order-maintenance.component.html */ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.html"),
            styles: [__webpack_require__(/*! ./sales-order-maintenance.component.css */ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"]])
    ], SalesOrderMaintenanceComponent);
    return SalesOrderMaintenanceComponent;
}());

var DeleteSalesOrderLineItemDialogComponent = /** @class */ (function () {
    function DeleteSalesOrderLineItemDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DeleteSalesOrderLineItemDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DeleteSalesOrderLineItemDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-delete-sales-order-lineitem-dialog',
            template: __webpack_require__(/*! ./delete-sales-order-lineitem-dialog.html */ "./src/app/sales-order-management/sales-order-maintenance/delete-sales-order-lineitem-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_9__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogRef"], Object])
    ], DeleteSalesOrderLineItemDialogComponent);
    return DeleteSalesOrderLineItemDialogComponent;
}());

var SubmitSalesOrderDialogComponent = /** @class */ (function () {
    function SubmitSalesOrderDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SubmitSalesOrderDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SubmitSalesOrderDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-submit-sales-order-dialog',
            template: __webpack_require__(/*! ./submit-sales-order-dialog.html */ "./src/app/sales-order-management/sales-order-maintenance/submit-sales-order-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_9__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogRef"], Object])
    ], SubmitSalesOrderDialogComponent);
    return SubmitSalesOrderDialogComponent;
}());



/***/ }),

/***/ "./src/app/sales-order-management/sales-order-maintenance/submit-sales-order-dialog.html":
/*!***********************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-maintenance/submit-sales-order-dialog.html ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.title}}</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to Submit this Sales Order</p>\n  <mat-form-field>\n    <input matInput [disabled]=\"true\" [(ngModel)]=\"data.salesOrderNumber\" placeholder=\"Sales Order #\">\n  </mat-form-field>&nbsp;\n\n  <mat-form-field>\n        <input matInput [disabled]=\"true\" [(ngModel)]=\"data.orderTotal\" placeholder=\"Order Total\">\n      </mat-form-field>&nbsp;\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"0\">No</button>\n  <button mat-button [mat-dialog-close]=\"1\" cdkFocusInitial>Yes</button>\n</div>\n"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.css":
/*!********************************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.css ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar style=\"background-color:green\">\n\n  <div>\n    <a mat-list-item>\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Sales Order Management</span>\n    </a>\n  </div>\n\n  <span class=\"spacer\"></span>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/salesordermanagement/customer-maintenance']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Customer Maintenance</span>\n    </a>\n  </div>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/salesordermanagement/customer-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Customer Inquiry</span>\n    </a>\n  </div>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/salesordermanagement/sales-order-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Sales Order Inquiry</span>\n    </a>\n  </div>\n\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: SalesOrderManagementNavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderManagementNavBarComponent", function() { return SalesOrderManagementNavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SalesOrderManagementNavBarComponent = /** @class */ (function () {
    function SalesOrderManagementNavBarComponent() {
    }
    SalesOrderManagementNavBarComponent.prototype.ngOnInit = function () {
    };
    SalesOrderManagementNavBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sales-order-management-nav-bar',
            template: __webpack_require__(/*! ./sales-order-management-nav-bar.component.html */ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.html"),
            styles: [__webpack_require__(/*! ./sales-order-management-nav-bar.component.css */ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SalesOrderManagementNavBarComponent);
    return SalesOrderManagementNavBarComponent;
}());



/***/ }),

/***/ "./src/app/sales-order-management/sales-order-management.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-management.module.ts ***!
  \*************************************************************************/
/*! exports provided: SalesOrderManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderManagementModule", function() { return SalesOrderManagementModule; });
/* harmony import */ var _customer_maintenance_customer_maintenance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./customer-maintenance/customer-maintenance.component */ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.ts");
/* harmony import */ var _customer_inquiry_customer_inquiry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customer-inquiry/customer-inquiry.component */ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.ts");
/* harmony import */ var _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sales-order-maintenance/sales-order-maintenance.component */ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.ts");
/* harmony import */ var _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sales-order-inquiry/sales-order-inquiry.component */ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");
/* harmony import */ var _sales_order_management_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sales-order-management.routing */ "./src/app/sales-order-management/sales-order-management.routing.ts");
/* harmony import */ var _sales_order_management_nav_bar_sales_order_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sales-order-management-nav-bar/sales-order-management-nav-bar.component */ "./src/app/sales-order-management/sales-order-management-nav-bar/sales-order-management-nav-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var SalesOrderManagementModule = /** @class */ (function () {
    function SalesOrderManagementModule() {
    }
    SalesOrderManagementModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _sales_order_management_routing__WEBPACK_IMPORTED_MODULE_8__["SalesOrderManagementRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            entryComponents: [_sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["DeleteSalesOrderLineItemDialogComponent"], _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SubmitSalesOrderDialogComponent"]],
            declarations: [_customer_inquiry_customer_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["CustomerInquiryComponent"], _customer_maintenance_customer_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["CustomerMaintenanceComponent"],
                _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_3__["SalesOrderInquiryComponent"], _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SalesOrderMaintenanceComponent"],
                _sales_order_management_nav_bar_sales_order_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_9__["SalesOrderManagementNavBarComponent"], _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["DeleteSalesOrderLineItemDialogComponent"], _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SubmitSalesOrderDialogComponent"]]
        })
    ], SalesOrderManagementModule);
    return SalesOrderManagementModule;
}());



/***/ }),

/***/ "./src/app/sales-order-management/sales-order-management.routing.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sales-order-management/sales-order-management.routing.ts ***!
  \**************************************************************************/
/*! exports provided: SalesOrderManagementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderManagementRoutingModule", function() { return SalesOrderManagementRoutingModule; });
/* harmony import */ var _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sales-order-maintenance/sales-order-maintenance.component */ "./src/app/sales-order-management/sales-order-maintenance/sales-order-maintenance.component.ts");
/* harmony import */ var _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sales-order-inquiry/sales-order-inquiry.component */ "./src/app/sales-order-management/sales-order-inquiry/sales-order-inquiry.component.ts");
/* harmony import */ var _customer_maintenance_customer_maintenance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customer-maintenance/customer-maintenance.component */ "./src/app/sales-order-management/customer-maintenance/customer-maintenance.component.ts");
/* harmony import */ var _customer_inquiry_customer_inquiry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customer-inquiry/customer-inquiry.component */ "./src/app/sales-order-management/customer-inquiry/customer-inquiry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SalesOrderManagementRoutes = [
    { path: '', component: _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["SalesOrderInquiryComponent"] },
    { path: 'customer-maintenance', component: _customer_maintenance_customer_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["CustomerMaintenanceComponent"] },
    { path: 'customer-maintenance/:id', component: _customer_maintenance_customer_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["CustomerMaintenanceComponent"] },
    { path: 'customer-inquiry', component: _customer_inquiry_customer_inquiry_component__WEBPACK_IMPORTED_MODULE_3__["CustomerInquiryComponent"] },
    { path: 'sales-order-maintenance', component: _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["SalesOrderMaintenanceComponent"] },
    { path: 'sales-order-maintenance/:id', component: _sales_order_maintenance_sales_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["SalesOrderMaintenanceComponent"] },
    { path: 'sales-order-inquiry', component: _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["SalesOrderInquiryComponent"] },
];
var SalesOrderManagementRoutingModule = /** @class */ (function () {
    function SalesOrderManagementRoutingModule() {
    }
    SalesOrderManagementRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(SalesOrderManagementRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]]
        })
    ], SalesOrderManagementRoutingModule);
    return SalesOrderManagementRoutingModule;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/customer-inquiry.viewmodel.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/customer-inquiry.viewmodel.ts ***!
  \**********************************************************************************/
/*! exports provided: CustomerInquiryViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerInquiryViewModel", function() { return CustomerInquiryViewModel; });
var CustomerInquiryViewModel = /** @class */ (function () {
    function CustomerInquiryViewModel() {
    }
    return CustomerInquiryViewModel;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/customer.viewmodel.ts":
/*!**************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/customer.viewmodel.ts ***!
  \**************************************************************************/
/*! exports provided: CustomerViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerViewModel", function() { return CustomerViewModel; });
var CustomerViewModel = /** @class */ (function () {
    function CustomerViewModel() {
    }
    return CustomerViewModel;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/product.viewmodel.ts":
/*!*************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/product.viewmodel.ts ***!
  \*************************************************************************/
/*! exports provided: ProductViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductViewModel", function() { return ProductViewModel; });
var ProductViewModel = /** @class */ (function () {
    function ProductViewModel() {
    }
    return ProductViewModel;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/sales-order-detail.viewmodel.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/sales-order-detail.viewmodel.ts ***!
  \************************************************************************************/
/*! exports provided: SalesOrderDetailViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderDetailViewModel", function() { return SalesOrderDetailViewModel; });
var SalesOrderDetailViewModel = /** @class */ (function () {
    function SalesOrderDetailViewModel() {
    }
    return SalesOrderDetailViewModel;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/sales-order-inquiry.viewmodel.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/sales-order-inquiry.viewmodel.ts ***!
  \*************************************************************************************/
/*! exports provided: SalesOrderInquiryViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderInquiryViewModel", function() { return SalesOrderInquiryViewModel; });
var SalesOrderInquiryViewModel = /** @class */ (function () {
    function SalesOrderInquiryViewModel() {
    }
    return SalesOrderInquiryViewModel;
}());



/***/ }),

/***/ "./src/app/sales-order-management/view-models/sales-order.viewmodel.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/sales-order-management/view-models/sales-order.viewmodel.ts ***!
  \*****************************************************************************/
/*! exports provided: SalesOrderViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderViewModel", function() { return SalesOrderViewModel; });
var SalesOrderViewModel = /** @class */ (function () {
    function SalesOrderViewModel() {
        this.salesOrderDetails = new Array();
        this.salesOrderDetailsOriginalValues = new Array();
    }
    return SalesOrderViewModel;
}());



/***/ })

}]);
//# sourceMappingURL=app-sales-order-management-sales-order-management-module.js.map