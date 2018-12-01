(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../app/account-management/account-management.module": [
		"./src/app/account-management/account-management.module.ts",
		"app-account-management-account-management-module"
	],
	"../app/inventory-management/inventory-management.module": [
		"./src/app/inventory-management/inventory-management.module.ts",
		"app-inventory-management-inventory-management-module"
	],
	"../app/purchase-order-management/purchase-order-management.module": [
		"./src/app/purchase-order-management/purchase-order-management.module.ts",
		"app-purchase-order-management-purchase-order-management-module"
	],
	"../app/sales-order-management/sales-order-management.module": [
		"./src/app/sales-order-management/sales-order-management.module.ts",
		"app-sales-order-management-sales-order-management-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\">\n  <mat-toolbar-row>\n\n    <mat-toolbar color=\"primary\">\n      <div [hidden]=\"!isAuthenicated\">\n        <button mat-icon-button (click)=\"toggleNavBar()\">\n          <mat-icon>apps</mat-icon>\n        </button>\n      </div>\n      <h1 class=\"example-app-name\">Micro Services, Inc.</h1>\n\n      <span class=\"spacer\"></span>\n      <span [hidden]=\"!isAuthenicated\" class=\"mat-body\">\n       \n      </span>\n      <span class=\"spacer\"></span>\n\n      <span [hidden]=\"isAuthenicated\" class=\"mat-body\">\n        <a mat-list-item [routerLink]=\"['/accountmanagement/account-register']\">\n          <mat-icon class=\"icon\">input</mat-icon>\n          <span class=\"label\" style=\"padding-right:20px\">Register</span>\n        </a>\n      </span>\n      <span [hidden]=\"isAuthenicated\" class=\"mat-body\">\n        <a mat-list-item [routerLink]=\"['/accountmanagement/account-login']\">\n          <mat-icon class=\"icon\">input</mat-icon>\n          <span class=\"label\">Login</span>\n        </a>\n      </span>\n\n      <span [hidden]=\"!isAuthenicated\" class=\"mat-body\" style=\"padding-right: 10px\">\n        <a mat-list-item [routerLink]=\"['/accountmanagement/user-profile']\">{{firstName}}&nbsp;{{lastName}}&nbsp; </a>\n      </span>\n\n      <span [hidden]=\"!isAuthenicated\" class=\"mat-body\">\n        <a mat-list-item style=\"cursor:pointer\" (click)=\"logout()\">Logout</a>\n      </span>\n\n\n\n    </mat-toolbar>\n  </mat-toolbar-row>\n</mat-toolbar>\n\n<div [hidden]=\"hideMenuBar || !isAuthenicated\">\n  <mat-toolbar color=\"accent\">\n\n    <div style=\"margin-right:20px;\">\n      <a mat-list-item [routerLink]=\"['/inventorymanagement/product-inquiry']\">\n        <mat-icon class=\"icon\">dashboard</mat-icon>\n        <span class=\"label\">Inventory Management</span>\n      </a>\n    </div>\n\n    <div style=\"margin-right:20px;\">\n      <a mat-list-item [routerLink]=\"['salesordermanagement/customer-inquiry']\">\n        <mat-icon class=\"icon\">dashboard</mat-icon>\n        <span class=\"label\">Sales Order Management</span>\n      </a>\n    </div>\n\n    <div style=\"margin-right:20px;\">\n      <a mat-list-item [routerLink]=\"['purchaseordermanagement/supplier-inquiry']\">\n        <mat-icon class=\"icon\">dashboard</mat-icon>\n        <span class=\"label\">Purchase Order Management</span>\n      </a>\n    </div>\n\n  </mat-toolbar>\n</div>\n\n<div [hidden]=\"!showProgressBar\" style=\"width: 100px; z-index:1000; height:25px; position: fixed; bottom:12%; right:1%; margin: -100px 0 0 -150px;\">\n  <mat-spinner></mat-spinner>\n</div>\n\n<div [hidden]=\"!hideMenuBar\" style=\"margin:0px;margin-top:0px;\">\n  <router-outlet></router-outlet>\n</div>\n\n\n<div style=\"width:100%; text-align:center\" [hidden]=\"hideMenuBar\">\n  <img src=\"../assets/homepage.png\" />\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_models_appsettings_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared-models/appsettings.model */ "./src/app/shared-models/appsettings.model.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(elementRef, router, alertService, sessionService) {
        var _this = this;
        this.elementRef = elementRef;
        this.router = router;
        this.alertService = alertService;
        this.sessionService = sessionService;
        this.title = 'Caplin Systems, Incorporated.';
        this.iterations = 0;
        this.showProgressBar = false;
        this.sessionId = 0;
        this.runningMonitor = false;
        this.hideMenuBar = true;
        this.alertService.progressBarUIEvent.subscribe(function (event) { return _this.updateProgressBar(event); });
        this.sessionService.authenicationEvent.subscribe(function (event) { return _this.authenicationEvent(event); });
        this.sessionService.moduleLoadedEvent.subscribe(function (event) { return _this.moduleLoadedEvent(event); });
        // const native = this.elementRef.nativeElement;
        // const settings = native.getAttribute('settings');
        var appSettings = new _shared_models_appsettings_model__WEBPACK_IMPORTED_MODULE_2__["AppSettings"]();
        appSettings.accountManagementWebApiUrl = 'https://localhost:44303/api/';
        appSettings.inventoryManagementWebApiUrl = 'https://localhost:44340/api/';
        appSettings.purchaseOrderManagementWebApiUrl = 'https://localhost:44327/api/';
        appSettings.salesOrderManagementWebApiUrl = 'https://localhost:44396/api/';
        // appSettings = JSON.parse(settings);
        sessionService.setAppSettings(appSettings);
        this.isAuthenicated = sessionService.isAuthenicated;
        sessionService.startSession();
    }
    AppComponent.prototype.moduleLoadedEvent = function (event) {
        this.hideMenuBar = true;
    };
    AppComponent.prototype.updateProgressBar = function (event) {
        this.showProgressBar = event;
    };
    AppComponent.prototype.authenicationEvent = function (userViewModel) {
        var _this = this;
        this.isAuthenicated = userViewModel.isAuthenicated;
        this.firstName = userViewModel.firstName;
        this.lastName = userViewModel.lastName;
        this.tokenExpirationDate = userViewModel.tokenExpirationDate;
        if (this.isAuthenicated === true && this.runningMonitor === false) {
            this.runningMonitor = true;
            this.monitorSession();
            this.sessionId = setInterval(function () {
                _this.monitorSession();
            }, 5000);
        }
        else {
            if (this.isAuthenicated === false && this.runningMonitor === true) {
                this.clearSessionInterval();
            }
        }
    };
    AppComponent.prototype.toggleNavBar = function () {
        if (this.hideMenuBar === false) {
            this.hideMenuBar = true;
        }
        else {
            this.hideMenuBar = false;
        }
    };
    AppComponent.prototype.monitorSession = function () {
        var isExpiredSession = this.sessionService.isExpiredSession();
        if (isExpiredSession) {
            this.isAuthenicated = false;
            this.clearSessionInterval();
            this.logout();
        }
        else {
            this.isAuthenicated = true;
        }
        this.iterations++;
    };
    AppComponent.prototype.logout = function () {
        this.sessionService.endSession();
        this.router.navigate(['/home/home']);
    };
    AppComponent.prototype.clearSessionInterval = function () {
        if (this.sessionId !== 0) {
            clearInterval(this.sessionId);
            this.sessionId = 0;
        }
        this.runningMonitor = false;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_3__["SessionService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _home_directory_about_about_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home-directory/about/about.component */ "./src/app/home-directory/about/about.component.ts");
/* harmony import */ var _home_directory_contact_contact_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home-directory/contact/contact.component */ "./src/app/home-directory/contact/contact.component.ts");
/* harmony import */ var _home_directory_home_home_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home-directory/home/home.component */ "./src/app/home-directory/home/home.component.ts");
/* harmony import */ var _application_routing__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./application-routing */ "./src/app/application-routing.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_http_interceptor_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared-components-services/http-interceptor.service */ "./src/app/shared-components-services/http-interceptor.service.ts");
/* harmony import */ var _main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./main-nav/main-nav.component */ "./src/app/main-nav/main-nav.component.ts");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./material.module */ "./src/app/material.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_4__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _home_directory_home_home_component__WEBPACK_IMPORTED_MODULE_9__["HomeComponent"],
                _home_directory_about_about_component__WEBPACK_IMPORTED_MODULE_7__["AboutComponent"],
                _home_directory_contact_contact_component__WEBPACK_IMPORTED_MODULE_8__["ContactComponent"],
                _main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_15__["MainNavComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _material_module__WEBPACK_IMPORTED_MODULE_17__["MaterialModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(_application_routing__WEBPACK_IMPORTED_MODULE_10__["ApplicationRoutes"]),
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_16__["LayoutModule"]
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_6__["BrowserAnimationsModule"]],
            providers: [_shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_11__["SessionService"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_12__["HttpService"], _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_13__["AlertService"],
                _shared_components_services_http_interceptor_service__WEBPACK_IMPORTED_MODULE_14__["HttpInterceptorService"],
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
                    useClass: _shared_components_services_http_interceptor_service__WEBPACK_IMPORTED_MODULE_14__["HttpInterceptorService"],
                    multi: true
                }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/application-routing.ts":
/*!****************************************!*\
  !*** ./src/app/application-routing.ts ***!
  \****************************************/
/*! exports provided: ApplicationRoutes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApplicationRoutes", function() { return ApplicationRoutes; });
/* harmony import */ var _home_directory_about_about_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home-directory/about/about.component */ "./src/app/home-directory/about/about.component.ts");
/* harmony import */ var _home_directory_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-directory/contact/contact.component */ "./src/app/home-directory/contact/contact.component.ts");
/* harmony import */ var _home_directory_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home-directory/home/home.component */ "./src/app/home-directory/home/home.component.ts");



