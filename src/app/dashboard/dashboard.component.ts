import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName = "";
  applicationCount = 0;
  maleApplicationCount = 0;
  femaleApplicationCount = 0;
  transApplicationCount = 0;
  message = "";
  userInfo : any;
  loggedInUserName="";
  constructor(
    private router: Router,
    private _applicationService: ApplicationService,
    private http:HttpClient,
    private authService: AuthService

  ) {

  }

  ngOnInit()  {
   
    if(window.location.href !="" && window.location.href.indexOf("code") >=0 )
    {
       const code =new URL(window.location.href).searchParams.get("code");
      
      this.getAccessToken(code);
     return true;
    }else{
      window.location.href=environment.LoginURL+"?response_type="+environment.response_type
      +"&client_id="+environment.client_id+"&redirect_uri="+environment.redirect_uri+"&scope="+environment.scope   
     }
     this.loggedInUserName = this.authService.getUserName();
     console.log("loggedInUserName==>"+this.loggedInUserName);
  }
  ngOnchange()
  {
    this.loggedInUserName = this.authService.getUserName();
    console.log("loggedInUserName==>"+this.loggedInUserName);
  }
  getAccessToken(Code:string)
  {
    const body= new HttpParams()
    .set('code',Code)
    .set('redirect_uri',environment.redirect_uri)
    .set('grant_type',environment.grant_type)
    .set('client_id',environment.client_id)
    .set('client_secret',environment.secret_key);
  
    let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'});
    return this.http.post(environment.access_token,body.toString(),{headers:headers}
    ).subscribe(data=>{
     this.getUserInfo(data);
    },
    err=> console.log(err)
    );
  }
  getUserInfo(accesscode:any){
     var accessToken = accesscode.access_token;
     console.log("accessToken::::"+accessToken);
   
     
     const body= new HttpParams()
     .set('redirect_uri',environment.redirect_uri)
     let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',                    
                                     'Authorization': 'Bearer ' +accessToken
                                   });
    
     return this.http.post(environment.user_info,body.toString(),{headers:headers}).subscribe(
       userInfo =>{
         this.userInfo = userInfo;
         this.authService.setUserId(this.userInfo.uid);
         this.authService.setUserName(this.userInfo.name);
         console.log("userId::"+ this.authService.getUserId());
       },
       err => console.log(err)
     );

  }
  onApply() {
    this.router.navigate(['/Citationapplication']);
  }

  getApplicationCount(gender: string) {
    console.log(gender)

    var data = { Gender: gender };
    var strData = "";

    if (gender=="") {
      strData = "";
    }
    else {
      strData = JSON.stringify(data);
    }

    console.log(strData);

    this._applicationService.getApplicationCount(strData).subscribe(
      (Data:
        {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          switch (gender) {
            case "MALE":
              this.maleApplicationCount = x.ApplicationCount;
              break;
            case "FEMALE":
              this.femaleApplicationCount = x.ApplicationCount;
              break;
            case "TRANSGENDER":
              this.transApplicationCount = x.ApplicationCount;
              break;
            default:
              this.applicationCount = x.ApplicationCount;
              break;
          }
          
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            let element = document.getElementById('divMessage')
            element.style.display = "block";
          }
        }
      }
      ,
      (error: {}) => {
        var x = JSON.parse(JSON.stringify(error))
        let element = document.getElementById('divMessage')
        element.style.display = "block";
      }
    );
  }

  showApplicationDetails(gender:string){
    sessionStorage.setItem("SelectedGender", gender);
    this.router.navigate(['/applicationdetails']);
  }

}
