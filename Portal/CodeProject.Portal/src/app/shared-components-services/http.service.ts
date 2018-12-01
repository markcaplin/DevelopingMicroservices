import { SessionService } from './session.service';
import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpService {

    constructor(private httpClient: HttpClient, private alertService: AlertService, private sessionService: SessionService) { }

    HttpGet<T>(url: string): any {

        this.alertService.startProgressBar();

        let tokenString = '';

        let httpHeaders = new HttpHeaders();
        const securityToken: string = localStorage.getItem('token');
        if (securityToken != null) {
            tokenString = `Bearer ${securityToken}`;
            httpHeaders = new HttpHeaders()
              .set('authorization', tokenString)
              .set('Content-Type', 'application/json');
        } else {
            httpHeaders = new HttpHeaders()
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

        return this.httpClient.get<T>(url, { headers: httpHeaders })
            .pipe(
                catchError((err) => this.handleError(err)),
                finalize(() => {
                    this.alertService.stopProgressBar();
                })
            );


    }

    HttpPost<T>(url: string, data: any): any {

        this.alertService.startProgressBar();

        // const securityToken: string = this.sessionService.userViewModel.token;
        let tokenString = '';
        const securityToken: string = localStorage.getItem('token');
        let httpHeaders = new HttpHeaders();
        if (securityToken != null) {
            tokenString = `Bearer ${securityToken}`;
            httpHeaders = new HttpHeaders()
            .set('authorization', tokenString)
            .set('Content-Type', 'application/json');
        } else {
            httpHeaders = new HttpHeaders()
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

        return this.httpClient.post<T>(url, data, { headers: httpHeaders })
            .pipe(
                catchError((err) => this.handleError(err)),
                finalize(() => {
                    this.alertService.stopProgressBar();
                })
            );

    }

    public handleError(error: HttpErrorResponse) {

        console.log('handle error');

        if (error.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // const body = error.error;
        // console.log(body);
        // const errorStatusText = error.statusText;
        // const errorMessage = error.message;
        // console.log(errorStatusText + ' *** ' + errorMessage + '///');
        return throwError(error);
    }

}
