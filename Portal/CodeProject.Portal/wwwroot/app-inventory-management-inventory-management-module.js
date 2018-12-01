(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-inventory-management-inventory-management-module"],{

/***/ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.css":
/*!**************************************************************************************************************!*\
  !*** ./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.css ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.html":
/*!***************************************************************************************************************!*\
  !*** ./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"accent\" style=\"background-color:brown\">\n  <div>\n    <a mat-list-item>\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Inventory Management</span>\n    </a>\n  </div>\n  <span class=\"spacer\"></span>\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/product-maintenance']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Product Maintenance</span>\n    </a>\n  </div>\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/product-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Product Inquiry</span>\n    </a>\n  </div>\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/upload-product-master']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Upload Product Master</span>\n    </a>\n  </div>\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/sales-order-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Sales Order Inquiry</span>\n    </a>\n  </div>\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/purchase-order-inquiry']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Purchase Order Inquiry</span>\n    </a>\n  </div>\n\n  <div style=\"margin-right:20px;\" class=\"mat-body\">\n    <a mat-list-item [routerLink]=\"['/inventorymanagement/upload-product-master']\">\n      <mat-icon class=\"icon\">dashboard</mat-icon>\n      <span class=\"label\">Upload Product Master</span>\n    </a>\n  </div>\n</mat-toolbar>\n"

/***/ }),

/***/ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.ts ***!
  \*************************************************************************************************************/
/*! exports provided: InventoryManagementNavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryManagementNavBarComponent", function() { return InventoryManagementNavBarComponent; });
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

var InventoryManagementNavBarComponent = /** @class */ (function () {
    function InventoryManagementNavBarComponent() {
    }
    InventoryManagementNavBarComponent.prototype.ngOnInit = function () {
    };
    InventoryManagementNavBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inventory-management-nav-bar',
            template: __webpack_require__(/*! ./inventory-management-nav-bar.component.html */ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.html"),
            styles: [__webpack_require__(/*! ./inventory-management-nav-bar.component.css */ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InventoryManagementNavBarComponent);
    return InventoryManagementNavBarComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/inventory-management.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/inventory-management/inventory-management.module.ts ***!
  \*********************************************************************/
/*! exports provided: InventoryManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryManagementModule", function() { return InventoryManagementModule; });
/* harmony import */ var _upload_product_master_upload_product_master_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload-product-master/upload-product-master.component */ "./src/app/inventory-management/upload-product-master/upload-product-master.component.ts");
/* harmony import */ var _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-order-inquiry/purchase-order-inquiry.component */ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.ts");
/* harmony import */ var _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sales-order-inquiry/sales-order-inquiry.component */ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.ts");
/* harmony import */ var _inventory_management_nav_bar_inventory_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inventory-management-nav-bar/inventory-management-nav-bar.component */ "./src/app/inventory-management/inventory-management-nav-bar/inventory-management-nav-bar.component.ts");
/* harmony import */ var _purchase_order_receiving_purchase_order_receiving_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./purchase-order-receiving/purchase-order-receiving.component */ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.ts");
/* harmony import */ var _sales_order_shipments_sales_order_shipments_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sales-order-shipments/sales-order-shipments.component */ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.ts");
/* harmony import */ var _product_maintenance_product_maintenance_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./product-maintenance/product-maintenance.component */ "./src/app/inventory-management/product-maintenance/product-maintenance.component.ts");
/* harmony import */ var _product_inquiry_product_inquiry_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./product-inquiry/product-inquiry.component */ "./src/app/inventory-management/product-inquiry/product-inquiry.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _inventory_management_routing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./inventory-management.routing */ "./src/app/inventory-management/inventory-management.routing.ts");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../material.module */ "./src/app/material.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var InventoryManagementModule = /** @class */ (function () {
    function InventoryManagementModule() {
    }
    InventoryManagementModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_8__["NgModule"])({
            imports: [
                _inventory_management_routing__WEBPACK_IMPORTED_MODULE_11__["InventoryManagementRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_12__["MaterialModule"]
            ],
            declarations: [_product_inquiry_product_inquiry_component__WEBPACK_IMPORTED_MODULE_7__["ProductInquiryComponent"], _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_1__["PurchaseOrderInquiryComponent"], _product_maintenance_product_maintenance_component__WEBPACK_IMPORTED_MODULE_6__["ProductMaintenanceComponent"],
                _upload_product_master_upload_product_master_component__WEBPACK_IMPORTED_MODULE_0__["UploadProductMasterComponent"], _purchase_order_receiving_purchase_order_receiving_component__WEBPACK_IMPORTED_MODULE_4__["PurchaseOrderReceivingComponent"], _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_2__["SalesOrderInquiryComponent"],
                _sales_order_shipments_sales_order_shipments_component__WEBPACK_IMPORTED_MODULE_5__["SalesOrderShipmentsComponent"], _inventory_management_nav_bar_inventory_management_nav_bar_component__WEBPACK_IMPORTED_MODULE_3__["InventoryManagementNavBarComponent"]]
        })
    ], InventoryManagementModule);
    return InventoryManagementModule;
}());



/***/ }),

/***/ "./src/app/inventory-management/inventory-management.routing.ts":
/*!**********************************************************************!*\
  !*** ./src/app/inventory-management/inventory-management.routing.ts ***!
  \**********************************************************************/
/*! exports provided: InventoryManagementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InventoryManagementRoutingModule", function() { return InventoryManagementRoutingModule; });
/* harmony import */ var _upload_product_master_upload_product_master_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upload-product-master/upload-product-master.component */ "./src/app/inventory-management/upload-product-master/upload-product-master.component.ts");
/* harmony import */ var _purchase_order_receiving_purchase_order_receiving_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./purchase-order-receiving/purchase-order-receiving.component */ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.ts");
/* harmony import */ var _product_maintenance_product_maintenance_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-maintenance/product-maintenance.component */ "./src/app/inventory-management/product-maintenance/product-maintenance.component.ts");
/* harmony import */ var _product_inquiry_product_inquiry_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./product-inquiry/product-inquiry.component */ "./src/app/inventory-management/product-inquiry/product-inquiry.component.ts");
/* harmony import */ var _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./purchase-order-inquiry/purchase-order-inquiry.component */ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.ts");
/* harmony import */ var _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sales-order-inquiry/sales-order-inquiry.component */ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.ts");
/* harmony import */ var _sales_order_shipments_sales_order_shipments_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sales-order-shipments/sales-order-shipments.component */ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var InventoryManagementRoutes = [
    { path: '', component: _product_maintenance_product_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["ProductMaintenanceComponent"] },
    { path: 'product-maintenance', component: _product_maintenance_product_maintenance_component__WEBPACK_IMPORTED_MODULE_2__["ProductMaintenanceComponent"] },
    { path: 'product-inquiry', component: _product_inquiry_product_inquiry_component__WEBPACK_IMPORTED_MODULE_3__["ProductInquiryComponent"] },
    { path: 'upload-product-master', component: _upload_product_master_upload_product_master_component__WEBPACK_IMPORTED_MODULE_0__["UploadProductMasterComponent"] },
    { path: 'purchase-order-receiving', component: _purchase_order_receiving_purchase_order_receiving_component__WEBPACK_IMPORTED_MODULE_1__["PurchaseOrderReceivingComponent"] },
    { path: 'purchase-order-inquiry', component: _purchase_order_inquiry_purchase_order_inquiry_component__WEBPACK_IMPORTED_MODULE_4__["PurchaseOrderInquiryComponent"] },
    { path: 'sales-order-inquiry', component: _sales_order_inquiry_sales_order_inquiry_component__WEBPACK_IMPORTED_MODULE_5__["SalesOrderInquiryComponent"] },
    { path: 'sales-order-shipping', component: _sales_order_shipments_sales_order_shipments_component__WEBPACK_IMPORTED_MODULE_6__["SalesOrderShipmentsComponent"] }
];
var InventoryManagementRoutingModule = /** @class */ (function () {
    function InventoryManagementRoutingModule() {
    }
    InventoryManagementRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_7__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"].forChild(InventoryManagementRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"]]
        })
    ], InventoryManagementRoutingModule);
    return InventoryManagementRoutingModule;
}());



