import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './../services/authentication.service';

@Injectable()

export class UserGuard implements CanActivate{
    constructor( private _router: Router,
                 private _userService: AuthenticationService ){}

    canActivate(){
        let identity = this._userService.getIdentity();

        if(identity && identity.role == 'ROLE_USER'){
            return true;
        }else{
            this._router.navigate(['/login']);
            return false;
        }
    }
}

