import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { of as observableOf } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';
import { config } from "../config";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { first } from 'rxjs/internal/operators/first';
import { map } from 'rxjs/internal/operators/map';
import { Subject } from 'rxjs/internal/Subject';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { catchError } from 'rxjs/operators';
//import { AccountRolesModel } from '../../Modules/MainApp/account-roles/account-roles.model';

/** Authentication and Authorization Service */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private strings = config.localStorageStrings;

    // private userObject = new BehaviorSubject<UserModel>(null);
    // user: Observable<UserModel> = this.userObject.asObservable();
    // loggedInUser :LoginUserModel ;

    // constructor(private httpClient: HttpClient
    //     , private router: Router
    //     , private authClaims: AuthClaimsService) { }

    // // #region API Calls
    // _login(username, password): Observable<UserModel> {
    //     var grant_type = "password";
    //     var user = new HttpParams()
    //                 .set('grant_type', 'password')
    //                 .set('username', username)
    //                 .set('password', password);

    //     const headers = new HttpHeaders();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     return this.httpClient.post<UserModel>('token', user,{headers:headers});
    // };

    // _validateUser(): Observable<APIResponseModel> {

    //     return this.httpClient.get<APIResponseModel>('api/Portaldashboard/_NavigationBuilder').pipe(
    //         catchError(err => {
    //             if (err instanceof HttpErrorResponse && err.status > 400) {
    //                 // TODO: Fix err.status checking when backend implements error hanlding
    //                 return observableOf(null);
    //             }
    //             return throwError(err);
    //         })
    //     )
    // }

    // // #endregion API Calls

    // /** Sets the user automatically upon success. */
    // login(username, password): Observable<UserModel> {
    //     if (username == null || password == null) {
    //         return throwError(new Error('Email and password must not be empty.'));
    //     }

    //     return this._login(username, password).pipe(tap(user => {
    //         if (user == null) {
    //             return throwError(new Error('Email or Password Did Not Match'));
    //         }
    //         this.setUser(user);
    //     }));
    // }

    // logout(redirectToLogin: boolean = true) {
    //     this.removeUser();
    //     if (redirectToLogin) {
    //         this.router.navigateByUrl('/login');
    //     }
    // }

    // setUser(user: UserModel) {
    //     if (user == null) {
    //         return;
    //     }

    //     localStorage.setItem(this.strings.token, "Bearer" + " "+ user.access_token);
    //     this.userObject.next(user);
    // }

    // removeUser() {
    //     localStorage.removeItem(this.strings.token);
    //     localStorage.removeItem(this.strings.userId);
    //     localStorage.removeItem(this.strings.username);
    //     localStorage.removeItem(this.strings.screens);
        
    //     this.userObject.next(null);
    // }

    // isLoggedIn(): Observable<boolean> {
    //     let token = localStorage.getItem('token');
    //     if (!token) return observableOf(false);
    //     else{
    //         //return observableOf(true);
    //     return this.user.pipe(
    //         first(),
    //         mergeMap(user => this._validateUser()),
    //         map(user => !!user)
    //     );      
            
    //     }

    // }


    // get token(): string {
    //     return localStorage.getItem(this.strings.token);
    // }
}