import { Injectable, EventEmitter } from '@angular/core';
import { AppSettings } from '../shared-models/appsettings.model';
import { UserViewModel } from '../shared-view-models/user.viewmodel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class SessionService {

    public appSettings: AppSettings;
    public userViewModel: UserViewModel;
    public isAuthenicated: Boolean;
    public tokenExpirationDate: any;

    public authenicationEvent: EventEmitter<UserViewModel>;
    public moduleLoadedEvent: EventEmitter<any>;
    private jwtHelperService: JwtHelperService;

    constructor() {
        this.appSettings = new AppSettings();
        this.userViewModel = new UserViewModel();
        this.isAuthenicated = false;
        this.authenicationEvent = new EventEmitter<UserViewModel>();
        this.moduleLoadedEvent = new EventEmitter<any>();
        this.jwtHelperService = new JwtHelperService();
    }

    public setAppSettings(appSettings: AppSettings) {
        this.appSettings = appSettings;
    }

    public setUserViewModel(userViewModel: UserViewModel) {
        this.userViewModel = userViewModel;
        const token = userViewModel.token;
        this.userViewModel.tokenExpirationDate = this.jwtHelperService.getTokenExpirationDate(token);
        this.isAuthenicated = userViewModel.isAuthenicated;
        this.authenicationEvent.emit(userViewModel);
    }

    public isExpiredSession(): Boolean {
        if (this.userViewModel.token === null || this.userViewModel.token === undefined) {
            return true;
        }
        const isExpired: Boolean = this.jwtHelperService.isTokenExpired(this.userViewModel.token);
        return isExpired;
    }

    public endSession() {
        localStorage.removeItem('token');
        this.userViewModel = new UserViewModel();
        this.userViewModel.isAuthenicated = false;
        this.authenicationEvent.emit(this.userViewModel);
    }

    public startSession() {

        const token: string = localStorage.getItem('token');
        if (token != null && token !== undefined) {

            const jwtHelperService: JwtHelperService = new JwtHelperService();
            const decodedToken = jwtHelperService.decodeToken(token);

            this.userViewModel = new UserViewModel();
            this.userViewModel.token = token;
            this.userViewModel.firstName = decodedToken.given_name;
            this.userViewModel.lastName = decodedToken.nameid;
            this.userViewModel.emailAddress = decodedToken.email;
            this.userViewModel.companyName = decodedToken.name;

            this.userViewModel.isAuthenicated = true;
            this.userViewModel.tokenExpirationDate = jwtHelperService.getTokenExpirationDate(token);
            this.authenicationEvent.emit(this.userViewModel);
        }

    }

}