/***/ }),

/***/ "./src/app/inventory-management/product-inquiry/product-inquiry.component.css":
/*!************************************************************************************!*\
  !*** ./src/app/inventory-management/product-inquiry/product-inquiry.component.css ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/inventory-management/product-inquiry/product-inquiry.component.html":
/*!*************************************************************************************!*\
  !*** ./src/app/inventory-management/product-inquiry/product-inquiry.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Product Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{productInquiryViewModel.productNumber}}\" [(ngModel)]=\"productInquiryViewModel.productNumber\"\n            placeholder=\"Product\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"productInquiryViewModel.totalProducts\" [showFirstLastButtons]=\"true\"\n      [pageIndex]=\"productInquiryViewModel.currentPageIndex\" [pageSize]=\"productInquiryViewModel.pageSize\"\n      [pageSizeOptions]=\"productInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table mat-table [dataSource]=\"productInquiryViewModel.products\" matSort (matSortChange)=\"sortData($event)\"\n      class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"productNumber\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"ProductNumber\"> Product #</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.productNumber}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"description\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Description\">Product Description</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.description}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"unitPrice\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"UnitPrice\">Unit Price</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.unitPrice | currency}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"productInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: productInquiryViewModel.displayedColumns; let i = index\"\n        (click)=\"selectProduct(i)\"></tr>\n\n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n    <mat-paginator [length]=\"productInquiryViewModel.totalProducts\" [showFirstLastButtons]=\"true\"\n      [pageSize]=\"productInquiryViewModel.pageSize\" [pageIndex]=\"productInquiryViewModel.currentPageIndex\"\n      [pageSizeOptions]=\"productInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/inventory-management/product-inquiry/product-inquiry.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/inventory-management/product-inquiry/product-inquiry.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ProductInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductInquiryComponent", function() { return ProductInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_product_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .//../view-models/product-inquiry.viewmodel */ "./src/app/inventory-management/view-models/product-inquiry.viewmodel.ts");
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









