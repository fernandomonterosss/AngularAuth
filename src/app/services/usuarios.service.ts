import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url: string
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
   }


   listarUsuarios(): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    return this._http.get<User[]>(`${this.url}/list-users`, { headers: headers })
    .pipe(map(res =>  res ));
   }

   getUser(id): Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    return this._http.get(`${this.url}/user/${id}`, { headers: headers })
    .pipe(map(res =>  res ));
   }

   editUser(token, id, user): Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders({'Content-Type': 'application/json',
     'Authorization': token });

    return this._http.put(`${this.url}/user/${id}`, params, { headers: headers })
    .pipe(map(res =>  res ));

   }

   deleteUser(token, id): Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json',
    'Authorization': token});

    return this._http.delete(`${this.url}/user/${id}`, { headers: headers })
    .pipe(map(res =>  res ));

   }
}
