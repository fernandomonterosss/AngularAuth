import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

 public url: string;
 public identity;
 public token;

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  register(user_register): Observable<any>{
    let params  = JSON.stringify(user_register);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(`${this.url}/register`, params, { headers : headers })
                          .pipe(map(res => res));
  }

  singUp(user_login, gettoken = null): Observable<any>{
    if(gettoken != null){
      user_login.gettoken = gettoken;
    }

    let params = JSON.stringify(user_login);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this._http.post(`${this.url}/login`, params, {headers: headers })
    .pipe(map(res => res));

  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity != "undefined"){
      this.identity = identity
    }else{
      this.identity = null;
    }

    return this.identity;
  }
  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }else{
     this.token = null;
    }

    return this.token;
  }


}
