import { Injectable } from '@angular/core';

/** Authentication and Authorization Service */
@Injectable({
    providedIn: 'root'
})
export class AuthClaimsService {
    public modules:Array<Number>=[];

    getModules(){
        return this.modules;
    }

    setModules(modules : Array<Number>){
        this.modules = modules;
    }
}