(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app-account-management-account-management-module"],{

/***/ "./src/app/account-management/account-management.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/account-management/account-management.module.ts ***!
  \*****************************************************************/
/*! exports provided: AccountManagementModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountManagementModule", function() { return AccountManagementModule; });
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ "./src/app/account-management/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register/register.component */ "./src/app/account-management/register/register.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _account_management_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./account-management.routing */ "./src/app/account-management/account-management.routing.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AccountManagementModule = /** @class */ (function () {
    function AccountManagementModule() {
    }
    AccountManagementModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _account_management_routing__WEBPACK_IMPORTED_MODULE_5__["AccountManagementRoutingModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatGridListModule"],
            ],
            declarations: [_register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"], _login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]]
        })
    ], AccountManagementModule);
    return AccountManagementModule;
}());



/***/ }),

/***/ "./src/app/account-management/account-management.routing.ts":
/*!******************************************************************!*\
  !*** ./src/app/account-management/account-management.routing.ts ***!
  \******************************************************************/
/*! exports provided: AccountManagementRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountManagementRoutingModule", function() { return AccountManagementRoutingModule; });
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login/login.component */ "./src/app/account-management/login/login.component.ts");
/* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register/register.component */ "./src/app/account-management/register/register.component.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AccountManagementRoutes = [
    { path: '', component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: 'account-login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"] },
    { path: 'account-register', component: _register_register_component__WEBPACK_IMPORTED_MODULE_1__["RegisterComponent"] }
];
var AccountManagementRoutingModule = /** @class */ (function () {
    function AccountManagementRoutingModule() {
    }
    AccountManagementRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(AccountManagementRoutes)
            ],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], AccountManagementRoutingModule);
    return AccountManagementRoutingModule;
}());



/***/ }),

/***/ "./src/app/account-management/login/login.component.css":
/*!**************************************************************!*\
  !*** ./src/app/account-management/login/login.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field {\n    width: 300px;\n  }"

/***/ }),

/***/ "./src/app/account-management/login/login.component.html":
/*!***************************************************************!*\
  !*** ./src/app/account-management/login/login.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section>\n  \n<mat-card>\n    <mat-card-header>\n      <mat-card-title>\n        <h2>Login</h2>\n      </mat-card-title>\n    </mat-card-header>\n    <mat-card-content>\n  \n      <form>\n  \n        <div>\n          <mat-form-field >\n            <input matInput type=\"email\" name=\"EmailAddress\" value=\"{{userViewModel.emailAddress}}\" [(ngModel)]=\"userViewModel.emailAddress\" placeholder=\"Email Address\">\n          </mat-form-field>\n        </div>\n  \n        <div>\n          <mat-form-field>\n            <input matInput  type=\"password\"  name=\"Password\" placeholder=\"Password\" value=\"{{userViewModel.password}}\" [(ngModel)]=\"userViewModel.password\">\n          </mat-form-field>\n        </div>\n  \n      </form>\n    </mat-card-content>\n    <mat-card-actions>\n      <button mat-flat-button color=\"primary\" (click)=\"login()\">Login</button>\n    </mat-card-actions>\n  </mat-card>\n\n</section>\n\n\n"

/***/ }),

/***/ "./src/app/account-management/login/login.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/account-management/login/login.component.ts ***!
  \*************************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
/* harmony import */ var _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared-view-models/user.viewmodel */ "./src/app/shared-view-models/user.viewmodel.ts");
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






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, httpService, alertService, sessionService) {
        this.router = router;
        this.httpService = httpService;
        this.alertService = alertService;
        this.sessionService = sessionService;
        this.userViewModel = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_4__["UserViewModel"]();
        this.userViewModel.emailAddress = 'bgates@microsoft.com';
        this.userViewModel.password = '123456';
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        localStorage.removeItem('token');
        var user = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_4__["UserViewModel"]();
        user = this.userViewModel;
        var url = this.sessionService.appSettings.accountManagementWebApiUrl + 'authorization/login';
        this.httpService.HttpPost(url, user).subscribe(function (response) {
            _this.loginSuccess(response);
        }, function (response) { return _this.loginFailed(response); });
    };
    LoginComponent.prototype.loginSuccess = function (response) {
        var message = 'Login Successful.';
        this.alertService.ShowSuccessMessage(message);
        localStorage.setItem('token', response.entity.token);
        this.sessionService.setUserViewModel(response.entity);
        this.router.navigate(['/home/home']);
    };
    LoginComponent.prototype.loginFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-component',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/account-management/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/account-management/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_3__["SessionService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/account-management/register/register.component.css":
