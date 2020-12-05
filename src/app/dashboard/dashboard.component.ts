import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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


  constructor(
    private router: Router,
    private _applicationService: ApplicationService,
    private http:HttpClient

  ) {

  }

  ngOnInit()  {
    /* this.userName = sessionStorage.getItem('userName');
    this.getApplicationCount("");
    this.getApplicationCount("MALE");
    this.getApplicationCount("FEMALE");
    this.getApplicationCount("TRANSGENDER"); */
    if(window.location.href !="" && window.location.href.indexOf("code") >=0 )
    {
       const code =new URL(window.location.href).searchParams.get("code");
      
      this.getAccessToken(code);
     return true;
    }else{
      window.location.href=environment.LoginURL+"?response_type="+environment.response_type
      +"&client_id="+environment.client_id+"&redirect_uri="+environment.redirect_uri+"&scope="+environment.scope   
     }
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