var ApplicationRoutes = [
    { path: '', component: _home_directory_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"], pathMatch: 'full' },
    { path: 'home/home', component: _home_directory_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    { path: 'home/contact', component: _home_directory_contact_contact_component__WEBPACK_IMPORTED_MODULE_1__["ContactComponent"] },
    { path: 'home/about', component: _home_directory_about_about_component__WEBPACK_IMPORTED_MODULE_0__["AboutComponent"] },
    {
        path: 'accountmanagement', loadChildren: '../app/account-management/account-management.module#AccountManagementModule'
    },
    {
        path: 'inventorymanagement', loadChildren: '../app/inventory-management/inventory-management.module#InventoryManagementModule'
    },
    {
        path: 'purchaseordermanagement', loadChildren: '../app/purchase-order-management/purchase-order-management.module#PurchaseOrderManagementModule'
    },
    {
        path: 'salesordermanagement', loadChildren: '../app/sales-order-management/sales-order-management.module#SalesOrderManagementModule'
    }
];


/***/ }),

/***/ "./src/app/home-directory/about/about.component.css":
/*!**********************************************************!*\
  !*** ./src/app/home-directory/about/about.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home-directory/about/about.component.html":
/*!***********************************************************!*\
  !*** ./src/app/home-directory/about/about.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  about works!\n</p>\n"

/***/ }),