/*!********************************************************************!*\
  !*** ./src/app/account-management/register/register.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/account-management/register/register.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/account-management/register/register.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n    <mat-card-title>\n      <h2>Register</h2>\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n\n    <form>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"EmailAddress\" value=\"{{userViewModel.emailAddress}}\" [(ngModel)]=\"userViewModel.emailAddress\" placeholder=\"Email Address\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"FirstName\" placeholder=\"First Name\" value=\"{{userViewModel.firstName}}\" [(ngModel)]=\"userViewModel.firstName\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"LastName\" placeholder=\"Last Name\" value=\"{{userViewModel.lastName}}\" [(ngModel)]=\"userViewModel.lastName\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput name=\"CompanyName\" placeholder=\"Company Name\" value=\"{{userViewModel.companyName}}\" [(ngModel)]=\"userViewModel.companyName\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput  type=\"password\"  name=\"Password\" placeholder=\"Password\" value=\"{{userViewModel.password}}\" [(ngModel)]=\"userViewModel.password\">\n        </mat-form-field>\n      </div>\n\n      <div>\n        <mat-form-field style=\"width:300px\">\n          <input matInput type=\"password\" name=\"PasswordConfirmation\" placeholder=\"Confirm Password\" value=\"{{userViewModel.passwordConfirmation}}\" [(ngModel)]=\"userViewModel.passwordConfirmation\">\n        </mat-form-field>\n      </div>\n\n\n    </form>\n  </mat-card-content>\n  <mat-card-actions>\n    <button mat-flat-button color=\"primary\" (click)=\"register()\">Register</button>\n  </mat-card-actions>\n</mat-card>"

/***/ }),

/***/ "./src/app/account-management/register/register.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/account-management/register/register.component.ts ***!
  \*******************************************************************/
/*! exports provided: RegisterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterComponent", function() { return RegisterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared-components-services/alert.service */ "./src/app/shared-components-services/alert.service.ts");
/* harmony import */ var _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared-components-services/http.service */ "./src/app/shared-components-services/http.service.ts");
/* harmony import */ var _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared-view-models/user.viewmodel */ "./src/app/shared-view-models/user.viewmodel.ts");
/* harmony import */ var _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared-components-services/session.service */ "./src/app/shared-components-services/session.service.ts");
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






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, httpService, alertService, sessionService) {
        this.router = router;
        this.httpService = httpService;
        this.alertService = alertService;
        this.sessionService = sessionService;
        this.userViewModel = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_3__["UserViewModel"]();
        this.userViewModel.firstName = '';
        this.userViewModel.lastName = '';
        this.userViewModel.password = '';
        this.userViewModel.passwordConfirmation = '';
        this.userViewModel.emailAddress = '';
        this.userViewModel.companyName = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        var user = new _shared_view_models_user_viewmodel__WEBPACK_IMPORTED_MODULE_3__["UserViewModel"]();
        user = this.userViewModel;
        var url = this.sessionService.appSettings.accountManagementWebApiUrl + 'authorization/register';
        this.httpService.HttpPost(url, user).subscribe(function (response) {
            _this.registerSuccess(response);
        }, function (response) { return _this.registerFailed(response); });
    };
    RegisterComponent.prototype.registerSuccess = function (response) {
        var message = 'Registration Successful.';
        this.alertService.ShowSuccessMessage(message);
        localStorage.setItem('token', response.entity.token);
        this.sessionService.setUserViewModel(response.entity);
        this.router.navigate(['/home/home']);
    };
    RegisterComponent.prototype.registerFailed = function (error) {
        var errorResponse = error.error;
        if (error.status > 0) {
            this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
        }
        else {
            this.alertService.ShowErrorMessage(error.message);
        }
    };
    RegisterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(/*! ./register.component.html */ "./src/app/account-management/register/register.component.html"),
            styles: [__webpack_require__(/*! ./register.component.css */ "./src/app/account-management/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _shared_components_services_http_service__WEBPACK_IMPORTED_MODULE_2__["HttpService"],
            _shared_components_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"], _shared_components_services_session_service__WEBPACK_IMPORTED_MODULE_4__["SessionService"]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ })

}]);
//# sourceMappingURL=app-account-management-account-management-module.js.map