var ProductInquiryComponent = /** @class */ (function () {
    function ProductInquiryComponent(router, sessionService, httpService, alertService) {
        this.router = router;
        this.sessionService = sessionService;
        this.httpService = httpService;
        this.alertService = alertService;
        this.selectedRowIndex = -1;
        this.sessionService.moduleLoadedEvent.emit();
        this.productInquiryViewModel = new _view_models_product_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__["ProductInquiryViewModel"]();
        this.productInquiryViewModel.pageSize = 20;
        this.productInquiryViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice'];
        this.productInquiryViewModel.pageSizeOptions = [5, 10, 25, 100];
        this.productInquiryViewModel.products = new Array();
        this.lastSearchValue = '';
        this.initializeSearch();
    }
    ProductInquiryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchForm.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["debounceTime"])(1000), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["distinctUntilChanged"])()).subscribe(function (changes) {
            _this.productInquiryViewModel.currentPageNumber = 1;
            _this.productInquiryViewModel.currentPageIndex = 0;
            if (_this.lastSearchValue !== _this.productInquiryViewModel.productNumber) {
                _this.executeSearch();
            }
        });
        this.executeSearch();
    };
    ProductInquiryComponent.prototype.initializeSearch = function () {
        this.productInquiryViewModel.productNumber = '';
        this.productInquiryViewModel.currentPageNumber = 1;
        this.productInquiryViewModel.currentPageIndex = 0;
        this.productInquiryViewModel.totalPages = 0;
        this.productInquiryViewModel.totalProducts = 0;
        this.productInquiryViewModel.sortDirection = 'ASC';
        this.productInquiryViewModel.sortExpression = 'ProductNumber';
        this.productInquiryViewModel.products = new Array();
    };
    ProductInquiryComponent.prototype.executeSearch = function () {
        var _this = this;
        this.lastSearchValue = this.productInquiryViewModel.productNumber;
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/productinquiry';
        this.httpService.HttpPost(url, this.productInquiryViewModel).
            subscribe(function (response) {
            _this.productInquirySuccess(response);
        }, function (response) { return _this.productInquiryFailed(response); });
    };
    ProductInquiryComponent.prototype.productInquirySuccess = function (response) {
        this.productInquiryViewModel.products = response.entity;
        this.productInquiryViewModel.totalProducts = response.totalRows;
        this.productInquiryViewModel.totalPages = response.totalPages;
    };
    ProductInquiryComponent.prototype.productInquiryFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    ProductInquiryComponent.prototype.onPaginateChange = function (event) {
        this.productInquiryViewModel.currentPageNumber = event.pageIndex + 1;
        this.productInquiryViewModel.currentPageIndex = event.pageIndex;
        this.productInquiryViewModel.pageSize = event.pageSize;
        this.executeSearch();
    };
    ProductInquiryComponent.prototype.sortData = function (sort) {
        this.productInquiryViewModel.currentPageNumber = 1;
        this.productInquiryViewModel.currentPageIndex = 0;
        this.productInquiryViewModel.sortDirection = sort.direction;
        this.productInquiryViewModel.sortExpression = sort.active;
        this.executeSearch();
    };
    ProductInquiryComponent.prototype.resetSearch = function () {
        this.lastSearchValue = '';
        this.productInquiryViewModel.productNumber = '';
        this.initializeSearch();
        this.executeSearch();
    };
    ProductInquiryComponent.prototype.selectProduct = function (row) {
        var productId = this.productInquiryViewModel.products[row].productId;
        this.router.navigate(['/inventorymanagement/product-maintenance'], { queryParams: { id: productId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], ProductInquiryComponent.prototype, "searchForm", void 0);
    ProductInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-inquiry',
            template: __webpack_require__(/*! ./product-inquiry.component.html */ "./src/app/inventory-management/product-inquiry/product-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./product-inquiry.component.css */ "./src/app/inventory-management/product-inquiry/product-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"],
            _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], ProductInquiryComponent);
    return ProductInquiryComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/product-maintenance/product-maintenance.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/inventory-management/product-maintenance/product-maintenance.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/inventory-management/product-maintenance/product-maintenance.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/inventory-management/product-maintenance/product-maintenance.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Product Maintenance</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"ProductNumber\" value=\"{{productViewModel.productNumber}}\" \n          [(ngModel)]=\"productViewModel.productNumber\" placeholder=\"Product Number\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Description\" placeholder=\"Description\" \n          value=\"{{productViewModel.description}}\" [(ngModel)]=\"productViewModel.description\">\n        </mat-form-field>\n      </div>\n\n    \n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"BinLocation\" placeholder=\"Bin Location\" \n          value=\"{{productViewModel.binLocation}}\" [(ngModel)]=\"productViewModel.binLocation\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"UnitPrice\" placeholder=\"Unit Price\" value=\"{{productViewModel.unitPrice}}\" \n          [(ngModel)]=\"productViewModel.unitPrice\">\n        </mat-form-field>\n      </div>\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-flat-button color=\"primary\" (click)=\"createOrUpdateProduct()\">Save Product</button>\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/inventory-management/product-maintenance/product-maintenance.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/inventory-management/product-maintenance/product-maintenance.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: ProductMaintenanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductMaintenanceComponent", function() { return ProductMaintenanceComponent; });
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../view-models/product.viewmodel */ "./src/app/inventory-management/view-models/product.viewmodel.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductMaintenanceComponent = /** @class */ (function () {
    function ProductMaintenanceComponent(sessionService, router, route, alertService, httpService) {
        this.sessionService = sessionService;
        this.router = router;
        this.route = route;
        this.alertService = alertService;
        this.httpService = httpService;
        this.productViewModel = new _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_4__["ProductViewModel"]();
        this.productViewModel.productNumber = '';
        this.productViewModel.description = '';
        this.productViewModel.binLocation = '';
        this.productViewModel.productId = 0;
    }
    ProductMaintenanceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.queryParams.subscribe(function (params) {
            _this.productViewModel.productId = +params['id'] || 0;
            if (_this.productViewModel.productId > 0) {
                _this.getProduct();
            }
        });
    };
    ProductMaintenanceComponent.prototype.getProduct = function () {
        var _this = this;
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/getproduct';
        this.httpService.HttpPost(url, this.productViewModel)
            .subscribe(function (response) {
            _this.getProductSuccess(response);
        }, function (response) { return _this.getProductFailed(response); });
    };
    ProductMaintenanceComponent.prototype.getProductSuccess = function (response) {
        var productViewModel = response.entity;
        this.productViewModel = productViewModel;
    };
    ProductMaintenanceComponent.prototype.getProductFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    ProductMaintenanceComponent.prototype.createOrUpdateProduct = function () {
        var _this = this;
        var product = new _view_models_product_viewmodel__WEBPACK_IMPORTED_MODULE_4__["ProductViewModel"]();
        product = this.productViewModel;
        var url = '';
        if (product.productId === 0) {
            url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/createproduct';
        }
        else {
            url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/updateproduct';
        }
        this.httpService.HttpPost(url, product).subscribe(function (response) {
            _this.createOrUpdateProductSuccess(response);
        }, function (response) { return _this.createOrUpdateProductFailed(response); });
    };
    ProductMaintenanceComponent.prototype.createOrUpdateProductSuccess = function (response) {
        var productViewModel = response.entity;
        this.productViewModel.productId = productViewModel.productId;
        var message = 'Product successfully saved.';
        this.alertService.ShowSuccessMessage(message);
    };
    ProductMaintenanceComponent.prototype.createOrUpdateProductFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    ProductMaintenanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-product-maintenance',
            template: __webpack_require__(/*! ./product-maintenance.component.html */ "./src/app/inventory-management/product-maintenance/product-maintenance.component.html"),
            styles: [__webpack_require__(/*! ./product-maintenance.component.css */ "./src/app/inventory-management/product-maintenance/product-maintenance.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_2__["SessionService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_0__["HttpService"]])
    ], ProductMaintenanceComponent);
    return ProductMaintenanceComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.css":
/*!**************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.html":
/*!***************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.html ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Purchase Order Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{purchaseOrderInquiryViewModel.supplierName}}\" [(ngModel)]=\"purchaseOrderInquiryViewModel.supplierName\"\n            placeholder=\"Supplier Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"purchaseOrderInquiryViewModel.totalPurchaseOrders\" [showFirstLastButtons]=\"true\"\n      [pageIndex]=\"purchaseOrderInquiryViewModel.currentPageIndex\" [pageSize]=\"purchaseOrderInquiryViewModel.pageSize\"\n      [pageSizeOptions]=\"purchaseOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table mat-table [dataSource]=\"purchaseOrderInquiryViewModel.purchaseOrders\" matSort (matSortChange)=\"sortData($event)\"\n      class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"purchaseOrderNumber\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PurchaseOrderNumber\"> PO Number</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.purchaseOrderNumber}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"supplierName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.Name\"> Supplier Name </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.supplierName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Supplier.Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"orderTotal\">\n          <th mat-header-cell *matHeaderCellDef  mat-sort-header=\"OrderTotal\">Order Total</th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.orderTotal | currency}} </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"orderDate\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"DateCreated\"> Order Date</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.orderDate}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"purchaseOrderStatusDescription\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"PurchaseOrderStatus.Description\">Status</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.purchaseOrderStatusDescription}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"purchaseOrderInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: purchaseOrderInquiryViewModel.displayedColumns; let i = index\"\n        (click)=\"selectPurchaseOrder(i)\"></tr>\n\n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"purchaseOrderInquiryViewModel.totalPurchaseOrders\" [showFirstLastButtons]=\"true\"\n      [pageSize]=\"purchaseOrderInquiryViewModel.pageSize\" [pageIndex]=\"purchaseOrderInquiryViewModel.currentPageIndex\"\n      [pageSizeOptions]=\"purchaseOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.ts":
/*!*************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.ts ***!
  \*************************************************************************************************/
/*! exports provided: PurchaseOrderInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderInquiryComponent", function() { return PurchaseOrderInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_purchase_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/purchase-order-inquiry.viewmodel */ "./src/app/inventory-management/view-models/purchase-order-inquiry.viewmodel.ts");
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
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'purchaseorder/purchaseorderinquiry';
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
        this.router.navigate(['/inventorymanagement/purchase-order-receiving'], { queryParams: { id: purchaseOrderId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], PurchaseOrderInquiryComponent.prototype, "searchForm", void 0);
    PurchaseOrderInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchase-order-inquiry',
            template: __webpack_require__(/*! ./purchase-order-inquiry.component.html */ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./purchase-order-inquiry.component.css */ "./src/app/inventory-management/purchase-order-inquiry/purchase-order-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"],
            _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], PurchaseOrderInquiryComponent);
    return PurchaseOrderInquiryComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.css":