/***/ "./src/app/home-directory/about/about.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/home-directory/about/about.component.ts ***!
  \*********************************************************/
/*! exports provided: AboutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AboutComponent", function() { return AboutComponent; });
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

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(/*! ./about.component.html */ "./src/app/home-directory/about/about.component.html"),
            styles: [__webpack_require__(/*! ./about.component.css */ "./src/app/home-directory/about/about.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./src/app/home-directory/contact/contact.component.css":
/*!**************************************************************!*\
  !*** ./src/app/home-directory/contact/contact.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home-directory/contact/contact.component.html":
/*!***************************************************************!*\
  !*** ./src/app/home-directory/contact/contact.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  contact works!\n</p>\n"

/***/ }),

/***/ "./src/app/home-directory/contact/contact.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/home-directory/contact/contact.component.ts ***!
  \*************************************************************/
/*! exports provided: ContactComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactComponent", function() { return ContactComponent; });
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

var ContactComponent = /** @class */ (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(/*! ./contact.component.html */ "./src/app/home-directory/contact/contact.component.html"),
            styles: [__webpack_require__(/*! ./contact.component.css */ "./src/app/home-directory/contact/contact.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ContactComponent);
    return ContactComponent;
}());



/***/ }),

/***/ "./src/app/home-directory/home/home.component.css":
/*!********************************************************!*\
  !*** ./src/app/home-directory/home/home.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home-directory/home/home.component.html":
/*!*********************************************************!*\
  !*** ./src/app/home-directory/home/home.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n\n<div style=\"width:100%; text-align:center\" [hidden]=\"hideMenuBar\">\n  <img src=\"../assets/homepage.png\" />\n</div>\n\n"

/***/ }),

