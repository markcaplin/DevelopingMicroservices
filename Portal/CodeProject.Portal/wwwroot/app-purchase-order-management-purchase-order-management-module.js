(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-purchase-order-management-purchase-order-management-module"],{

/***/ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.css":
/*!*******************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.css ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-purchase-order-management-nav-bar></app-purchase-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Purchase Order Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{purchaseOrderInquiryViewModel.supplierName}}\" [(ngModel)]=\"purchaseOrderInquiryViewModel.supplierName\"\n            placeholder=\"Supplier Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"purchaseOrderInquiryViewModel.totalPurchaseOrders\" [showFirstLastButtons]=\"true\"\n      [pageIndex]=\"purchaseOrderInquiryViewModel.currentPageIndex\" [pageSize]=\"purchaseOrderInquiryViewModel.pageSize\"\n      [pageSizeOptions]=\"purchaseOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table mat-table [dataSource]=\"purchaseOrderInquiryViewModel.purchaseOrders\" matSort (matSortChange)=\"sortData($event)\"\n      class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"purchaseOrderNumber\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PurchaseOrderNumber\"> PO Number</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.purchaseOrderNumber}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"supplierName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.Name\"> Supplier Name </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.supplierName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"orderTotal\">\n          <th mat-header-cell *matHeaderCellDef  mat-sort-header=\"OrderTotal\">Order Total</th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.orderTotal | currency}} </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"orderDate\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"DateCreated\"> Order Date</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.orderDate}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"purchaseOrderStatusDescription\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PurchaseOrderStatus.Description\">Status</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.purchaseOrderStatusDescription}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"purchaseOrderInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: purchaseOrderInquiryViewModel.displayedColumns; let i = index\"\n        (click)=\"selectPurchaseOrder(i)\"></tr>\n\n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"purchaseOrderInquiryViewModel.totalPurchaseOrders\" [showFirstLastButtons]=\"true\"\n      [pageSize]=\"purchaseOrderInquiryViewModel.pageSize\" [pageIndex]=\"purchaseOrderInquiryViewModel.currentPageIndex\"\n      [pageSizeOptions]=\"purchaseOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.ts":
/*!******************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: PurchaseOrderInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderInquiryComponent", function() { return PurchaseOrderInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_purchase_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/purchase-order-inquiry.viewmodel */ "./src/app/purchase-order-management/view-models/purchase-order-inquiry.viewmodel.ts");
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









