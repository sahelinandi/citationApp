import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  loggedInUserName="";

  constructor(
    private _sharedService:SharedService,
    private router: Router,
    private authService:AuthService

  ) { 
    this._sharedService.postLoginChangeEmitted$.subscribe(
      text => {
        this.loggedInUserName = sessionStorage.getItem("userName");
        console.log(this.loggedInUserName);
    });
  }

  ngOnInit(): void {
    
    this.loggedInUserName = this.authService.getUserName();
  }
  ngOnchange():void {
    
    this.loggedInUserName = this.authService.getUserName();
  }

  onLogout(){
    
    sessionStorage.clear();
    this.loggedInUserName="";
   // this.router.navigate(['/login']);    
  }

}
