import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApplicationService } from '../../application.service';
import { MasterdataService } from '../../masterdata.service';
import { FileUploadService } from '../../file-upload.service';
@Component({
  selector: 'app-trackcitationmodal',
  templateUrl: './trackcitationmodal.component.html',
  styleUrls: ['./trackcitationmodal.component.less']
})
 
export class TrackcitationmodalComponent implements OnInit {
  selProjects = [];
  documents = [];
  clientContacts = [];
  technologies = [];
  domainNames = [];
  message = "";
  constructor(
    public modal: MatDialogRef<TrackcitationmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private applicationService: ApplicationService,
    private masterdataService: MasterdataService,
    private fileUploadService: FileUploadService,) {
      this.selProjects.push(inputData);
   
    }

  ngOnInit(): void {
    var data = this.selProjects;
    var request = {
      data
    };

    console.log("sel proj req==>"+ JSON.stringify(request));

    var strRequest = JSON.stringify(request)
    this.applicationService.getDocuments(strRequest).subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.documents = x.Documents;
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            let element = document.getElementById('divMessage')
            element.style.display = "block";
          }
        }

      },
      (error: {
      }) => {
        var x = JSON.parse(JSON.stringify(error))
        this.message = x;
        let element = document.getElementById('divMessage')
        element.style.display = "block";

      }
    );

    this.applicationService.getClientContacts(strRequest).subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.clientContacts = x.Contacts;
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            let element = document.getElementById('divMessage')
            element.style.display = "block";
          }
        }

      },
      (error: {
      }) => {
        var x = JSON.parse(JSON.stringify(error))
        this.message = x;
        let element = document.getElementById('divMessage')
        element.style.display = "block";

      }
    );

    this.applicationService.getTechnologies(strRequest).subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.technologies = x.Technologies;
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            let element = document.getElementById('divMessage')
            element.style.display = "block";
          }
        }

      },
      (error: {
      }) => {
        var x = JSON.parse(JSON.stringify(error))
        this.message = x;
        let element = document.getElementById('divMessage')
        element.style.display = "block";

      }
    );

    
    
    this.applicationService.getDomains(strRequest).subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.domainNames = x.Domains;
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            let element = document.getElementById('divMessage')
            element.style.display = "block";
          }
        }

      },
      (error: {
      }) => {
        var x = JSON.parse(JSON.stringify(error))
        this.message = x;
        let element = document.getElementById('divMessage')
        element.style.display = "block";

      }
    );


  }

  close() {
    this.modal.close();
  }


}