/*!******************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.css ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.html":
/*!*******************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Purchase Order Receiving</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PurchaseOrderNumber\" value=\"{{purchaseOrderViewModel.purchaseOrderNumber}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.purchaseOrderNumber\" placeholder=\"Purchase Order #\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" type=\"date\" matInput name=\"OrderDate\" value=\"{{purchaseOrderViewModel.orderDate}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.orderDate\" placeholder=\"Order Date\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PurchaseOrderStatusDescription\" value=\"{{purchaseOrderViewModel.purchaseOrderStatusDescription}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.purchaseOrderStatusDescription\" placeholder=\"Status\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n            <input [disabled]=\"true\" matInput name=\"PurchaseOrderTotal\" value=\"{{purchaseOrderViewModel.orderTotalFormatted}}\"\n              [(ngModel)]=\"purchaseOrderViewModel.orderTotalFormatted\" placeholder=\"Order Total\">\n          </mat-form-field>\n\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SupplierName\" value=\"{{purchaseOrderViewModel.supplierName}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.supplierName\" placeholder=\"Supplier Name\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine1\" value=\"{{purchaseOrderViewModel.addressLine1}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.addressLine1\" placeholder=\"Address\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine2\" value=\"{{purchaseOrderViewModel.addressLine2}}\"\n            [(ngModel)]=\"purchaseOrderViewModel.addressLine2\" placeholder=\"Address\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"City\" value=\"{{purchaseOrderViewModel.city}}\" [(ngModel)]=\"purchaseOrderViewModel.city\"\n            placeholder=\"City\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"Region\" value=\"{{purchaseOrderViewModel.region}}\" [(ngModel)]=\"purchaseOrderViewModel.region\"\n            placeholder=\"State/Region\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PostalCode\" value=\"{{purchaseOrderViewModel.postalCode}}\" [(ngModel)]=\"purchaseOrderViewModel.postalCode\"\n            placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n      <div style=\"margin-top:10px; margin-bottom:20px\">\n        Purchase Order Details\n      </div>\n\n      <table #table mat-table [dataSource]=\"detailDataSource\" class=\"mat-elevation-z8\">\n\n        <ng-container matColumnDef=\"productNumber\">\n          <th mat-header-cell *matHeaderCellDef> Product Number</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input tabindex=\"1\" [disabled]=\"true\" matInput name=\"ProductNumberGrid{{i}}\"\n                [value]=\"element.productNumber\" [(ngModel)]=\"element.productNumber\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef> Description</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input [disabled]=\"true\" matInput name=\"DescriptionGrid{{i}}\" [value]=\"element.productDescription\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"unitPrice\">\n          <th mat-header-cell *matHeaderCellDef> Unit Price</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"2\" type=\"number\" [disabled]=\"true\" matInput name=\"UnitPriceGrid{{i}}\" [value]=\"element.unitPriceFormatted\"\n                [(ngModel)]=\"element.unitPriceFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"orderQuantity\">\n          <th mat-header-cell *matHeaderCellDef> Order Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" [disabled]=\"true\" matInput name=\"OrderQuantityGrid{{i}}\" [value]=\"element.orderQuantityFormatted\"\n                [(ngModel)]=\"element.orderQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        \n        <ng-container matColumnDef=\"receivedQuantity\">\n          <th mat-header-cell *matHeaderCellDef>Received Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" [disabled]=\"true\" matInput name=\"ReceivedQuantityGrid{{i}}\" [value]=\"element.receivedQuantityFormatted\"\n                [(ngModel)]=\"element.receivedQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"currentReceivedQuantity\">\n          <th mat-header-cell *matHeaderCellDef>Current Received Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" required [disabled]=\"!element.editCurrentReceivedQuantity\" matInput name=\"CurrentReceivedQuantityGrid{{i}}\" [value]=\"element.currentReceivedQuantity\"\n                [(ngModel)]=\"element.currentReceivedQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef>Actions</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n\n            <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n            \n              <button mat-menu-item [disabled]=\"element.disableEditButton\" (click)=\"editLineItem(i)\">\n                <mat-icon>edit</mat-icon>\n                <span>Edit</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableCancelButton\" (click)=\"cancelEdit(i)\">\n                <mat-icon>undo</mat-icon>\n                <span>Cancel</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableSaveButton\" (click)=\"updateLineItem(i)\">\n                <mat-icon>save</mat-icon>\n                <span>Save</span>\n              </button>\n           \n            </mat-menu>\n\n          </td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"purchaseOrderViewModel.displayedColumns\"></tr>\n        <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: purchaseOrderViewModel.displayedColumns; let i = index\"></tr>\n\n      </table>\n\n    </form>\n  </mat-card-content>\n \n</mat-card>"

/***/ }),

/***/ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.ts ***!
  \*****************************************************************************************************/
