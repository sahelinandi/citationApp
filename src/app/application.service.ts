import { Injectable, EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of, from } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  

  baseUrl = environment.apiUrl + '/citation-services/v1';
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
   obj:Observable<any>;
 // User: User ;
  public $isLoggedin = new EventEmitter();
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  
  constructor(private httpClient: HttpClient,
    //private config: Configuration,
    ) {

      

    /* this.User.logiN_ID='qwe',
    this.user.firsT_NAME='qwe',
    this.user.lasT_NAME='',
    this.user.responseMessage='',
    this.user.password='',
    this.user.skiP_2_FACTOR_AUTH='',
    this.user.authenticatioN_TYPE='',
    this.user.responseCode='' */
    
    
   // this.currentUser = this.currentUser.asObservable();
}
 
logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  
}

saveProject(projectDetails:string):Observable<any>{ 
  console.log(projectDetails);
  
  return this.httpClient.post(this.baseUrl+'/saveProject', projectDetails,this.headers)
}

searchProject(projectDetails:string):Observable<any>{ 
  console.log(projectDetails);
  
  return this.httpClient.post(this.baseUrl+'/getProjects', projectDetails,this.headers)
}

getProjectDetails(projectDetails:string):Observable<any>{ 
  console.log(projectDetails);
  
  return this.httpClient.post(this.baseUrl+'/getProjectDetails', projectDetails,this.headers)
}

getApplicationCount(param:string):Observable<any>{ 
  return this.httpClient.post(this.baseUrl+'/getApplicationCount',param,this.headers)
}

getApplicationDetails(param:string):Observable<any>{ 
  return this.httpClient.post(this.baseUrl+'/getApplicationDetails',param,this.headers)
}
getDocuments(projectId:String):Observable<any>{
  return this.httpClient.post<any>(this.baseUrl + '/getDocuments', projectId,this.headers);
 }
 getClientContacts(projectId:String):Observable<any>{
  return this.httpClient.post<any>(this.baseUrl + '/getClientContacts', projectId,this.headers);
 }
 getTechnologies(projectId:String):Observable<any>{
  return this.httpClient.post<any>(this.baseUrl + '/getTechnologies', projectId,this.headers);
 }
 getDomains(projectId:String):Observable<any>{
  return this.httpClient.post<any>(this.baseUrl + '/getDomains', projectId,this.headers);
 }
}