/***/ "./src/app/home-directory/home/home.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/home-directory/home/home.component.ts ***!
  \*******************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
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

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home-directory/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home-directory/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/main-nav/main-nav.component.css":
/*!*************************************************!*\
  !*** ./src/app/main-nav/main-nav.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav-container {\n  height: 100%;\n}\n\n.sidenav {\n  width: 200px;\n}\n\n.mat-toolbar.mat-primary {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n"

/***/ }),

/***/ "./src/app/main-nav/main-nav.component.html":
/*!**************************************************!*\
  !*** ./src/app/main-nav/main-nav.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"sidenav-container\">\n  <mat-sidenav\n    #drawer\n    class=\"sidenav\"\n    fixedInViewport=\"true\"\n    [attr.role]=\"(isHandset$ | async) ? 'dialog' : 'navigation'\"\n    [mode]=\"(isHandset$ | async) ? 'over' : 'side'\"\n    [opened]=\"!(isHandset$ | async)\">\n    <mat-toolbar color=\"primary\">Menu</mat-toolbar>\n    <mat-nav-list>\n      <a mat-list-item href=\"#\">Link 1</a>\n      <a mat-list-item href=\"#\">Link 2</a>\n      <a mat-list-item href=\"#\">Link 3</a>\n    </mat-nav-list>\n  </mat-sidenav>\n  <mat-sidenav-content>\n    <mat-toolbar color=\"primary\">\n      <button\n        type=\"button\"\n        aria-label=\"Toggle sidenav\"\n        mat-icon-button\n        (click)=\"drawer.toggle()\"\n        *ngIf=\"isHandset$ | async\">\n        <mat-icon aria-label=\"Side nav toggle icon\">menu</mat-icon>\n      </button>\n      <span>CodeProjectPortal</span>\n    </mat-toolbar>\n    <!-- Add Content Here -->\n  </mat-sidenav-content>\n</mat-sidenav-container>\n"

/***/ }),

/***/ "./src/app/main-nav/main-nav.component.ts":
/*!************************************************!*\
  !*** ./src/app/main-nav/main-nav.component.ts ***!
  \************************************************/
/*! exports provided: MainNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainNavComponent", function() { return MainNavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MainNavComponent = /** @class */ (function () {
    function MainNavComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset$ = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (result) { return result.matches; }));
    }
    MainNavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-nav',
            template: __webpack_require__(/*! ./main-nav.component.html */ "./src/app/main-nav/main-nav.component.html"),
            styles: [__webpack_require__(/*! ./main-nav.component.css */ "./src/app/main-nav/main-nav.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["BreakpointObserver"]])
    ], MainNavComponent);
    return MainNavComponent;
}());



/***/ }),

/***/ "./src/app/material.module.ts":
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/*! exports provided: MaterialModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaterialModule", function() { return MaterialModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/esm5/menu.es5.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/esm5/progress-spinner.es5.js");
/* harmony import */ var angular_material_fileupload__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-material-fileupload */ "./node_modules/angular-material-fileupload/matFileUpload.esm.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                angular_material_fileupload__WEBPACK_IMPORTED_MODULE_5__["MatFileUploadModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginatorModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSortModule"],
                _angular_material_menu__WEBPACK_IMPORTED_MODULE_3__["MatMenuModule"],
                _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_4__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogModule"],
                angular_material_fileupload__WEBPACK_IMPORTED_MODULE_5__["MatFileUploadModule"]
            ]
        })
    ], MaterialModule);
    return MaterialModule;
}());



/***/ }),

/***/ "./src/app/shared-components-services/alert.service.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared-components-services/alert.service.ts ***!
  \*************************************************************/
