import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const AccountManagementRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'account-login', component: LoginComponent},
    { path: 'account-register', component: RegisterComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(AccountManagementRoutes)
    ],
    exports: [RouterModule]
})
export class AccountManagementRoutingModule { }