var PurchaseOrderInquiryComponent = /** @class */ (function () {
    function PurchaseOrderInquiryComponent(router, sessionService, httpService, alertService) {
        this.router = router;
        this.sessionService = sessionService;
        this.httpService = httpService;
        this.alertService = alertService;
        this.selectedRowIndex = -1;
        this.sessionService.moduleLoadedEvent.emit();
        this.purchaseOrderInquiryViewModel = new _view_models_purchase_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__["PurchaseOrderInquiryViewModel"]();
        this.purchaseOrderInquiryViewModel.pageSize = 20;
        this.purchaseOrderInquiryViewModel.displayedColumns = ['purchaseOrderNumber', 'supplierName',
            'city', 'region', 'orderTotal', 'orderDate', 'purchaseOrderStatusDescription'];
        this.purchaseOrderInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
        this.initializeSearch();
    }
    PurchaseOrderInquiryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (changes) {
            _this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
            _this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
            if (_this.lastSearchValue !== _this.purchaseOrderInquiryViewModel.supplierName) {
                _this.executeSearch();
            }
        });
        this.executeSearch();
    };
    PurchaseOrderInquiryComponent.prototype.initializeSearch = function () {
        this.purchaseOrderInquiryViewModel.supplierName = '';
        this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
        this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
        this.purchaseOrderInquiryViewModel.totalPages = 0;
        this.purchaseOrderInquiryViewModel.totalPurchaseOrders = 0;
        this.purchaseOrderInquiryViewModel.sortDirection = 'DESC';
        this.purchaseOrderInquiryViewModel.sortExpression = 'PurchaseOrderNumber';
        this.purchaseOrderInquiryViewModel.purchaseOrders = new Array();
    };
    PurchaseOrderInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/purchaseorderinquiry';
        this.httpService.HttpPost(url, this.purchaseOrderInquiryViewModel).
            subscribe(function (response) {
            _this.purchaseOrderInquirySuccess(response);
        }, function (response) { return _this.purchaseOrderInquiryFailed(response); });
    };
    PurchaseOrderInquiryComponent.prototype.purchaseOrderInquirySuccess = function (response) {
        response.entity.forEach(function (element) {
            var orderDate = element.dateCreated.toString().substring(0, 10);
            element.orderDate = orderDate.substring(5, 7) + '/' + orderDate.substring(8, 10) + '/' + orderDate.substring(0, 4);
        });
        this.purchaseOrderInquiryViewModel.purchaseOrders = response.entity;
        this.purchaseOrderInquiryViewModel.totalPurchaseOrders = response.totalRows;
        this.purchaseOrderInquiryViewModel.totalPages = response.totalPages;
    };
    PurchaseOrderInquiryComponent.prototype.purchaseOrderInquiryFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderInquiryComponent.prototype.onPaginateChange = function (event) {
        this.purchaseOrderInquiryViewModel.currentPageNumber = event.pageIndex + 1;
        this.purchaseOrderInquiryViewModel.currentPageIndex = event.pageIndex;
        this.purchaseOrderInquiryViewModel.pageSize = event.pageSize;
        this.executeSearch();
    };
    PurchaseOrderInquiryComponent.prototype.sortData = function (sort) {
        this.purchaseOrderInquiryViewModel.currentPageNumber = 1;
        this.purchaseOrderInquiryViewModel.currentPageIndex = 0;
        this.purchaseOrderInquiryViewModel.sortDirection = sort.direction;
        this.purchaseOrderInquiryViewModel.sortExpression = sort.active;
        this.executeSearch();
    };
    PurchaseOrderInquiryComponent.prototype.resetSearch = function () {
        this.lastSearchValue = '';
        this.purchaseOrderInquiryViewModel.supplierName = '';
        this.initializeSearch();
        this.executeSearch();
    };
    PurchaseOrderInquiryComponent.prototype.selectPurchaseOrder = function (row) {
        var purchaseOrderId = this.purchaseOrderInquiryViewModel.purchaseOrders[row].purchaseOrderId;
        this.router.navigate(['/purchaseordermanagement/purchase-order-maintenance'], { queryParams: { id: purchaseOrderId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], PurchaseOrderInquiryComponent.prototype, "searchForm", void 0);
    PurchaseOrderInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchase-order-inquiry',
            template: __webpack_require__(/*! ./purchase-order-inquiry.component.html */ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./purchase-order-inquiry.component.css */ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], PurchaseOrderInquiryComponent);
    return PurchaseOrderInquiryComponent;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-maintenance/delete-purchase-order-lineitem-dialog.html":
/*!*****************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-maintenance/delete-purchase-order-lineitem-dialog.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.title}}</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to Delete this line item?</p>\n  <mat-form-field>\n    <input matInput [disabled]=\"true\" [(ngModel)]=\"data.productNumber\" placeholder=\"Product Number\">\n  </mat-form-field>&nbsp;\n\n  <mat-form-field>\n        <input matInput [disabled]=\"true\" [(ngModel)]=\"data.orderQuantity\" placeholder=\"Order Quanitity\">\n      </mat-form-field>&nbsp;\n\n      <mat-form-field>\n            <input matInput [disabled]=\"true\" [(ngModel)]=\"data.unitPrice\" placeholder=\"Unit Price\">\n          </mat-form-field>\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"0\">No</button>\n  <button mat-button [mat-dialog-close]=\"data.index\" cdkFocusInitial>Yes</button>\n</div>\n\n"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.css":
/*!***************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.css ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.html":
/*!****************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-purchase-order-management-nav-bar></app-purchase-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Purchase Order Entry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PurchaseOrderNumber\" value=\"{{purchaseOrderViewModel.purchaseOrderNumber}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.purchaseOrderNumber\" placeholder=\"Purchase Order #\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" type=\"date\" matInput name=\"OrderDate\" value=\"{{purchaseOrderViewModel.orderDate}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.orderDate\" placeholder=\"Order Date\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PurchaseOrderStatusDescription\" value=\"{{purchaseOrderViewModel.purchaseOrderStatusDescription}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.purchaseOrderStatusDescription\" placeholder=\"Status\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n            <input [disabled]=\"true\" matInput name=\"PurchaseOrderTotal\" value=\"{{purchaseOrderViewModel.orderTotalFormatted}}\"\n              [(ngModel)]=\"purchaseOrderViewModel.orderTotalFormatted\" placeholder=\"Order Total\">\n          </mat-form-field>\n\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SupplierName\" value=\"{{purchaseOrderViewModel.supplierName}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.supplierName\" placeholder=\"Supplier Name\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine1\" value=\"{{purchaseOrderViewModel.addressLine1}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.addressLine1\" placeholder=\"Address\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine2\" value=\"{{purchaseOrderViewModel.addressLine2}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.addressLine2\" placeholder=\"Address\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"City\" value=\"{{purchaseOrderViewModel.city}}\" [(ngModel)]=\"purchaseOrderViewModel.city\"\n            placeholder=\"City\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"Region\" value=\"{{purchaseOrderViewModel.region}}\" [(ngModel)]=\"purchaseOrderViewModel.region\"\n            placeholder=\"State/Region\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PostalCode\" value=\"{{purchaseOrderViewModel.postalCode}}\" [(ngModel)]=\"purchaseOrderViewModel.postalCode\"\n            placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n      <div style=\"margin-top:10px; margin-bottom:20px\">\n        Purchase Order Details\n      </div>\n\n      <table #table mat-table [dataSource]=\"detailDataSource\" class=\"mat-elevation-z8\">\n\n        <ng-container matColumnDef=\"productNumber\">\n          <th mat-header-cell *matHeaderCellDef> Product Number</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input tabindex=\"1\" required [disabled]=\"!element.editProductNumber\" (blur)=\"getProduct()\" matInput name=\"ProductNumberGrid{{i}}\"\n                [value]=\"element.productNumber\" [(ngModel)]=\"element.productNumber\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef> Description</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input [disabled]=\"true\" matInput name=\"DescriptionGrid{{i}}\" [value]=\"element.productDescription\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"unitPrice\">\n          <th mat-header-cell *matHeaderCellDef> Unit Price</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"2\" type=\"number\" required [disabled]=\"!element.editUnitPrice\" matInput name=\"UnitPriceGrid{{i}}\" [value]=\"element.unitPriceFormatted\"\n                [(ngModel)]=\"element.unitPriceFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"orderQuantity\">\n          <th mat-header-cell *matHeaderCellDef> Order Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" required [disabled]=\"!element.editQuantity\" matInput name=\"OrderQuantityGrid{{i}}\" [value]=\"element.orderQuantityFormatted\"\n                [(ngModel)]=\"element.orderQuantityFormatted\">\n\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef>Actions</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n\n            <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n              <button mat-menu-item [disabled]=\"element.disableAddButton\" (click)=\"addLineItem()\">\n                <mat-icon>add</mat-icon>\n                <span>Add</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableEditButton\" (click)=\"editLineItem(i)\">\n                <mat-icon>edit</mat-icon>\n                <span>Edit</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableCancelButton\" (click)=\"cancelEdit(i)\">\n                <mat-icon>undo</mat-icon>\n                <span>Cancel</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableSaveButton\" (click)=\"updateLineItem(i)\">\n                <mat-icon>save</mat-icon>\n                <span>Save</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableDeleteButton\"  (click)=\"deleteLineItemDialog(i)\">\n                <mat-icon>remove</mat-icon>\n                <span>Delete</span>\n              </button>\n            </mat-menu>\n\n          </td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"purchaseOrderViewModel.displayedColumns\"></tr>\n        <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: purchaseOrderViewModel.displayedColumns; let i = index\"></tr>\n\n      </table>\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n      <button [disabled]=\"disableSubmitButton\" mat-flat-button color=\"primary\"\n      (click)=\"submitPurchaseOrderDialog()\">Submit Purchase Order</button>&nbsp;\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: PurchaseOrderMaintenanceComponent, DeletePurchaseOrderLineItemDialogComponent, SubmitPurchaseOrderDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderMaintenanceComponent", function() { return PurchaseOrderMaintenanceComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeletePurchaseOrderLineItemDialogComponent", function() { return DeletePurchaseOrderLineItemDialogComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubmitPurchaseOrderDialogComponent", function() { return SubmitPurchaseOrderDialogComponent; });
/* harmony import */ var _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-models/purchase-order-detail.viewmodel */ "./src/app/purchase-order-management/view-models/purchase-order-detail.viewmodel.ts");
/* harmony import */ var _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../view-models/product.viewmodel */ "./src/app/purchase-order-management/view-models/product.viewmodel.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view-models/purchase-order.viewmodel */ "./src/app/purchase-order-management/view-models/purchase-order.viewmodel.ts");
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