/*! exports provided: PurchaseOrderReceivingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseOrderReceivingComponent", function() { return PurchaseOrderReceivingComponent; });
/* harmony import */ var _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-models/purchase-order-detail.viewmodel */ "./src/app/inventory-management/view-models/purchase-order-detail.viewmodel.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view-models/purchase-order.viewmodel */ "./src/app/inventory-management/view-models/purchase-order.viewmodel.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PurchaseOrderReceivingComponent = /** @class */ (function () {
    function PurchaseOrderReceivingComponent(dialog, router, httpService, route, sessionService, alertService) {
        this.dialog = dialog;
        this.router = router;
        this.httpService = httpService;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.detailDataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"]();
        this.disableSubmitButton = true;
        this.purchaseOrderViewModel = new _view_models_purchase_order_viewmodel__WEBPACK_IMPORTED_MODULE_3__["PurchaseOrderViewModel"]();
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
    }
    PurchaseOrderReceivingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.queryParams.subscribe(function (params) {
            _this.purchaseOrderViewModel.purchaseOrderId = +params['id'] || 0;
            if (_this.purchaseOrderViewModel.purchaseOrderId > 0) {
                _this.getPurchaseOrder();
            }
        });
    };
    PurchaseOrderReceivingComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    PurchaseOrderReceivingComponent.prototype.getPurchaseOrder = function () {
        var _this = this;
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'purchaseorder/getpurchaseorder';
        this.httpService.HttpPost(url, this.purchaseOrderViewModel)
            .subscribe(function (response) {
            _this.getPurchaseOrderSuccess(response);
        }, function (response) { return _this.getPurchaseOrderFailed(response); });
    };
    PurchaseOrderReceivingComponent.prototype.getPurchaseOrderSuccess = function (response) {
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
            var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
            purchaseOrderDetailViewModelOriginalValues.unitPrice = element.unitPrice;
            purchaseOrderDetailViewModelOriginalValues.orderQuantity = element.orderQuantity;
            purchaseOrderDetailViewModelOriginalValues.orderQuantityFormatted = element.orderQuantity.toFixed(0);
            purchaseOrderDetailViewModelOriginalValues.receivedQuantityFormatted = element.receivedQuantity.toFixed(0);
            purchaseOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);
            _this.purchaseOrderViewModel.purchaseOrderDetails.push(purchaseOrderDetailViewModel);
            _this.purchaseOrderViewModel.purchaseOrderDetailsOriginalValues.push(purchaseOrderDetailViewModelOriginalValues);
        });
        this.detailDataSource.data = this.purchaseOrderViewModel.purchaseOrderDetails;
        this.purchaseOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice',
            'orderQuantity', 'receivedQuantity', 'currentReceivedQuantity', 'actions'];
        if (this.purchaseOrderViewModel.purchaseOrderStatusDescription !== 'Open') {
            this.disablePurchaseOrderButtons();
        }
    };
    PurchaseOrderReceivingComponent.prototype.getPurchaseOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderReceivingComponent.prototype.getProductFailed = function (error) {
        this.purchaseOrderViewModel.purchaseOrderDetails[0].disableAddButton = true;
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderReceivingComponent.prototype.editLineItem = function (i) {
        this.purchaseOrderViewModel.purchaseOrderDetails[i].editCurrentReceivedQuantity = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableSaveButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableCancelButton = false;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableDeleteButton = true;
        this.purchaseOrderViewModel.purchaseOrderDetails[i].disableEditButton = true;
        var purchaseOrderDetailViewModelOriginalValues = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
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
    };
    PurchaseOrderReceivingComponent.prototype.updateLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var purchaseOrderDetailViewModel = new _view_models_purchase_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["PurchaseOrderDetailViewModel"]();
        purchaseOrderDetailViewModel.purchaseOrderDetailId = this.purchaseOrderViewModel.purchaseOrderDetails[i].purchaseOrderDetailId;
        purchaseOrderDetailViewModel.purchaseOrderId = this.purchaseOrderViewModel.purchaseOrderId;
        purchaseOrderDetailViewModel.currentReceivedQuantity =
            parseInt(this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].currentReceivedQuantityFormatted, 0);
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'purchaseorder/updatepurchaseorderdetail';
        this.httpService.HttpPost(url, purchaseOrderDetailViewModel)
            .subscribe(function (response) {
            _this.updateLineItemSuccess(response);
        }, function (response) { return _this.updateLineItemFailed(response); });
    };
    PurchaseOrderReceivingComponent.prototype.cancelEdit = function (i) {
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
    };
    PurchaseOrderReceivingComponent.prototype.updateLineItemSuccess = function (response) {
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
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].currentReceivedQuantityFormatted = '';
        this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPriceFormatted =
            this.purchaseOrderViewModel.purchaseOrderDetails[this.currentLineItem].unitPrice.toFixed(2);
        this.purchaseOrderViewModel.orderTotal = response.entity.orderTotal;
        this.purchaseOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        this.setEnableSubmitButton();
        var message = 'Line Item successfully updated.';
        this.alertService.ShowSuccessMessage(message);
    };
    PurchaseOrderReceivingComponent.prototype.updateLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    PurchaseOrderReceivingComponent.prototype.setDisableSubmitButton = function () {
        this.disableSubmitButton = true;
    };
    PurchaseOrderReceivingComponent.prototype.setEnableSubmitButton = function () {
        this.disableSubmitButton = true;
        if (this.purchaseOrderViewModel.orderTotal > 0 && this.purchaseOrderViewModel.purchaseOrderStatusDescription === 'Open') {
            this.disableSubmitButton = false;
        }
    };
    PurchaseOrderReceivingComponent.prototype.disablePurchaseOrderButtons = function () {
    };
    PurchaseOrderReceivingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-purchase-order-receiving',
            template: __webpack_require__(/*! ./purchase-order-receiving.component.html */ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.html"),
            styles: [__webpack_require__(/*! ./purchase-order-receiving.component.css */ "./src/app/inventory-management/purchase-order-receiving/purchase-order-receiving.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"]])
    ], PurchaseOrderReceivingComponent);
    return PurchaseOrderReceivingComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.css":
/*!********************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.css ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.html":
/*!*********************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.html ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Sales Order Inquiry</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form #form=\"ngForm\">\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"Name\" #searchField value=\"{{salesOrderInquiryViewModel.customerName}}\" [(ngModel)]=\"salesOrderInquiryViewModel.customerName\"\n            placeholder=\"Customer Name\">\n        </mat-form-field>\n        &nbsp;\n        <button mat-flat-button color=\"primary\" (click)=\"resetSearch()\">Reset</button>&nbsp;\n      </div>\n\n    </form>\n\n    <mat-paginator [length]=\"salesOrderInquiryViewModel.totalSalesOrders\" [showFirstLastButtons]=\"true\"\n      [pageIndex]=\"salesOrderInquiryViewModel.currentPageIndex\" [pageSize]=\"salesOrderInquiryViewModel.pageSize\"\n      [pageSizeOptions]=\"salesOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n    <table mat-table [dataSource]=\"salesOrderInquiryViewModel.salesOrders\" matSort (matSortChange)=\"sortData($event)\"\n      class=\"mat-elevation-z8\">\n\n      <ng-container matColumnDef=\"salesOrderNumber\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"SalesOrderNumber\"> PO Number</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.salesOrderNumber}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"customerName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.Name\"> Customer Name </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.customerName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"city\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.City\"> City </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.city}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"region\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"Customer.Region\"> State </th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.region}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"orderTotal\">\n          <th mat-header-cell *matHeaderCellDef  mat-sort-header=\"OrderTotal\">Order Total</th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.orderTotal | currency}} </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"orderDate\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"DateCreated\"> Order Date</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.orderDate}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"salesOrderStatusDescription\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header=\"SalesOrderStatus.Description\">Status</th>\n        <td mat-cell *matCellDef=\"let element\"> {{element.salesOrderStatusDescription}} </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"salesOrderInquiryViewModel.displayedColumns\"></tr>\n      <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: salesOrderInquiryViewModel.displayedColumns; let i = index\"\n        (click)=\"selectSalesOrder(i)\"></tr>\n\n    </table>\n\n  </mat-card-content>\n  <mat-card-actions>\n\n\n    <mat-paginator [length]=\"salesOrderInquiryViewModel.totalSalesOrders\" [showFirstLastButtons]=\"true\"\n      [pageSize]=\"salesOrderInquiryViewModel.pageSize\" [pageIndex]=\"salesOrderInquiryViewModel.currentPageIndex\"\n      [pageSizeOptions]=\"salesOrderInquiryViewModel.pageSizeOptions\" (page)=\"onPaginateChange($event)\"></mat-paginator>\n\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: SalesOrderInquiryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderInquiryComponent", function() { return SalesOrderInquiryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _view_models_sales_order_inquiry_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../view-models/sales-order-inquiry.viewmodel */ "./src/app/inventory-management/view-models/sales-order-inquiry.viewmodel.ts");
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
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/salesorderinquiry';
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
        this.router.navigate(['/inventorymanagement/sales-order-shipping'], { queryParams: { id: salesOrderId } });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('form'),
        __metadata("design:type", _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"])
    ], SalesOrderInquiryComponent.prototype, "searchForm", void 0);
    SalesOrderInquiryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sales-order-inquiry',
            template: __webpack_require__(/*! ./sales-order-inquiry.component.html */ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.html"),
            styles: [__webpack_require__(/*! ./sales-order-inquiry.component.css */ "./src/app/inventory-management/sales-order-inquiry/sales-order-inquiry.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"],
            _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_3__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]])
    ], SalesOrderInquiryComponent);
    return SalesOrderInquiryComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n    width: 100%;\n  }\n\n  .highlight{\n    background: #42A948; /* green */\n  }"

/***/ }),

