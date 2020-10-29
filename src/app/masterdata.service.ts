import { Injectable, EventEmitter,Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable,of, from } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterdataService {
  

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
 

getCountry():Observable<any>{   
  return this.httpClient.post(this.baseUrl+'/getCountry',"",this.headers)
}

getFundingAgency():Observable<any>{   
  return this.httpClient.post(this.baseUrl+'/getFundingAgency',"",this.headers)
}

getSubSBU():Observable<any>{   
  return this.httpClient.post(this.baseUrl+'/getSubSBU',"",this.headers)
}

getProjectType(subSbuDetails:string):Observable<any>{ 
  return this.httpClient.post(this.baseUrl+'/getProjectType',subSbuDetails,this.headers)
}

getMasterData(masterDataDetails:string):Observable<any>{ 
  console.log(masterDataDetails);
  return this.httpClient.post(this.baseUrl+'/getMasterData',masterDataDetails,this.headers)
}


}
