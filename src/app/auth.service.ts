
import { Injectable, EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { 

  }
setAccessToken(accesstoken:String)
{
  localStorage['accesstoken'] = accesstoken;
}
getToken(): string{
let email = localStorage['idtoken'];
return email;
}
getAccessToken():string{
  let access= localStorage['accesstoken'];
  return access;
}

}