var PurchaseOrderMaintenanceComponent = /** @class */ (function () {
    function PurchaseOrderMaintenanceComponent(dialog, router, httpService, route, sessionService, alertService) {
        this.dialog = dialog;
        this.router = router;
        this.httpService = httpService;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.detailDataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTableDataSource"]();
        this.disableSubmitButton = true;
        this.purchaseOrderViewModel = new _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__["PurchaseOrderViewModel"]();
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.productDescription = '';
        purchaseOrderDetailViewModel.productNumber = ' ';
        purchaseOrderDetailViewModel.unitPriceFormatted = '';
        purchaseOrderDetailViewModel.orderQuantityFormatted = '';
        purchaseOrderDetailViewModel.editProductNumber = true;
        purchaseOrderDetailViewModel.editQuantity = false;
        purchaseOrderDetailViewModel.editUnitPrice = false;
        purchaseOrderDetailViewModel.editMode = false;
        purchaseOrderDetailViewModel.disableAddButton = true;
        purchaseOrderDetailViewModel.disableCancelButton = true;
        purchaseOrderDetailViewModel.disableDeleteButton = true;
        purchaseOrderDetailViewModel.disableEditButton = true;
        purchaseOrderDetailViewModel.disableSaveButton = true;
        var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
        this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
    }
    PurchaseOrderMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.queryParams.subscribe(function (params) {
            _this.purchaseOrderViewModel.purchaseOrderId = +params['id'] || 0;
            if (_this.purchaseOrderViewModel.purchaseOrderId > 0) {
                _this.getPurchaseOrder();
            }
        });
    };
    PurchaseOrderMaintenanceComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    PurchaseOrderMaintenanceComponent.prototype.getPurchaseOrder = function () {
        var _this = this;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/getpurchaseorder';
        this.httpService.HttpPost(url, this.purchaseOrderViewModel)
            .subscribe(function (response) {
            _this.getPurchaseOrderSuccess(response);
        }, function (response) { return _this.getPurchaseOrderFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.getPurchaseOrderSuccess = function (response) {
        var _this = this;
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
        response.entity.purchaseOrderDetails.forEach(function (element) {
            var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
            purchaseOrderDetailViewModel.purchaseOrderDetailId = element.purchaseOrderDetailId;
            purchaseOrderDetailViewModel.purchaseOrderId = element.purchaseOrderId;
            purchaseOrderDetailViewModel.productId = element.productId;
            purchaseOrderDetailViewModel.productDescription = element.productDescription;
            purchaseOrderDetailViewModel.productMasterId = element.productMasterId;
            purchaseOrderDetailViewModel.productNumber = element.productNumber;
            purchaseOrderDetailViewModel.unitPrice = element.unitPrice;
            purchaseOrderDetailViewModel.orderQuantity = element.orderQuantity;
            purchaseOrderDetailViewModel.orderQuantityFormatted = element.orderQuantity.toFixed(0);
            purchaseOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
            purchaseOrderDetailViewModel.editQuantity = false;
            purchaseOrderDetailViewModel.editUnitPrice = false;
            purchaseOrderDetailViewModel.editProductNumber = false;
            purchaseOrderDetailViewModel.editMode = false;
            purchaseOrderDetailViewModel.disableAddButton = true;
            purchaseOrderDetailViewModel.disableSaveButton = true;
            purchaseOrderDetailViewModel.disableCancelButton = true;
            purchaseOrderDetailViewModel.disableDeleteButton = false;
            purchaseOrderDetailViewModel.disableEditButton = false;
            var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
            purchaseOrderDetailViewModelOriginalValues.unitPrice = element.unitPrice;
            purchaseOrderDetailViewModelOriginalValues.orderQuantity = element.orderQuantity;
            purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted = element.orderQuantity.toFixed(0);
            purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);
            _this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
            _this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);
        });
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
        this.purchaseOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice', 'orderQuantity', 'actions'];
        if (this.purchaseOrderViewModel.purchaseOrderStatusDescription !== 'Open') {
            this.disablePurchaseOrderButtons();
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.getPurchaseOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.getProduct = function () {
        var _this = this;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber
            = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber.trim();
        if (this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber.length === 0) {
            return;
        }
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/getproduct';
        var productViewModel = new _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_1__["ProductViewModel"]();
        productViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber;
        this.httpService.HttpPost(url, productViewModel)
            .subscribe(function (response) {
            _this.getProductSuccess(response);
        }, function (response) { return _this.getProductFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.getProductSuccess = function (response) {
        this.purchaseOrderViewModel.purchaseOrderDetails[0].productDescription = response.entity.description;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].productId = response.entity.productId;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editQuantity = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editUnitPrice = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editMode = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = false;
    };
    PurchaseOrderMaintenanceComponent.prototype.getProductFailed = function (error) {
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.addLineItem = function () {
        var _this = this;
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.purchaseOrderDetailId = 0;
        purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
        purchaseOrderDetailViewModel.productId = this.purchaseOrderViewModel.purchaseOrderDetails[0].productId;
        purchaseOrderDetailViewModel.productMasterId = this.purchaseOrderViewModel.purchaseOrderDetails[0].productMasterId;
        purchaseOrderDetailViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber;
        purchaseOrderDetailViewModel.unitPrice = parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPriceFormatted);
        purchaseOrderDetailViewModel.orderQuantity = parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantityFormatted, 0);
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/createpurchaseorderdetail';
        this.httpService.HttpPost(url, purchaseOrderDetailViewModel)
            .subscribe(function (response) {
            _this.addLineItemSuccess(response);
        }, function (response) { return _this.addLineItemFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.addLineItemSuccess = function (response) {
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.purchaseOrderDetailId = response.entity.purchaseOrderDetailId;
        purchaseOrderDetailViewModel.purchaseOrderId = response.entity.purchaseOrderId;
        purchaseOrderDetailViewModel.productId = response.entity.productId;
        purchaseOrderDetailViewModel.productDescription = response.entity.productDescription;
        purchaseOrderDetailViewModel.productMasterId = response.entity.productMasterId;
        purchaseOrderDetailViewModel.productNumber = response.entity.productNumber;
        purchaseOrderDetailViewModel.unitPrice = response.entity.unitPrice;
        purchaseOrderDetailViewModel.orderQuantity = response.entity.orderQuantity;
        purchaseOrderDetailViewModel.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
        purchaseOrderDetailViewModel.unitPriceFormatted = response.entity.unitPrice.toFixed(2);
        this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
        this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        purchaseOrderDetailViewModel.editQuantity = false;
        purchaseOrderDetailViewModel.editUnitPrice = false;
        purchaseOrderDetailViewModel.editProductNumber = false;
        purchaseOrderDetailViewModel.editMode = false;
        purchaseOrderDetailViewModel.disableAddButton = true;
        purchaseOrderDetailViewModel.disableSaveButton = true;
        purchaseOrderDetailViewModel.disableCancelButton = true;
        purchaseOrderDetailViewModel.disableDeleteButton = false;
        purchaseOrderDetailViewModel.disableEditButton = false;
        var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModelOriginalValues.unitPrice = response.entity.unitPrice;
        purchaseOrderDetailViewModelOriginalValues.orderQuantity = response.entity.orderQuantity;
        purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted = response.entity.orderQuantity.toFixed(0);
        purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted = response.entity.unitPrice.toFixed(2);
        this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
        this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].productNumber = ' ';
        this.purchaseOrderViewModel.purchaseOrderDetails[0].productDescription = ' ';
        this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPrice = 0.0;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].unitPriceFormatted = '';
        this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantity = 0;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].orderQuantityFormatted = '';
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editQuantity = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editUnitPrice = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editProductNumber = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].editMode = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableCancelButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableDeleteButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableEditButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableSaveButton = true;
        var message = 'Line Item successfully saved.';
        this.alertService.ShowSuccessMessage(message);
    };
    PurchaseOrderMaintenanceComponent.prototype.addLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.editLineItem = function (i) {
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editQuantity = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editUnitPrice = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editMode = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableAddButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = true;
        var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModelOriginalValues.unitPrice =
            this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice;
        purchaseOrderDetailViewModelOriginalValues.orderQuantity =
            this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity;
        purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity.toFixed(0);
        purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice.toFixed(2);
        this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i] =
            purchaseOrderDetailViewModelOriginalValues;
        this.setDisableSubmitButton();
    };
    PurchaseOrderMaintenanceComponent.prototype.updateLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.purchaseOrderDetailId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderDetailId;
        purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
        purchaseOrderDetailViewModel.productId = this.purchaseOrderViewModel.purchaseOrderDetails[i].productId;
        purchaseOrderDetailViewModel.productMasterId = this.purchaseOrderViewModel.purchaseOrderDetails[i].productMasterId;
        purchaseOrderDetailViewModel.productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[i].productNumber;
        purchaseOrderDetailViewModel.unitPrice = parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted);
        purchaseOrderDetailViewModel.orderQuantity = parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted, 0);
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantity =
            parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantityFormatted, 0);
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice =
            parseFloat(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted);
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/updatepurchaseorderdetail';
        this.httpService.HttpPost(url, purchaseOrderDetailViewModel)
            .subscribe(function (response) {
            _this.updateLineItemSuccess(response);
        }, function (response) { return _this.updateLineItemFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.deleteLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderId;
        purchaseOrderDetailViewModel.purchaseOrderDetailId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderDetailId;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/deletepurchaseorderdetail';
        this.httpService.HttpPost(url, purchaseOrderDetailViewModel)
            .subscribe(function (response) {
            _this.deleteLineItemSuccess(response);
        }, function (response) { return _this.deleteLineItemFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.cancelEdit = function (i) {
        this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPrice =
            this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPrice;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].unitPriceFormatted;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantity =
            this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantity;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues[i].orderQuantityFormatted;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editQuantity = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editUnitPrice = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editMode = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableAddButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = false;
        this.setEnableSubmitButton();
    };
    PurchaseOrderMaintenanceComponent.prototype.updateLineItemSuccess = function (response) {
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editQuantity = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editUnitPrice = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].editMode = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableAddButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableSaveButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableCancelButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableDeleteButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].disableEditButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantityFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice.toFixed(2);
        this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
        this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        this.setEnableSubmitButton();
        var message = 'Line Item successfully updated.';
        this.alertService.ShowSuccessMessage(message);
    };
    PurchaseOrderMaintenanceComponent.prototype.deleteLineItemSuccess = function (response) {
        this.purchaseOrderViewModel.purchaseOrderDetails.splice(this.currentLineItem, 1);
        this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.splice(this.currentLineItem, 1);
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
        this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
        this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        this.setEnableSubmitButton();
        var message = 'Line Item successfully deleted.';
        this.alertService.ShowSuccessMessage(message);
    };
    PurchaseOrderMaintenanceComponent.prototype.deleteLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.updateLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.setDisableSubmitButton = function () {
        this.disableSubmitButton = true;
    };
    PurchaseOrderMaintenanceComponent.prototype.setEnableSubmitButton = function () {
        this.disableSubmitButton = true;
        if (this.purchaseOrderViewModel.purchaseOrderDetails.length > 0 && this.purchaseOrderViewModel.purchaseOrderStatusDescription === 'Open') {
            this.disableSubmitButton = false;
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.submitPurchaseOrder = function () {
        var _this = this;
        var purchaseOrderViewModel = new _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_4__["PurchaseOrderViewModel"]();
        purchaseOrderViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/submitpurchaseorder';
        this.httpService.HttpPost(url, purchaseOrderViewModel)
            .subscribe(function (response) {
            _this.submitPurchaseOrderSuccess(response);
        }, function (response) { return _this.submitPurchaseOrderFailed(response); });
    };
    PurchaseOrderMaintenanceComponent.prototype.submitPurchaseOrderSuccess = function (response) {
        this.purchaseOrderViewModel.purchaseOrderStatusDescription = response.entity.purchaseOrderStatusDescription;
        this.setDisableSubmitButton();
        var message = 'Purchase Order Submitted.';
        this.alertService.ShowSuccessMessage(message);
    };
    PurchaseOrderMaintenanceComponent.prototype.submitPurchaseOrderFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderMaintenanceComponent.prototype.disablePurchaseOrderButtons = function () {
    };
    PurchaseOrderMaintenanceComponent.prototype.deleteLineItemDialog = function (i) {
        var _this = this;
        var productNumber = this.purchaseOrderViewModel.purchaseOrderDetails[i].productNumber;
        var orderQuantity = this.purchaseOrderViewModel.purchaseOrderDetails[i].orderQuantityFormatted;
        var unitPrice = this.purchaseOrderViewModel.purchaseOrderDetails[i].unitPriceFormatted;
        var index = i;
        var dialogRef = this.dialog.open(DeletePurchaseOrderLineItemDialogComponent, {
            width: '50%',
            data: {
                title: 'Delete Purchase Order Line Item',
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
    PurchaseOrderMaintenanceComponent.prototype.submitPurchaseOrderDialog = function () {
        var _this = this;
        var purchaseOrderNumber = this.purchaseOrderViewModel.purchaseOrderNumber;
        var orderTotal = this.purchaseOrderViewModel.orderTotalFormatted;
        var dialogRef = this.dialog.open(SubmitPurchaseOrderDialogComponent, {
            width: '50%',
            data: {
                title: 'Submit Purchase Order',
                orderTotal: orderTotal,
                purchaseOrderNumber: purchaseOrderNumber
            }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var returnedResponse = parseInt(result, 0);
            if (returnedResponse > 0) {
                _this.submitPurchaseOrder();
            }
        });
    };
    PurchaseOrderMaintenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-purchase-order-maintenance',
            template: __webpack_require__(/*! ./purchase-order-maintenance.component.html */ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.html"),
            styles: [__webpack_require__(/*! ./purchase-order-maintenance.component.css */ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_7__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_5__["SessionService"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"]])
    ], PurchaseOrderMaintenanceComponent);
    return PurchaseOrderMaintenanceComponent;
}());

var DeletePurchaseOrderLineItemDialogComponent = /** @class */ (function () {
    function DeletePurchaseOrderLineItemDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    DeletePurchaseOrderLineItemDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DeletePurchaseOrderLineItemDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-delete-purchase-order-lineitem-dialog',
            template: __webpack_require__(/*! ./delete-purchase-order-lineitem-dialog.html */ "./src/app/purchase-order-management/purchase-order-maintenance/delete-purchase-order-lineitem-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_9__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogRef"], Object])
    ], DeletePurchaseOrderLineItemDialogComponent);
    return DeletePurchaseOrderLineItemDialogComponent;
}());

var SubmitPurchaseOrderDialogComponent = /** @class */ (function () {
    function SubmitPurchaseOrderDialogComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    SubmitPurchaseOrderDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SubmitPurchaseOrderDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-submit-purchase-order-dialog',
            template: __webpack_require__(/*! ./submit-purchase-order-dialog.html */ "./src/app/purchase-order-management/purchase-order-maintenance/submit-purchase-order-dialog.html"),
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_9__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogRef"], Object])
    ], SubmitPurchaseOrderDialogComponent);
    return SubmitPurchaseOrderDialogComponent;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-maintenance/submit-purchase-order-dialog.html":
/*!********************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-maintenance/submit-purchase-order-dialog.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h1 mat-dialog-title>{{data.title}}</h1>\n<div mat-dialog-content>\n  <p>Are you sure you want to Submit this Purchase Order</p>\n  <mat-form-field>\n    <input matInput [disabled]=\"true\" [(ngModel)]=\"data.purchaseOrderNumber\" placeholder=\"Purchase Order #\">\n  </mat-form-field>&nbsp;\n\n  <mat-form-field>\n        <input matInput [disabled]=\"true\" [(ngModel)]=\"data.orderTotal\" placeholder=\"Order Total\">\n      </mat-form-field>&nbsp;\n</div>\n<div mat-dialog-actions>\n  <button mat-button [mat-dialog-close]=\"0\">No</button>\n  <button mat-button [mat-dialog-close]=\"1\" cdkFocusInitial>Yes</button>\n</div>\n"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.css":
/*!*****************************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.css ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar style=\"background-color:tomato\">\n\n  <div>\n    <a mat-list-item>\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Purchase Order Management</span>\n    </a>\n  </div>\n\n  <span class=\"spacer\"></span>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/purchaseordermanagement/supplier-maintenance']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Supplier Maintenance</span>\n    </a>\n  </div>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/purchaseordermanagement/supplier-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Supplier Inquiry</span>\n    </a>\n  </div>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/purchaseordermanagement/purchase-order-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Purchase Order Inquiry</span>\n    </a>\n  </div>\n\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.ts":
/*!****************************************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.ts ***!
  \****************************************************************************************************************************/
/*! exports provided: PurchaseOrderManagementNavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderManagementNavBarComponent", function() { return PurchaseOrderManagementNavBarComponent; });
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

var PurchaseOrderManagementNavBarComponent = /** @class */ (function () {
    function PurchaseOrderManagementNavBarComponent() {
    }
    PurchaseOrderManagementNavBarComponent.prototype.ngOnInit = function () {
    };
    PurchaseOrderManagementNavBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchase-order-management-nav-bar',
            template: __webpack_require__(/*! ./purchase-order-management-nav-bar.component.html */ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.html"),
            styles: [__webpack_require__(/*! ./purchase-order-management-nav-bar.component.css */ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PurchaseOrderManagementNavBarComponent);
    return PurchaseOrderManagementNavBarComponent;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-management.module.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-management.module.ts ***!
  \*******************************************************************************/
/*! exports provided: PurchaseOrderManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderManagementModule", function() { return PurchaseOrderManagementModule; });
/* harmony import */ var _supplier_maintenance_supplier_maintenance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./supplier-maintenance/supplier-maintenance.component */ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.ts");
/* harmony import */ var _supplier_inquiry_supplier_inquiry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./supplier-inquiry/supplier-inquiry.component */ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.ts");
/* harmony import */ var _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./purchase-order-maintenance/purchase-order-maintenance.component */ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.ts");
/* harmony import */ var _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./purchase-order-inquiry/purchase-order-inquiry.component */ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");
/* harmony import */ var _purchase_order_management_routing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./purchase-order-management.routing */ "./src/app/purchase-order-management/purchase-order-management.routing.ts");
/* harmony import */ var _purchase_order_management_nav_bar_purchase_order_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./purchase-order-management-nav-bar/purchase-order-management-nav-bar.component */ "./src/app/purchase-order-management/purchase-order-management-nav-bar/purchase-order-management-nav-bar.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var PurchaseOrderManagementModule = /** @class */ (function () {
    function PurchaseOrderManagementModule() {
    }
    PurchaseOrderManagementModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _purchase_order_management_routing__WEBPACK_IMPORTED_MODULE_8__["PurchaseOrderManagementRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_7__["MaterialModule"]
            ],
            entryComponents: [_purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["DeletePurchaseOrderLineItemDialogComponent"], _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SubmitPurchaseOrderDialogComponent"]],
            declarations: [_supplier_inquiry_supplier_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["SupplierInquiryComponent"], _supplier_maintenance_supplier_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["SupplierMaintenanceComponent"],
                _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_3__["PurchaseOrderInquiryComponent"], _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["PurchaseOrderMaintenanceComponent"],
                _purchase_order_management_nav_bar_purchase_order_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_9__["PurchaseOrderManagementNavBarComponent"], _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["DeletePurchaseOrderLineItemDialogComponent"], _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SubmitPurchaseOrderDialogComponent"]]
        })
    ], PurchaseOrderManagementModule);
    return PurchaseOrderManagementModule;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/purchase-order-management.routing.ts":
/*!********************************************************************************!*\
  !*** ./src/app/purchase-order-management/purchase-order-management.routing.ts ***!
  \********************************************************************************/
/*! exports provided: PurchaseOrderManagementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderManagementRoutingModule", function() { return PurchaseOrderManagementRoutingModule; });
/* harmony import */ var _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./purchase-order-maintenance/purchase-order-maintenance.component */ "./src/app/purchase-order-management/purchase-order-maintenance/purchase-order-maintenance.component.ts");
/* harmony import */ var _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-order-inquiry/purchase-order-inquiry.component */ "./src/app/purchase-order-management/purchase-order-inquiry/purchase-order-inquiry.component.ts");
/* harmony import */ var _supplier_maintenance_supplier_maintenance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./supplier-maintenance/supplier-maintenance.component */ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.ts");
/* harmony import */ var _supplier_inquiry_supplier_inquiry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./supplier-inquiry/supplier-inquiry.component */ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var PurchaseOrderManagementRoutes = [
    { path: '', component: _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["PurchaseOrderInquiryComponent"] },
    { path: 'supplier-maintenance', component: _supplier_maintenance_supplier_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SupplierMaintenanceComponent"] },
    { path: 'supplier-maintenance/:id', component: _supplier_maintenance_supplier_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["SupplierMaintenanceComponent"] },
    { path: 'supplier-inquiry', component: _supplier_inquiry_supplier_inquiry_component__WEBPACK_IMPORTED_MODULE_3__["SupplierInquiryComponent"] },
    { path: 'purchase-order-maintenance', component: _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderMaintenanceComponent"] },
    { path: 'purchase-order-maintenance/:id', component: _purchase_order_maintenance_purchase_order_maintenance_component__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderMaintenanceComponent"] },
    { path: 'purchase-order-inquiry', component: _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["PurchaseOrderInquiryComponent"] },
];
var PurchaseOrderManagementRoutingModule = /** @class */ (function () {
    function PurchaseOrderManagementRoutingModule() {
    }
    PurchaseOrderManagementRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild(PurchaseOrderManagementRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"]]
        })
    ], PurchaseOrderManagementRoutingModule);
    return PurchaseOrderManagementRoutingModule;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.css":
/*!*******************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.css ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-purchase-order-management-nav-bar></app-purchase-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Supplier Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{supplierInquiryViewModel.supplierName}}\"\n           [(ngModel)]=\"supplierInquiryViewModel.supplierName\"\n            placeholder=\"Supplier Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"supplierInquiryViewModel.totalSuppliers\" [showFirstLastButtons]=\"true\" [pageIndex]=\"supplierInquiryViewModel.currentPageIndex\"\n      [pageSize]=\"supplierInquiryViewModel.pageSize\" [pageSizeOptions]=\"supplierInquiryViewModel.pageSizeOptions\"\n      (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table class=\"table\" mat-table [dataSource]=\"supplierInquiryViewModel.suppliers\" matSort (matSortChange)=\"sortData($event)\" class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"supplierName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"SupplierName\">\n            Supplier Name\n         </th>\n        <td mat-cell *matCellDef=\"let element\">\n           <span class=\"table-responsive-custom\">Supplier Name:&nbsp;</span>\n          {{element.supplierName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"addressLine1\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"AddressLine1\"> Address Line 1 </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Address Line 1:&nbsp;</span>\n          {{element.addressLine1}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"addressLine2\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"AddressLine2\"> Address Line 2 </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Address Line 2:&nbsp;</span>\n          {{element.addressLine2}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <span class=\"table-responsive-custom\">City:&nbsp;</span>\n          {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">State:&nbsp;</span>\n           {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"postalCode\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PostalCode\"> Postal Code </th>\n        <td mat-cell *matCellDef=\"let element\">\n            <span class=\"table-responsive-custom\">Postal Code:&nbsp;</span>\n           {{element.postalCode}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"supplierInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: supplierInquiryViewModel.displayedColumns; let i = index\" (click)=\"selectSupplier(i)\"></tr>\n  \n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"supplierInquiryViewModel.totalSuppliers\" [showFirstLastButtons]=\"true\" [pageSize]=\"supplierInquiryViewModel.pageSize\"\n      [pageIndex]=\"supplierInquiryViewModel.currentPageIndex\" [pageSizeOptions]=\"supplierInquiryViewModel.pageSizeOptions\"\n      (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.ts ***!
  \******************************************************************************************/
/*! exports provided: SupplierInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierInquiryComponent", function() { return SupplierInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_supplier_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/supplier-inquiry.viewmodel */ "./src/app/purchase-order-management/view-models/supplier-inquiry.viewmodel.ts");
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









var SupplierInquiryComponent = /** @class */ (function () {
    function SupplierInquiryComponent(router, sessionService, httpService, alertService) {
        this.router = router;
        this.sessionService = sessionService;
        this.httpService = httpService;
        this.alertService = alertService;
        this.selectedRowIndex = -1;
        this.sessionService.moduleLoadedEvent.emit();
        this.supplierInquiryViewModel = new _view_models_supplier_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__["SupplierInquiryViewModel"]();
        this.supplierInquiryViewModel.pageSize = 20;
        this.supplierInquiryViewModel.displayedColumns = ['supplierName', 'addressLine1', 'addressLine2', 'city', 'region', 'postalCode'];
        this.supplierInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
        this.initializeSearch();
    }
    SupplierInquiryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (changes) {
            _this.supplierInquiryViewModel.currentPageNumber = 1;
            _this.supplierInquiryViewModel.currentPageIndex = 0;
            if (_this.lastSearchValue !== _this.supplierInquiryViewModel.supplierName) {
                _this.executeSearch();
            }
        });
        this.executeSearch();
    };
    SupplierInquiryComponent.prototype.initializeSearch = function () {
        this.supplierInquiryViewModel.supplierName = '';
        this.supplierInquiryViewModel.currentPageNumber = 1;
        this.supplierInquiryViewModel.currentPageIndex = 0;
        this.supplierInquiryViewModel.totalPages = 0;
        this.supplierInquiryViewModel.totalSuppliers = 0;
        this.supplierInquiryViewModel.sortDirection = '';
        this.supplierInquiryViewModel.sortExpression = '';
        this.supplierInquiryViewModel.suppliers = new Array();
    };
    SupplierInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/supplierinquiry';
        this.httpService.HttpPost(url, this.supplierInquiryViewModel).
            subscribe(function (response) {
            _this.supplierInquirySuccess(response);
        }, function (response) { return _this.supplierInquiryFailed(response); });
    };
    SupplierInquiryComponent.prototype.supplierInquirySuccess = function (response) {
        this.supplierInquiryViewModel.suppliers = response.entity;
        this.supplierInquiryViewModel.totalSuppliers = response.totalRows;
        this.supplierInquiryViewModel.totalPages = response.totalPages;
    };
    SupplierInquiryComponent.prototype.supplierInquiryFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SupplierInquiryComponent.prototype.onPaginateChange = function (event) {
        this.supplierInquiryViewModel.currentPageNumber = event.pageIndex + 1;
        this.supplierInquiryViewModel.currentPageIndex = event.pageIndex;
        this.supplierInquiryViewModel.pageSize = event.pageSize;
        this.executeSearch();
    };
    SupplierInquiryComponent.prototype.sortData = function (sort) {
        this.supplierInquiryViewModel.currentPageNumber = 1;
        this.supplierInquiryViewModel.currentPageIndex = 0;
        this.supplierInquiryViewModel.sortDirection = sort.direction;
        this.supplierInquiryViewModel.sortExpression = sort.active;
        this.executeSearch();
    };
    SupplierInquiryComponent.prototype.resetSearch = function () {
        this.lastSearchValue = '';
        this.supplierInquiryViewModel.supplierName = '';
        this.initializeSearch();
        this.executeSearch();
    };
    SupplierInquiryComponent.prototype.selectSupplier = function (row) {
        var supplierId = this.supplierInquiryViewModel.suppliers[row].supplierId;
        this.router.navigate(['/purchaseordermanagement/supplier-maintenance'], { queryParams: { id: supplierId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], SupplierInquiryComponent.prototype, "searchForm", void 0);
    SupplierInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-supplier-inquiry',
            template: __webpack_require__(/*! ./supplier-inquiry.component.html */ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./supplier-inquiry.component.css */ "./src/app/purchase-order-management/supplier-inquiry/supplier-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], SupplierInquiryComponent);
    return SupplierInquiryComponent;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-purchase-order-management-nav-bar></app-purchase-order-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Supplier Maintenance</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"SupplierName\" value=\"{{supplierViewModel.supplierName}}\" \n          [(ngModel)]=\"supplierViewModel.supplierName\" placeholder=\"Supplier Name\">\n        </mat-form-field>\n      </div>\n\n      \n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"AddressLine1\" value=\"{{supplierViewModel.AddressLine1}}\" \n          [(ngModel)]=\"supplierViewModel.addressLine1\" placeholder=\"Address Line 1\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"AddressLine2\" value=\"{{supplierViewModel.AddressLine2}}\" \n          [(ngModel)]=\"supplierViewModel.addressLine2\" placeholder=\"Address Line 2\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"City\" value=\"{{supplierViewModel.city}}\" \n          [(ngModel)]=\"supplierViewModel.city\" placeholder=\"City\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"Region\" value=\"{{supplierViewModel.region}}\" \n          [(ngModel)]=\"supplierViewModel.region\" placeholder=\"State/Region\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"readonlyMode\" matInput name=\"PostalCode\" value=\"{{supplierViewModel.postalCode}}\" \n          [(ngModel)]=\"supplierViewModel.postalCode\" placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n    <button [disabled]=\"readonlyMode==false\" mat-flat-button color=\"primary\" (click)=\"editSupplier()\">Edit Supplier</button>&nbsp;\n    <button [disabled]=\"readonlyMode==true\" mat-flat-button color=\"primary\" (click)=\"createOrUpdateSupplier()\">Save Supplier</button>&nbsp;\n    <button [disabled]=\"createMode==true\" mat-flat-button color=\"primary\"  (click)=\"createNewSupplier()\">Create New Supplier</button>&nbsp;\n    <button [disabled]=\"createMode==true || readonlyMode==false\" mat-flat-button color=\"primary\" (click)=\"createPurchaseOrder()\">Create Purchase Order</button>\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: SupplierMaintenanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierMaintenanceComponent", function() { return SupplierMaintenanceComponent; });
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_supplier_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view-models/supplier.viewmodel */ "./src/app/purchase-order-management/view-models/supplier.viewmodel.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../view-models/purchase-order.viewmodel */ "./src/app/purchase-order-management/view-models/purchase-order.viewmodel.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SupplierMaintenanceComponent = /** @class */ (function () {
    function SupplierMaintenanceComponent(router, route, sessionService, alertService, httpService) {
        this.router = router;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.httpService = httpService;
        this.supplierViewModel = new _view_models_supplier_viewmodel__WEBPACK_IMPORTED_MODULE_4__["SupplierViewModel"]();
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
    SupplierMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route
            .queryParams
            .subscribe(function (params) {
            _this.supplierViewModel.supplierId = +params['id'] || 0;
            if (_this.supplierViewModel.supplierId > 0) {
                _this.createMode = false;
                _this.readonlyMode = true;
                _this.getSupplierInformation();
            }
        });
    };
    SupplierMaintenanceComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    SupplierMaintenanceComponent.prototype.getSupplierInformation = function () {
        var _this = this;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/getsupplier';
        this.httpService.HttpPost(url, this.supplierViewModel).subscribe(function (response) {
            _this.getSupplierSuccess(response);
        }, function (response) { return _this.getSupplierFailed(response); });
    };
    SupplierMaintenanceComponent.prototype.initializeSupplier = function () {
        this.supplierViewModel = new _view_models_supplier_viewmodel__WEBPACK_IMPORTED_MODULE_4__["SupplierViewModel"]();
        this.supplierViewModel.supplierName = '';
        this.supplierViewModel.addressLine1 = '';
        this.supplierViewModel.addressLine2 = '';
        this.supplierViewModel.city = '';
        this.supplierViewModel.region = '';
        this.supplierViewModel.postalCode = '';
        this.supplierViewModel.supplierId = 0;
    };
    SupplierMaintenanceComponent.prototype.createNewSupplier = function () {
        this.readonlyMode = false;
        this.initializeSupplier();
    };
    SupplierMaintenanceComponent.prototype.getSupplierSuccess = function (response) {
        this.supplierViewModel = response.entity;
    };
    SupplierMaintenanceComponent.prototype.getSupplierFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SupplierMaintenanceComponent.prototype.createOrUpdateSupplier = function () {
        var _this = this;
        var supplier = new _view_models_supplier_viewmodel__WEBPACK_IMPORTED_MODULE_4__["SupplierViewModel"]();
        supplier = this.supplierViewModel;
        var url = '';
        if (supplier.supplierId === 0) {
            url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/createsupplier';
        }
        else {
            url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'supplier/updatesupplier';
        }
        this.httpService.HttpPost(url, supplier).subscribe(function (response) {
            _this.createOrUpdateSupplierSuccess(response);
        }, function (response) { return _this.createOrUpdateSupplierFailed(response); });
    };
    SupplierMaintenanceComponent.prototype.createOrUpdateSupplierSuccess = function (response) {
        var supplierViewModel = response.entity;
        this.supplierViewModel.supplierId = supplierViewModel.supplierId;
        var message = 'Supplier successfully saved.';
        this.alertService.ShowSuccessMessage(message);
        this.createMode = false;
        this.readonlyMode = true;
    };
    SupplierMaintenanceComponent.prototype.createOrUpdateSupplierFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SupplierMaintenanceComponent.prototype.editSupplier = function () {
        this.createMode = false;
        this.readonlyMode = false;
    };
    SupplierMaintenanceComponent.prototype.createPurchaseOrder = function () {
        var _this = this;
        var purchaseOrderViewModel = new _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_6__["PurchaseOrderViewModel"]();
        purchaseOrderViewModel.supplierId = this.supplierViewModel.supplierId;
        var url = this.sessionService.appSettings.purchaseOrderManagementWebApiUrl + 'purchaseorder/createpurchaseorder';
        this.httpService.HttpPost(url, purchaseOrderViewModel)
            .subscribe(function (response) {
            _this.createPurchaseOrderSuccess(response);
        }, function (response) { return _this.createPurchaseOrderFailed(response); });
    };
    SupplierMaintenanceComponent.prototype.createPurchaseOrderSuccess = function (response) {
        var purchaseOrderId = response.entity.purchaseOrderId;
        this.router.navigate(['/purchaseordermanagement/purchase-order-maintenance'], { queryParams: { id: purchaseOrderId } });
    };
    SupplierMaintenanceComponent.prototype.createPurchaseOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SupplierMaintenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-supplier-maintenance',
            template: __webpack_require__(/*! ./supplier-maintenance.component.html */ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.html"),
            styles: [__webpack_require__(/*! ./supplier-maintenance.component.css */ "./src/app/purchase-order-management/supplier-maintenance/supplier-maintenance.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__["SessionService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__["HttpService"]])
    ], SupplierMaintenanceComponent);
    return SupplierMaintenanceComponent;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/view-models/product.viewmodel.ts":
/*!****************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/product.viewmodel.ts ***!
  \****************************************************************************/
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

/***/ "./src/app/purchase-order-management/view-models/purchase-order-detail.viewmodel.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/purchase-order-detail.viewmodel.ts ***!
  \******************************************************************************************/
/*! exports provided: PurchaseOrderDetailViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderDetailViewModel", function() { return PurchaseOrderDetailViewModel; });
var PurchaseOrderDetailViewModel = /** @class */ (function () {
    function PurchaseOrderDetailViewModel() {
    }
    return PurchaseOrderDetailViewModel;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/view-models/purchase-order-inquiry.viewmodel.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/purchase-order-inquiry.viewmodel.ts ***!
  \*******************************************************************************************/
/*! exports provided: PurchaseOrderInquiryViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderInquiryViewModel", function() { return PurchaseOrderInquiryViewModel; });
var PurchaseOrderInquiryViewModel = /** @class */ (function () {
    function PurchaseOrderInquiryViewModel() {
    }
    return PurchaseOrderInquiryViewModel;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/view-models/purchase-order.viewmodel.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/purchase-order.viewmodel.ts ***!
  \***********************************************************************************/
/*! exports provided: PurchaseOrderViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderViewModel", function() { return PurchaseOrderViewModel; });
var PurchaseOrderViewModel = /** @class */ (function () {
    function PurchaseOrderViewModel() {
        this.purchaseOrderDetails = new Array();
        this.purchaseOrderDetailsOriginalValues = new Array();
    }
    return PurchaseOrderViewModel;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/view-models/supplier-inquiry.viewmodel.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/supplier-inquiry.viewmodel.ts ***!
  \*************************************************************************************/
/*! exports provided: SupplierInquiryViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierInquiryViewModel", function() { return SupplierInquiryViewModel; });
var SupplierInquiryViewModel = /** @class */ (function () {
    function SupplierInquiryViewModel() {
    }
    return SupplierInquiryViewModel;
}());



/***/ }),

/***/ "./src/app/purchase-order-management/view-models/supplier.viewmodel.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/purchase-order-management/view-models/supplier.viewmodel.ts ***!
  \*****************************************************************************/
/*! exports provided: SupplierViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SupplierViewModel", function() { return SupplierViewModel; });
var SupplierViewModel = /** @class */ (function () {
    function SupplierViewModel() {
    }
    return SupplierViewModel;
}());



/***/ })

}]);
//# sourceMappingURL=app-purchase-order-management-purchase-order-management-module.js.map