/*! exports provided: AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = /** @class */ (function () {
    function AlertService(snackBar) {
        this.snackBar = snackBar;
        this.verticalPosition = 'bottom';
        this.horizontalPosition = 'right';
        this.duration = 5000;
        this.action = '';
        this.progressBarUIEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    AlertService.prototype.startProgressBar = function () {
        this.progressBarUIEvent.emit(true);
    };
    AlertService.prototype.stopProgressBar = function () {
        this.progressBarUIEvent.emit(false);
    };
    AlertService.prototype.ShowSuccessMessage = function (message) {
        var config = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarConfig"]();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.duration;
        config.panelClass = ['successMessage'];
        this.snackBar.open(message, this.action, config);
        this.stopProgressBar();
    };
    AlertService.prototype.ShowErrorMessage = function (message) {
        var config = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarConfig"]();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.duration;
        config.panelClass = ['errorMessage'];
        this.snackBar.open(message, this.action, config);
        this.stopProgressBar();
    };
    AlertService.prototype.ShowWarningMessage = function (message) {
        var config = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBarConfig"]();
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.duration = this.duration;
        config.panelClass = ['warningMessage'];
        this.snackBar.open(message, this.action, config);
        this.stopProgressBar();
    };
    AlertService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], AlertService);
    return AlertService;
}());



/***/ }),

/***/ "./src/app/shared-components-services/http-interceptor.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared-components-services/http-interceptor.service.ts ***!
  \************************************************************************/
/*! exports provided: HttpInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpInterceptorService", function() { return HttpInterceptorService; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./session.service */ "./src/app/shared-components-services/session.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HttpInterceptorService = /** @class */ (function () {
    function HttpInterceptorService(sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
    }
    HttpInterceptorService.prototype.intercept = function (request, next) {
        // modify request
        var _this = this;
        request = request.clone({});
        // console.log('----request----');
        // console.log(request);
        // console.log('--- end of request---');
        return next.handle(request).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (event) {
            if (event instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpResponse"]) {
                // console.log(event);
                // console.log(' all looks good');
                // http response status code
                // console.log(event.status);
                var token = event.body.token;
                if (token !== '' && token !== null && token !== undefined) {
                    localStorage.setItem('token', token);
                    _this.sessionService.startSession();
                }
                // console.log('token=' + token);
                // const header = event.headers.get('content-type');
                // console.log('header=' + header);
            }
        }, function (error) {
            // http response status code
            // console.log('----response----');
            // console.error('status code:');
            // console.error(error.status);
            // console.error(error.message);
            // console.log('--- end of response---');
            if (error.status === 401) {
                console.log('unauthorized');
                _this.router.navigate(['/home/login']);
            }
        }));
    };
    HttpInterceptorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["Router"]])
    ], HttpInterceptorService);
    return HttpInterceptorService;
}());



/***/ }),

/***/ "./src/app/shared-components-services/http.service.ts":
/*!************************************************************!*\
  !*** ./src/app/shared-components-services/http.service.ts ***!
  \************************************************************/
/*! exports provided: HttpService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpService", function() { return HttpService; });
/* harmony import */ var _session_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HttpService = /** @class */ (function () {
    function HttpService(httpClient, alertService, sessionService) {
        this.httpClient = httpClient;
        this.alertService = alertService;
        this.sessionService = sessionService;
    }
    HttpService.prototype.HttpGet = function (url) {
        var _this = this;
        this.alertService.startProgressBar();
        var tokenString = '';
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]();
        var securityToken = localStorage.getItem('token');
        if (securityToken != null) {
            tokenString = "Bearer " + securityToken;
            httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set('authorization', tokenString)
                .set('Content-Type', 'application/json');
        }
        else {
            httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set('Content-Type', 'application/json');
        }
        // const headers = new HttpHeaders();
        // console.log('token ' + tokenString);
        // headers.append('Authorization', tokenString);
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'q=0.8;application/json;q=0.9');
        // console.log('token=' + tokenString);
        console.log('url=' + url);
        return this.httpClient.get(url, { headers: httpHeaders })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) { return _this.handleError(err); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () {
            _this.alertService.stopProgressBar();
        }));
    };
    HttpService.prototype.HttpPost = function (url, data) {
        var _this = this;
        this.alertService.startProgressBar();
        // const securityToken: string = this.sessionService.userViewModel.token;
        var tokenString = '';
        var securityToken = localStorage.getItem('token');
        var httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]();
        if (securityToken != null) {
            tokenString = "Bearer " + securityToken;
            httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set('authorization', tokenString)
                .set('Content-Type', 'application/json');
        }
        else {
            httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpHeaders"]()
                .set('Content-Type', 'application/json');
        }
        // const headers = new HttpHeaders();
        // headers.append('Authorization', tokenString);
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'q=0.8;application/json;q=0.9');
        console.log('token=' + tokenString);
        // const basePath = this.sessionService.appSettings.webApiUrl;
        console.log('url=' + url);
        return this.httpClient.post(url, data, { headers: httpHeaders })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (err) { return _this.handleError(err); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["finalize"])(function () {
            _this.alertService.stopProgressBar();
        }));
    };
    HttpService.prototype.handleError = function (error) {
        console.log('handle error');
        if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", body was: " + error.error);
        }
        // const body = error.error;
        // console.log(body);
        // const errorStatusText = error.statusText;
        // const errorMessage = error.message;
        // console.log(errorStatusText + ' *** ' + errorMessage + '///');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["throwError"])(error);
    };
    HttpService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"], _alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _session_service__WEBPACK_IMPORTED_MODULE_0__["SessionService"]])
    ], HttpService);
    return HttpService;
}());