/***/ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Sales Order Receiving</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SalesOrderNumber\" value=\"{{salesOrderViewModel.salesOrderNumber}}\"\n            [(ngModel)]=\"salesOrderViewModel.salesOrderNumber\" placeholder=\"Sales Order #\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" type=\"date\" matInput name=\"OrderDate\" value=\"{{salesOrderViewModel.orderDate}}\"\n            [(ngModel)]=\"salesOrderViewModel.orderDate\" placeholder=\"Order Date\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SalesOrderStatusDescription\" value=\"{{salesOrderViewModel.salesOrderStatusDescription}}\"\n            [(ngModel)]=\"salesOrderViewModel.salesOrderStatusDescription\" placeholder=\"Status\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n            <input [disabled]=\"true\" matInput name=\"SalesOrderTotal\" value=\"{{salesOrderViewModel.orderTotalFormatted}}\"\n              [(ngModel)]=\"salesOrderViewModel.orderTotalFormatted\" placeholder=\"Order Total\">\n          </mat-form-field>\n\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"SupplierName\" value=\"{{salesOrderViewModel.supplierName}}\"\n            [(ngModel)]=\"salesOrderViewModel.supplierName\" placeholder=\"Supplier Name\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine1\" value=\"{{salesOrderViewModel.addressLine1}}\"\n            [(ngModel)]=\"salesOrderViewModel.addressLine1\" placeholder=\"Address\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"AddressLine2\" value=\"{{salesOrderViewModel.addressLine2}}\"\n            [(ngModel)]=\"salesOrderViewModel.addressLine2\" placeholder=\"Address\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"City\" value=\"{{salesOrderViewModel.city}}\" [(ngModel)]=\"salesOrderViewModel.city\"\n            placeholder=\"City\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"Region\" value=\"{{salesOrderViewModel.region}}\" [(ngModel)]=\"salesOrderViewModel.region\"\n            placeholder=\"State/Region\">\n        </mat-form-field>\n\n        <mat-form-field style=\"width:300px\">\n          <input [disabled]=\"true\" matInput name=\"PostalCode\" value=\"{{salesOrderViewModel.postalCode}}\" [(ngModel)]=\"salesOrderViewModel.postalCode\"\n            placeholder=\"Postal Code\">\n        </mat-form-field>\n      </div>\n\n      <div style=\"margin-top:10px; margin-bottom:20px\">\n        Sales Order Details\n      </div>\n\n      <table #table mat-table [dataSource]=\"detailDataSource\" class=\"mat-elevation-z8\">\n\n        <ng-container matColumnDef=\"productNumber\">\n          <th mat-header-cell *matHeaderCellDef> Product Number</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input tabindex=\"1\" [disabled]=\"true\" matInput name=\"ProductNumberGrid{{i}}\"\n                [value]=\"element.productNumber\" [(ngModel)]=\"element.productNumber\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"description\">\n          <th mat-header-cell *matHeaderCellDef> Description</th>\n          <td mat-cell *matCellDef=\"let element;  let i = index;\">\n            <mat-form-field style=\"width:250px !important\">\n              <input [disabled]=\"true\" matInput name=\"DescriptionGrid{{i}}\" [value]=\"element.productDescription\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"unitPrice\">\n          <th mat-header-cell *matHeaderCellDef> Unit Price</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"2\" type=\"number\" [disabled]=\"true\" matInput name=\"UnitPriceGrid{{i}}\" [value]=\"element.unitPriceFormatted\"\n                [(ngModel)]=\"element.unitPriceFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"orderQuantity\">\n          <th mat-header-cell *matHeaderCellDef> Order Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" [disabled]=\"true\" matInput name=\"OrderQuantityGrid{{i}}\" [value]=\"element.orderQuantityFormatted\"\n                [(ngModel)]=\"element.orderQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        \n        <ng-container matColumnDef=\"shippedQuantity\">\n          <th mat-header-cell *matHeaderCellDef>Shipped Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" [disabled]=\"true\" matInput name=\"ShippedQuantityGrid{{i}}\" [value]=\"element.shippedQuantityFormatted\"\n                [(ngModel)]=\"element.shippedQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"currentShippedQuantity\">\n          <th mat-header-cell *matHeaderCellDef>Current Shipped Quantity</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n            <mat-form-field style=\"width:100px !important\">\n              <input tabindex=\"3\" type=\"number\" required [disabled]=\"!element.editCurrentShippedQuantity\" matInput name=\"CurrentShippedQuantityGrid{{i}}\" [value]=\"element.currentShippedQuantity\"\n                [(ngModel)]=\"element.currentShippedQuantityFormatted\">\n            </mat-form-field>\n          </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef>Actions</th>\n          <td mat-cell *matCellDef=\"let element; let i = index;\">\n\n            <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n              <mat-icon>more_vert</mat-icon>\n            </button>\n            <mat-menu #menu=\"matMenu\">\n            \n              <button mat-menu-item [disabled]=\"element.disableEditButton\" (click)=\"editLineItem(i)\">\n                <mat-icon>edit</mat-icon>\n                <span>Edit</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableCancelButton\" (click)=\"cancelEdit(i)\">\n                <mat-icon>undo</mat-icon>\n                <span>Cancel</span>\n              </button>\n              <button mat-menu-item [disabled]=\"element.disableSaveButton\" (click)=\"updateLineItem(i)\">\n                <mat-icon>save</mat-icon>\n                <span>Save</span>\n              </button>\n           \n            </mat-menu>\n\n          </td>\n        </ng-container>\n\n        <tr mat-header-row *matHeaderRowDef=\"salesOrderViewModel.displayedColumns\"></tr>\n        <tr style=\"cursor: pointer;\" mat-row *matRowDef=\"let row; columns: salesOrderViewModel.displayedColumns; let i = index\"></tr>\n\n      </table>\n\n    </form>\n  </mat-card-content>\n \n</mat-card>"

