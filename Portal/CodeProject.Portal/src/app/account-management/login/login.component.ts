import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared-components-services/alert.service';
import { HttpService } from '../../shared-components-services/http.service';
import { UserViewModelResponse } from '../view-models/user-response.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { UserViewModel } from '../../shared-view-models/user.viewmodel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public userViewModel: UserViewModel;

  constructor( private router: Router, private httpService: HttpService,
    private alertService: AlertService, private sessionService: SessionService) {

    this.userViewModel = new UserViewModel();
    this.userViewModel.emailAddress = 'bgates@microsoft.com';
    this.userViewModel.password = '123456';
  }

  ngOnInit() {
  }

  public login() {

    localStorage.removeItem('token');
    let user = new UserViewModel();
    user = this.userViewModel;

    let url = this.sessionService.appSettings.accountManagementWebApiUrl +  'authorization/login';
    this.httpService.HttpPost<UserViewModelResponse>(url, user).subscribe((response: UserViewModelResponse) => {
      this.loginSuccess(response);
    }, response => this.loginFailed(response));

  }

  private loginSuccess(response: UserViewModelResponse) {
    const message = 'Login Successful.';
    this.alertService.ShowSuccessMessage(message);
    localStorage.setItem('token', response.entity.token);
    this.sessionService.setUserViewModel(response.entity);
    this.router.navigate(['/home/home']);
  }

  private loginFailed(error: HttpErrorResponse) {
    let errorResponse: UserViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }


}


