import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {LoginViewModel} from './login-view-model';

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient) { }

    Login(login): Observable<LoginViewModel> {
        return this.httpClient.post<LoginViewModel>('api/PortalLogin/Login', login);
    }

    ResetPassword(username :string): Observable<any> {
        var params = {'username':username}
        return this.httpClient.post<any>('api/PortalLogin/ResetPassword',{},{ params: params});
    }
}