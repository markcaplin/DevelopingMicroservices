import { Component, OnInit } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared-components-services/alert.service';
import { HttpService } from '../../shared-components-services/http.service';
import { UserViewModelResponse } from '../view-models/user-response.viewmodel';
import { UserViewModel } from '../../shared-view-models/user.viewmodel';
import { SessionService } from '../../shared-components-services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public userViewModel: UserViewModel;

  constructor(private router: Router, private httpService: HttpService,
     private alertService: AlertService, private sessionService: SessionService) {

    this.userViewModel = new UserViewModel();
    this.userViewModel.firstName = '';
    this.userViewModel.lastName = '';
    this.userViewModel.password = '';
    this.userViewModel.passwordConfirmation = '';
    this.userViewModel.emailAddress = '';
    this.userViewModel.companyName = '';

  }

  ngOnInit() {
  }

  public register() {
    let user = new UserViewModel();
    user = this.userViewModel;

    let url = this.sessionService.appSettings.accountManagementWebApiUrl +  'authorization/register';
    this.httpService.HttpPost<UserViewModelResponse>(url, user).subscribe((response: UserViewModelResponse) => {
      this.registerSuccess(response);
    }, response => this.registerFailed(response));

  }

  private registerSuccess(response: UserViewModelResponse) {
    const message = 'Registration Successful.';
    this.alertService.ShowSuccessMessage(message);
    localStorage.setItem('token', response.entity.token);
    this.sessionService.setUserViewModel(response.entity);
    this.router.navigate(['/home/home']);
  }

  private registerFailed(error: HttpErrorResponse) {
    let errorResponse: UserViewModelResponse = error.error;
    if (error.status > 0) {
      this.alertService.ShowErrorMessage(errorResponse.returnMessage[0]);
    } else {
      this.alertService.ShowErrorMessage(error.message);
    }
  }


}
