
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutComponent } from './home-directory/about/about.component';
import { ContactComponent } from './home-directory/contact/contact.component';
import { HomeComponent } from './home-directory/home/home.component';

import { ApplicationRoutes } from './application-routing';

import { SessionService } from './shared-components-services/session.service';
import { HttpService } from './shared-components-services/http.service';
import { AlertService } from './shared-components-services/alert.service';

import { HttpInterceptorService } from './shared-components-services/http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    RouterModule.forRoot(ApplicationRoutes),
    BrowserAnimationsModule,
    FormsModule,
    LayoutModule
  ],
  exports: [RouterModule, HttpClientModule, BrowserAnimationsModule],
  providers: [SessionService, HttpService, AlertService,
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
