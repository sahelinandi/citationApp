import { Component, OnInit, ViewChild } from '@angular/core';


import { FormBuilder, FormGroup, Validators, PatternValidator, FormControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { MasterdataService } from '../masterdata.service';
import { FileUploadService } from '../file-upload.service';


@Component({
  selector: 'app-search-citation',
  templateUrl: './search-citation.component.html',
  styleUrls: ['./search-citation.component.css']
})
export class SearchCitationComponent implements OnInit {


  // @ViewChild('dtpDOB', {static: false}) dtpDOB:DateTimePickerComponent;
  created_by_id: Number;
  submitted = false;
  isSelectedProject=false;
  selectedIndex=0;
  fgCitation: FormGroup;
  userId: Number;
  userType: string;
  isUserLoggedIn: boolean;
  subSbus = [];
  selectedSubSbuId;
  projectTypes = [];
  projects = [];
  selProjects:any;
  currencies = [];
  regions = [];
  countries = [];
  fundingAgencies = [];
  documentTypes = [];
  documents = [];
  message = "";
  fileToUpload: File = null;

  constructor(
    private router: Router,
    private applicationService: ApplicationService,
    private masterdataService: MasterdataService,
    private fileUploadService: FileUploadService

  ) { }

  ngOnInit() {
    this.fgCitation = new FormGroup({
      'projectName': new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
      'clientName': new FormControl('', [Validators.pattern('^[a-zA-Z \-\']+')]),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'projectValueFrom': new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      'projectValueTo': new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      'region': new FormControl('')
    });
    this.getMasterData("REGION");

    //this.getCountry();
    //this.applicationStatus = this.getMasterData("APPLICATION_STATUS");
    //this.relationship = this.getMasterData("RELATIONSHIP");

    /* this.getMasterData("REGION");
    this.getMasterData("CURRENCY");
    this.getMasterData("DOCUMENT_TYPE");
    this.getCountry();
    this.getSubSBU();
    this.getFundingAgency(); */
  }

  get cu() {
    return this.fgCitation.controls;
  }


  onSubmit() {

    this.submitted = true;
    console.log(this.fgCitation);

    if (this.fgCitation.invalid) {


      return;
    }

    console.log(this.fgCitation.value);


    var data = [];
    data.push(
      this.fgCitation.value

      /* userName: sessionStorage.getItem("userName"),
      applicantFirstName: this.fgCitation.value.firstName,
      applicantMiddleName: this.fgCitation.value.middleName,
      applicantLastName: this.fgCitation.value.lastName,
      mobile: JSON.stringify(this.fgCitation.value.contactNumber),
      gender: this.fgCitation.value.gender,
      dob: this.fgCitation.value.dob,
      district: this.fgCitation.value.district,
      block: this.fgCitation.value.block,
      aadhaar: JSON.stringify(this.fgCitation.value.aadhaar),
      house: JSON.stringify(this.fgCitation.value.house),
      ward: JSON.stringify(this.fgCitation.value.ward),
      town: this.fgCitation.value.town,
      street: this.fgCitation.value.street,
      policeStation: this.fgCitation.value.policeStation,
      pincode: this.fgCitation.value.pincode,
      location: this.fgCitation.value.location,
      bankIfsc: this.fgCitation.value.bankIfsc,
      bankName: this.fgCitation.value.bankName,
      bankBranch: this.fgCitation.value.bankBranch,
      bankAccountNum: JSON.stringify(this.fgCitation.value.bankAccountNum),
      pdsNum: JSON.stringify(this.fgCitation.value.pdsNum),
      mgnregsNum: JSON.stringify(this.fgCitation.value.mgnregsNum),
      aaycNum: JSON.stringify(this.fgCitation.value.aaycNum),
      annualFamilyIncome: JSON.stringify(this.fgCitation.value.annualFamilyIncome),
      formNumber: this.fgCitation.value.formNumber,
      submissionDate: this.fgCitation.value.submissionDate,
      applicationStatus: this.fgCitation.value.applicationStatus,
      appliedOn: this.fgCitation.value.appliedOn,
      approvedByDistrict: this.fgCitation.value.approvedByDistrict,
      recommendedBy: this.fgCitation.value.recommendedBy */
    );

    //data[0].documents = { documentsData: this.documents };

    var request = {
      data
    };

    console.log(request);

    var strRequest = JSON.stringify(request);

    this.applicationService.searchProject(strRequest).subscribe(
      (Data:
        {}) => {
        var x = JSON.parse(JSON.stringify(Data));

        if (x && x.SuccessStatus) {

          console.log(x.ProjectData);

          this.projects = x.ProjectData;

          //this.router.navigate(['/acknowledgement']);
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
      (error: {

      }) => {
        var x = JSON.parse(JSON.stringify(error))

        let element = document.getElementById('divMessage')
        element.style.display = "block";
      }
    );



  }



  getSubSBU() {
    this.masterdataService.getSubSBU().subscribe(
      (Data:
        {}) => {

        var x = JSON.parse(JSON.stringify(Data));

        if (x && x.SuccessStatus) {
          this.subSbus = x.SubSBUs;
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
      (error: {

      }) => {
        var x = JSON.parse(JSON.stringify(error))
        //this.LoginMessge = x.message;
        let element = document.getElementById('divMessage')
        element.style.display = "block";
      }
    );
  }


  onChangeSubSbu(event: Event): void {
    this.selectedSubSbuId = Number((<HTMLSelectElement>event.srcElement).value);
    this.getProjectType(this.selectedSubSbuId);
  }

  getProjectType(subSbuId: number) {

    var data = { subSBUId: subSbuId };

    this.masterdataService.getProjectType(JSON.stringify(data)).subscribe(
      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));

        if (x && x.SuccessStatus) {
          this.projectTypes = x.ProjectTypes;
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


  getMasterData(keyCode) {
    console.log(1);
    var data = { KeyCode: keyCode };

    this.masterdataService.getMasterData(JSON.stringify(data)).subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        console.log(2);
        console.log(x);
        if (x && x.SuccessStatus) {
          switch (keyCode) {
            case "CURRENCY":
              this.currencies = x.MasterData;
              console.log(this.currencies);
              break;
            case "REGION":
              this.regions = x.MasterData;
              break;
            case "DOCUMENT_TYPE":
              console.log(x.MasterData);
              this.documentTypes = x.MasterData;
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

  getCountry() {

    this.masterdataService.getCountry().subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.countries = x.Countries;
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

  getFundingAgency() {

    this.masterdataService.getFundingAgency().subscribe(

      (Data: {}) => {
        var x = JSON.parse(JSON.stringify(Data));
        if (x && x.SuccessStatus) {
          this.fundingAgencies = x.FundingAgencies;
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //const formData : FormData = new FormData();

    //formData.append("abc.png", this.fileToUpload, this.fileToUpload.name);


  }

  onUploadClick(documentTypeId: number) {

    console.log(documentTypeId);

    console.log(this.documentTypes);

    //let documentTypeText = this.documentTypes.find(i=>i.valueId = documentTypeId).description;

    //console.log(documentTypeText);


    this.fileUploadService.uploadFile(this.fileToUpload,this.fileToUpload.name).subscribe((data) => {
      console.log(data);
      this.documents.push({
        'name': this.fileToUpload.name,
        'dmsNodeId': data.DMSNodeId,
        'documentType': documentTypeId
        //'documentTypeText': documentTypeText
      }
      );
      console.log(this.documents);

    });


  }

  downlaodFile(nodeid:any,docName:any) {
    console.log("nodeid==>"+nodeid);
    this.fileUploadService.downloadFile(nodeid).subscribe((data) => {

      var base64String = data.filestream;
      const linkSource = 'data:application/pdf;base64,' + base64String;
      const downloadLink = document.createElement("a");
      const fileName = docName//"SSO-Login-Failed.png";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    });

  }
  

  onProjectSelect(index: number) {
    var data = [];
    const selectedProject = this.projects[index];
    this.isSelectedProject = true;
    this.selectedIndex = index;
    this.selProjects = this.projects[index];
    console.log(this.selProjects.projectId);
    data.push(this.projects[index]);
    var request = {
      data
    };

    console.log("sel proj req==>"+request);

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
  /*  var data = [];
    data.push(
      { projectId: selectedProject.projectId }

    );

    //data[0].documents = { documentsData: this.documents };

    var request = {
      data
    };

    console.log(request);

    var strRequest = JSON.stringify(request);

    this.applicationService.searchProject(strRequest).subscribe(
      (Data:
        {}) => {
        var x = JSON.parse(JSON.stringify(Data));

        if (x && x.SuccessStatus) {

          console.log(x.ProjectData);

          this.projects = x.ProjectData;

          //this.router.navigate(['/acknowledgement']);
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
      (error: {

      }) => {
        var x = JSON.parse(JSON.stringify(error))

        let element = document.getElementById('divMessage')
        element.style.display = "block";
      }
    );*/




  }




}

