import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-applicationdetails',
  templateUrl: './applicationdetails.component.html',
  styleUrls: ['./applicationdetails.component.css']
})
export class ApplicationdetailsComponent implements OnInit {

  applicationDetails = [];
  message = "";

  constructor(private _applicationService: ApplicationService) { }

  ngOnInit(): void {
    var selectedGender = sessionStorage.getItem("SelectedGender");
    this.getApplicationDetails(selectedGender);
  }



  getApplicationDetails(gender: string) {
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

    this._applicationService.getApplicationDetails(strData).subscribe(
      (Data:
        {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.applicationDetails = x.ApplicationData;
          
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

}