/***/ }),

/***/ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: SalesOrderShipmentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesOrderShipmentsComponent", function() { return SalesOrderShipmentsComponent; });
/* harmony import */ var _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-models/sales-order-detail.viewmodel */ "./src/app/inventory-management/view-models/sales-order-detail.viewmodel.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../view-models/sales-order.viewmodel */ "./src/app/inventory-management/view-models/sales-order.viewmodel.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var SalesOrderShipmentsComponent = /** @class */ (function () {
    function SalesOrderShipmentsComponent(dialog, router, httpService, route, sessionService, alertService) {
        this.dialog = dialog;
        this.router = router;
        this.httpService = httpService;
        this.route = route;
        this.sessionService = sessionService;
        this.alertService = alertService;
        this.detailDataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_7__["MatTableDataSource"]();
        this.disableSubmitButton = true;
        this.salesOrderViewModel = new _view_models_sales_order_viewmodel__WEBPACK_IMPORTED_MODULE_3__["SalesOrderViewModel"]();
        this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;
    }
    SalesOrderShipmentsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerSubscription = this.route.queryParams.subscribe(function (params) {
            _this.salesOrderViewModel.salesOrderId = +params['id'] || 0;
            if (_this.salesOrderViewModel.salesOrderId > 0) {
                _this.getSalesOrder();
            }
        });
    };
    SalesOrderShipmentsComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    SalesOrderShipmentsComponent.prototype.getSalesOrder = function () {
        var _this = this;
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/getsalesorder';
        this.httpService.HttpPost(url, this.salesOrderViewModel)
            .subscribe(function (response) {
            _this.getSalesOrderSuccess(response);
        }, function (response) { return _this.getSalesOrderFailed(response); });
    };
    SalesOrderShipmentsComponent.prototype.getSalesOrderSuccess = function (response) {
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
            salesOrderDetailViewModel.shippedQuantityFormatted = element.shippedQuantity.toFixed(0);
            salesOrderDetailViewModel.unitPriceFormatted = element.unitPrice.toFixed(2);
            salesOrderDetailViewModel.editCurrentShippedQuantity = false;
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
            salesOrderDetailViewModelOriginalValues.shippedQuantityFormatted = element.shippedQuantity.toFixed(0);
            salesOrderDetailViewModelOriginalValues.unitPriceFormatted = element.unitPrice.toFixed(2);
            _this.salesOrderViewModel.salesOrderDetails.push(salesOrderDetailViewModel);
            _this.salesOrderViewModel.salesOrderDetailsOriginalValues.push(salesOrderDetailViewModelOriginalValues);
        });
        this.detailDataSource.data = this.salesOrderViewModel.salesOrderDetails;
        this.salesOrderViewModel.displayedColumns = ['productNumber', 'description', 'unitPrice',
            'orderQuantity', 'shippedQuantity', 'currentShippedQuantity', 'actions'];
        if (this.salesOrderViewModel.salesOrderStatusDescription !== 'Open') {
            this.disableSalesOrderButtons();
        }
    };
    SalesOrderShipmentsComponent.prototype.getSalesOrderFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderShipmentsComponent.prototype.getProductFailed = function (error) {
        this.salesOrderViewModel.salesOrderDetails[0].disableAddButton = true;
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderShipmentsComponent.prototype.editLineItem = function (i) {
        this.salesOrderViewModel.salesOrderDetails[i].editCurrentShippedQuantity = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = true;
        var salesOrderDetailViewModelOriginalValues = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
        salesOrderDetailViewModelOriginalValues.unitPrice =
            this.salesOrderViewModel.salesOrderDetails[i].unitPrice;
        salesOrderDetailViewModelOriginalValues.orderQuantity =
            this.salesOrderViewModel.salesOrderDetails[i].orderQuantity;
        salesOrderDetailViewModelOriginalValues.shippedQuantity =
            this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity;
        salesOrderDetailViewModelOriginalValues.orderQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetails[i].orderQuantity.toFixed(0);
        salesOrderDetailViewModelOriginalValues.shippedQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity.toFixed(0);
        salesOrderDetailViewModelOriginalValues.unitPriceFormatted =
            this.salesOrderViewModel.salesOrderDetails[i].unitPrice.toFixed(2);
        this.salesOrderViewModel.salesOrderDetailsOriginalValues[i] =
            salesOrderDetailViewModelOriginalValues;
        this.setDisableSubmitButton();
    };
    SalesOrderShipmentsComponent.prototype.updateLineItem = function (i) {
        var _this = this;
        this.currentLineItem = i;
        var salesOrderDetailViewModel = new _view_models_sales_order_detail_viewmodel__WEBPACK_IMPORTED_MODULE_0__["SalesOrderDetailViewModel"]();
        salesOrderDetailViewModel.salesOrderDetailId = this.salesOrderViewModel.salesOrderDetails[i].salesOrderDetailId;
        salesOrderDetailViewModel.salesOrderId = this.salesOrderViewModel.salesOrderId;
        salesOrderDetailViewModel.currentShippedQuantity =
            parseInt(this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].currentShippedQuantityFormatted, 0);
        var url = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'salesorder/updatesalesorderdetail';
        this.httpService.HttpPost(url, salesOrderDetailViewModel)
            .subscribe(function (response) {
            _this.updateLineItemSuccess(response);
        }, function (response) { return _this.updateLineItemFailed(response); });
    };
    SalesOrderShipmentsComponent.prototype.cancelEdit = function (i) {
        this.salesOrderViewModel.salesOrderDetails[i].unitPrice =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPrice;
        this.salesOrderViewModel.salesOrderDetails[i].unitPriceFormatted =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].unitPriceFormatted;
        this.salesOrderViewModel.salesOrderDetails[i].orderQuantity =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantity;
        this.salesOrderViewModel.salesOrderDetails[i].shippedQuantity =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].shippedQuantity;
        this.salesOrderViewModel.salesOrderDetails[i].currentShippedQuantity = 0;
        this.salesOrderViewModel.salesOrderDetails[i].currentShippedQuantityFormatted = '';
        this.salesOrderViewModel.salesOrderDetails[i].orderQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].orderQuantityFormatted;
        this.salesOrderViewModel.salesOrderDetails[i].shippedQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetailsOriginalValues[i].shippedQuantityFormatted;
        this.salesOrderViewModel.salesOrderDetails[i].editCurrentShippedQuantity = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableAddButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableSaveButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableCancelButton = true;
        this.salesOrderViewModel.salesOrderDetails[i].disableDeleteButton = false;
        this.salesOrderViewModel.salesOrderDetails[i].disableEditButton = false;
        this.setEnableSubmitButton();
    };
    SalesOrderShipmentsComponent.prototype.updateLineItemSuccess = function (response) {
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].editCurrentShippedQuantity = false;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableAddButton = true;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableSaveButton = true;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableCancelButton = true;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableDeleteButton = false;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].disableEditButton = false;
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].orderQuantity.toFixed(0);
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].shippedQuantityFormatted =
            this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].shippedQuantity.toFixed(0);
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].currentShippedQuantityFormatted = '';
        this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPriceFormatted =
            this.salesOrderViewModel.salesOrderDetails[this.currentLineItem].unitPrice.toFixed(2);
        this.salesOrderViewModel.orderTotal = response.entity.orderTotal;
        this.salesOrderViewModel.orderTotalFormatted = response.entity.orderTotal.toFixed(2);
        this.setEnableSubmitButton();
        var message = 'Line Item successfully updated.';
        this.alertService.ShowSuccessMessage(message);
    };
    SalesOrderShipmentsComponent.prototype.updateLineItemFailed = function (error) {
        var errorResponse = error.error;
        console.log(error.status + ' error status');
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    SalesOrderShipmentsComponent.prototype.setDisableSubmitButton = function () {
        this.disableSubmitButton = true;
    };
    SalesOrderShipmentsComponent.prototype.setEnableSubmitButton = function () {
        this.disableSubmitButton = true;
        if (this.salesOrderViewModel.orderTotal > 0 && this.salesOrderViewModel.salesOrderStatusDescription === 'Open') {
            this.disableSubmitButton = false;
        }
    };
    SalesOrderShipmentsComponent.prototype.disableSalesOrderButtons = function () {
    };
    SalesOrderShipmentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-sales-order-shipments',
            template: __webpack_require__(/*! ./sales-order-shipments.component.html */ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.html"),
            styles: [__webpack_require__(/*! ./sales-order-shipments.component.css */ "./src/app/inventory-management/sales-order-shipments/sales-order-shipments.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_8__["MatDialog"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_6__["HttpService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"]])
    ], SalesOrderShipmentsComponent);
    return SalesOrderShipmentsComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/upload-product-master/upload-product-master.component.css":
/*!************************************************************************************************!*\
  !*** ./src/app/inventory-management/upload-product-master/upload-product-master.component.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/inventory-management/upload-product-master/upload-product-master.component.html":
/*!*************************************************************************************************!*\
  !*** ./src/app/inventory-management/upload-product-master/upload-product-master.component.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-inventory-management-nav-bar></app-inventory-management-nav-bar>\n\n<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Upload Product Master</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n\n    <label for=\"singleFile\">Upload file</label>\n    <input id=\"singleFile\" type=\"file\" [fileUploadInputFor]=\"fileUploadQueue\" />\n    <br>\n    &nbsp;&nbsp;\n    <mat-file-upload-queue #fileUploadQueue [httpRequestHeaders]=\"httpHeaders\" [fileAlias]=\"'file'\" [httpUrl]=\"uploadUrl\">\n      <mat-file-upload [file]=\"file\" [id]=\"i\" *ngFor=\"let file of fileUploadQueue.files; let i = index\"></mat-file-upload>\n    </mat-file-upload-queue>\n  </mat-card-content>\n\n</mat-card>"

/***/ }),

