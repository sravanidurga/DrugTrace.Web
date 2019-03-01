    import { Injectable} from '@angular/core';
    import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
    import { Observable } from 'rxjs/internal/Observable';
    import { Router } from '@angular/router';
    import { config } from '../config';
    import { map } from 'rxjs/operators';
    import { AuthService } from './auth.service';
    import { of as observableOf } from 'rxjs/internal/observable/of';
    import 'rxjs/add/operator/catch';

    export const InterceptorSkipHeader = 'X-Skip-Interceptor';

    export const B2BHeader ='B2B-Header';

    @Injectable()
    export class RequestInterceptor implements HttpInterceptor {
        constructor(private router: Router, private authService: AuthService,) {
        }
        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            if (req.headers.has(InterceptorSkipHeader)) {
                const headers = req.headers.delete(InterceptorSkipHeader);
                req = req.clone({ headers });
            }
            else if(req.headers.has(B2BHeader)){
                req = req.clone({ url: config.environment.BASE_URL + req.url });
            }
            else{
            req = req.clone({ url: config.BASE_URL + req.url });
            if (req.url.indexOf("login") === -1) {

                var token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NTE0OTU3NTgsInVzZXJuYW1lIjoicGIzIiwib3JnTmFtZSI6Im1hbnUiLCJpYXQiOjE1NTE0NTk3NTh9.WyyDQrQU-fl31ubFMPaGytA1VTEAcnfaWN7ckNQ7qWo';

                req = req.clone({
                    headers: req.headers.set('authorization', token),
                    responseType:"text"
                });
                // apply token here
                // let token = this.authService.token || '';
                // if (token) {
                //     req = req.clone({
                //         headers: req.headers.set('Authorization', token)
                //     });
                // }
                // else {
                //         this.router.navigateByUrl('login');
                // }
            }
        }
            return next.handle(req)
            .pipe(map(res => {
                if (res instanceof HttpResponse) {
                    if (res.ok) {
                        res = res.clone<any>({
                            body: res.body['response']
                        })
                    }
                    return res;
                }
            
            }))
            // .catch(err =>{
            //     if (err instanceof HttpErrorResponse) {
            //         if (err.status === 401) {
            //             this.router.navigateByUrl('login');
            //         }
            //       }
            //     return observableOf(null);
            // })
        }
    //}
    }
