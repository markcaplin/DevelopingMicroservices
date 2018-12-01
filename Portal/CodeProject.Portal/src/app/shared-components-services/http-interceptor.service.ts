import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { UserViewModel } from '../shared-view-models/user.viewmodel';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private sessionService: SessionService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // modify request

        request = request.clone({
            // setHeaders: {
            //  Authorization: `Bearer ${localStorage.getItem('MY_TOKEN')}`
            // }
        });

        // console.log('----request----');

        // console.log(request);

        // console.log('--- end of request---');

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {

                   // console.log(event);
                    // console.log(' all looks good');
                    // http response status code
                    // console.log(event.status);

                    const token = event.body.token;

                    if (token !== '' && token !== null && token !== undefined) {
                        localStorage.setItem('token', token);
                        this.sessionService.startSession();
                    }

                    // console.log('token=' + token);
                    // const header = event.headers.get('content-type');
                    // console.log('header=' + header);
                }
            }, error => {
                // http response status code
                // console.log('----response----');
               // console.error('status code:');
                // console.error(error.status);
               // console.error(error.message);
               // console.log('--- end of response---');

                if (error.status === 401) {
                    console.log('unauthorized');
                    this.router.navigate(['/home/login']);
                }

            })
        );

    }

}

