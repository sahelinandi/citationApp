import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  loggedInUserName="";

  constructor(
    private _sharedService:SharedService,
    private router: Router

  ) { 
    this._sharedService.postLoginChangeEmitted$.subscribe(
      text => {
        this.loggedInUserName = sessionStorage.getItem("userName");
        console.log(this.loggedInUserName);
    });
  }

  ngOnInit(): void {
    
    this.loggedInUserName = sessionStorage.getItem("userName");
  }

  onLogout(){
    
    sessionStorage.clear();
    this.loggedInUserName="";
    this.router.navigate(['/login']);    
  }

}