/***/ "./src/app/inventory-management/upload-product-master/upload-product-master.component.ts":
/*!***********************************************************************************************!*\
  !*** ./src/app/inventory-management/upload-product-master/upload-product-master.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: UploadProductMasterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadProductMasterComponent", function() { return UploadProductMasterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UploadProductMasterComponent = /** @class */ (function () {
    function UploadProductMasterComponent(sessionService) {
        /* this.httpHeaders = new HttpHeaders();
        const securityToken: string = localStorage.getItem('token');
        if (securityToken != null) {
            let tokenString = `Bearer ${securityToken}`;
            this.httpHeaders = new HttpHeaders()
              .set('authorization', tokenString)
              .set('Content-Type', 'multipart/form-data');
        }*/
        this.sessionService = sessionService;
        this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        var securityToken = localStorage.getItem('token');
        if (securityToken != null) {
            var tokenString = "Bearer " + securityToken;
            this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
                .set('authorization', tokenString);
        }
        this.uploadUrl = this.sessionService.appSettings.inventoryManagementWebApiUrl + 'product/uploadproductmasterfile';
    }
    UploadProductMasterComponent.prototype.ngOnInit = function () {
    };
    UploadProductMasterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-upload-product-master',
            template: __webpack_require__(/*! ./upload-product-master.component.html */ "./src/app/inventory-management/upload-product-master/upload-product-master.component.html"),
            styles: [__webpack_require__(/*! ./upload-product-master.component.css */ "./src/app/inventory-management/upload-product-master/upload-product-master.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_1__["SessionService"]])
    ], UploadProductMasterComponent);
    return UploadProductMasterComponent;
}());



/***/ }),

/***/ "./src/app/inventory-management/view-models/product-inquiry.viewmodel.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/product-inquiry.viewmodel.ts ***!
  \*******************************************************************************/
/*! exports provided: ProductInquiryViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductInquiryViewModel", function() { return ProductInquiryViewModel; });
var ProductInquiryViewModel = /** @class */ (function () {
    function ProductInquiryViewModel() {
    }
    return ProductInquiryViewModel;
}());



/***/ }),

/***/ "./src/app/inventory-management/view-models/product.viewmodel.ts":
/*!***********************************************************************!*\
  !*** ./src/app/inventory-management/view-models/product.viewmodel.ts ***!
  \***********************************************************************/
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

/***/ "./src/app/inventory-management/view-models/purchase-order-detail.viewmodel.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/purchase-order-detail.viewmodel.ts ***!
  \*************************************************************************************/
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

/***/ "./src/app/inventory-management/view-models/purchase-order-inquiry.viewmodel.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/purchase-order-inquiry.viewmodel.ts ***!
  \**************************************************************************************/
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

/***/ "./src/app/inventory-management/view-models/purchase-order.viewmodel.ts":
/*!******************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/purchase-order.viewmodel.ts ***!
  \******************************************************************************/
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

/***/ "./src/app/inventory-management/view-models/sales-order-detail.viewmodel.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/sales-order-detail.viewmodel.ts ***!
  \**********************************************************************************/
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

/***/ "./src/app/inventory-management/view-models/sales-order-inquiry.viewmodel.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/sales-order-inquiry.viewmodel.ts ***!
  \***********************************************************************************/
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

/***/ "./src/app/inventory-management/view-models/sales-order.viewmodel.ts":
/*!***************************************************************************!*\
  !*** ./src/app/inventory-management/view-models/sales-order.viewmodel.ts ***!
  \***************************************************************************/
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
//# sourceMappingURL=app-inventory-management-inventory-management-module.js.map