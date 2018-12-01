import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AccountManagementRoutingModule } from './account-management.routing';

import {
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
  } from '@angular/material';


@NgModule({
  imports: [
    AccountManagementRoutingModule,
      CommonModule,
      FormsModule,
      MatTabsModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatIconModule,
      MatListModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      MatSnackBarModule,
      MatProgressBarModule,
      MatFormFieldModule,
      MatCardModule,
      MatGridListModule,
  ],
  declarations: [RegisterComponent, LoginComponent]
})
export class AccountManagementModule { }