/***/ }),

/***/ "./src/app/shared-components-services/session.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/shared-components-services/session.service.ts ***!
  \***************************************************************/
/*! exports provided: SessionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SessionService", function() { return SessionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_models_appsettings_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared-models/appsettings.model */ "./src/app/shared-models/appsettings.model.ts");
/* harmony import */ var _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared-view-models/user.viewmodel */ "./src/app/shared-view-models/user.viewmodel.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SessionService = /** @class */ (function () {
    function SessionService() {
        this.appSettings = new _shared_models_appsettings_model__WEBPACK_IMPORTED_MODULE_1__["AppSettings"]();
        this.userViewModel = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_2__["UserViewModel"]();
        this.isAuthenicated = false;
        this.authenicationEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.moduleLoadedEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.jwtHelperService = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
    }
    SessionService.prototype.setAppSettings = function (appSettings) {
        this.appSettings = appSettings;
    };
    SessionService.prototype.setUserViewModel = function (userViewModel) {
        this.userViewModel = userViewModel;
        var token = userViewModel.token;
        this.userViewModel.tokenExpirationDate = this.jwtHelperService.getTokenExpirationDate(token);
        this.isAuthenicated = userViewModel.isAuthenicated;
        this.authenicationEvent.emit(userViewModel);
    };
    SessionService.prototype.isExpiredSession = function () {
        if (this.userViewModel.token === null || this.userViewModel.token === undefined) {
            return true;
        }
        var isExpired = this.jwtHelperService.isTokenExpired(this.userViewModel.token);
        return isExpired;
    };
    SessionService.prototype.endSession = function () {
        localStorage.removeItem('token');
        this.userViewModel = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_2__["UserViewModel"]();
        this.userViewModel.isAuthenicated = false;
        this.authenicationEvent.emit(this.userViewModel);
    };
    SessionService.prototype.startSession = function () {
        var token = localStorage.getItem('token');
        if (token != null && token !== undefined) {
            var jwtHelperService = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
            var decodedToken = jwtHelperService.decodeToken(token);
            this.userViewModel = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_2__["UserViewModel"]();
            this.userViewModel.token = token;
            this.userViewModel.firstName = decodedToken.given_name;
            this.userViewModel.lastName = decodedToken.nameid;
            this.userViewModel.emailAddress = decodedToken.email;
            this.userViewModel.companyName = decodedToken.name;
            this.userViewModel.isAuthenicated = true;
            this.userViewModel.tokenExpirationDate = jwtHelperService.getTokenExpirationDate(token);
            this.authenicationEvent.emit(this.userViewModel);
        }
    };
    SessionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], SessionService);
    return SessionService;
}());



/***/ }),

/***/ "./src/app/shared-models/appsettings.model.ts":
/*!****************************************************!*\
  !*** ./src/app/shared-models/appsettings.model.ts ***!
  \****************************************************/
/*! exports provided: AppSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSettings", function() { return AppSettings; });
var AppSettings = /** @class */ (function () {
    function AppSettings() {
    }
    return AppSettings;
}());



/***/ }),

/***/ "./src/app/shared-view-models/user.viewmodel.ts":
/*!******************************************************!*\
  !*** ./src/app/shared-view-models/user.viewmodel.ts ***!
  \******************************************************/
/*! exports provided: UserViewModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserViewModel", function() { return UserViewModel; });
var UserViewModel = /** @class */ (function () {
    function UserViewModel() {
    }
    return UserViewModel;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\MyFiles\_CodeProjectMicroServices\CodeProjectMicroServices\Portal\CodeProject.Portal\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map