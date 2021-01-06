
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
setTokenExpiry(tokenExpiry: String)
{
  localStorage['tokenExpiry'] = tokenExpiry;
}
setRefreshToken(refreshToken: String)
{
  localStorage['refreshToken'] = refreshToken;
}

setUserId(userId:String){
  localStorage['userId'] = userId;
}
getUserId(): string{
  let userId = localStorage['userId'];
  return userId;
}
setUserName(userName: string){
  localStorage['userName'] = userName;
}
getUserName(): string{
  let userName = localStorage['userName'];
  return userName;
}

}