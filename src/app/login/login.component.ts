import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import{AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
ref:any;
show:boolean;
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient,private authService: AuthService) { }

  ngOnInit() {
     this.route.queryParams.subscribe((params) =>{
         this.ref= params.ref;
     });
     console.log("msg");
  /*   const token  = this.authService.getAccessToken();
     if(token != undefined && token !=null)
     {
        this.show = true;
        if(this.ref !== undefined && this.ref!=='')
        {
          this.router.navigate([this.ref]);
        }else{
          this.router.navigate(['/dashboard']);
        }
     }else{
      console.log("window.location.href :::"+window.location.href );
       if(window.location.href !="" && window.location.href.indexOf("code") >=0 )
       {
          const code =new URL(window.location.href).searchParams.get("code");
         
         this.getAccessToken(code);
        return true;
       }else{
         window.location.href=environment.LoginURL+"?response_type="+environment.response_type
         +"&client_id="+environment.client_id+"&redirect_uri="+environment.redirect_uri+"&scope="+environment.scope   
        }
     }*/

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
    console.log("data:::"+data);
  },
  err=> console.log(err)
  );
}


}
