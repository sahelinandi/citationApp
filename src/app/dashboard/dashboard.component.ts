import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';

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
    private _applicationService: ApplicationService

  ) {

  }

  ngOnInit(): void {
    /* this.userName = sessionStorage.getItem('userName');
    this.getApplicationCount("");
    this.getApplicationCount("MALE");
    this.getApplicationCount("FEMALE");
    this.getApplicationCount("TRANSGENDER"); */
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
