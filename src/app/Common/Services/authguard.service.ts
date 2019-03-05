import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    CanLoad,
    Route,
    ActivatedRoute
} from '@angular/router';
import { AuthService } from './auth.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of as observableOf } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';
import { config } from "../config";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isLoggedIn().pipe(
            tap(loggedIn => {
                // TODO: Also check for authorization.
                if (!loggedIn) 
                {
                   
                    this.router.navigateByUrl('login');
                }
            }),
            catchError((err, caught) => {
                this.router.navigateByUrl('login');
                return observableOf(false)
            })
        );
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        // if(route.url.toString() == "" || route.url.toString() == undefined)
        // return true;

        if(state.url.toString() == "" || state.url.toString() == undefined)
        return true;      

    }

    canLoad(route: Route) {
        return this.canActivate(null, null);
    }

    getScreens(){
        var screens =[];
        if(localStorage.getItem("screens") != null){
            screens =  localStorage.getItem("screens").split(',').map(x=>parseInt(x));
        }
        return screens;
    }
}
