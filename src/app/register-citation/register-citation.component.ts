import { Component, OnInit, ViewChild,Inject } from '@angular/core';


import { FormBuilder, FormGroup, Validators, PatternValidator, FormControl,FormArray } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { MasterdataService } from '../masterdata.service';
import { FileUploadService } from '../file-upload.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import{ContactDetailsComponent} from '../contact-details/contact-details.component';
import { AuthService } from '../auth.service';
/* import {DateTimePickerComponent} from '../date-time-picker/date-time-picker.component'; */
export interface DialogData {
  contactPersonName: string;
  designation: string;
  emailId: string;
  phoneNo: string
}


@Component({
  selector: 'app-register-citation',
  templateUrl: './register-citation.component.html',
  styleUrls: ['./register-citation.component.css']
})  
export class RegisterCitationComponent implements OnInit {

  // @ViewChild('dtpDOB', {static: false}) dtpDOB:DateTimePickerComponent;
  created_by_id: Number;
  submitted = false;
  addcontactFlag = false;
  fgCitation: FormGroup;
  userId: Number;
  userType: string;
  isUserLoggedIn: boolean;
  subSbus = [];
  selectedSubSbuId;
  projectTypes = [];
  technologies:any;
  selTechnologies=[];
  domainnames:any;
  selDomainnames=[];
  currencies= [];
  regions= [];
  countries= [];
  fundingAgencies= [];
  documentTypes= [];  
  documents = [];
  clinetContacts = [];
  contacts = [];
  message = "";
  fileToUpload: File = null;
  seldocumentType:any;
  documnetErrorMsg:any;
  contactPersonName: string;
  designation: string;
  emailId: string;
  phoneNo: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService,
    private masterdataService: MasterdataService,
    private fileUploadService: FileUploadService,
    public dialog: MatDialog,
    public authSurvice: AuthService

  ) { }

  ngOnInit() {
    //this.fgCitation = new FormGroup({
      this.fgCitation = this.formBuilder.group({
      'projectName': new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'), Validators.minLength(6)]),
      'clientName': new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+'), Validators.minLength(6)]),
      'startDate': new FormControl('', Validators.required),
      'endDate': new FormControl('', Validators.required),
      'projectValue': new FormControl('', [Validators.required,  Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.minLength(6)]),
      'currency': new FormControl('', Validators.required),
     /* 'region': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'fundingAgency': new FormControl('', Validators.required),
      'subSbu': new FormControl('', Validators.required),
      'projectType': new FormControl('', Validators.required),
      'isNetworkFirmOpportunity': new FormControl('',),
      'leadFirmCountry': new FormControl('', Validators.required),*/
      'region': new FormControl(''),
      'country': new FormControl(''),
      'fundingAgency': new FormControl(''),
      'subSbu': new FormControl(''),
      'projectType': new FormControl(''),
      'isNetworkFirmOpportunity': new FormControl('',),
      'leadFirmCountry': new FormControl(''),
      'pwcIndiaValue': new FormControl('', Validators.required),
      'architechtureType': new FormControl('', Validators.required),
      'documentType': new FormControl('', Validators.required),
      'documentName': new FormControl('', Validators.required),
       'contactPersonName': new FormControl('',Validators.pattern('^[a-zA-Z \-\']+')),
       'designation': new FormControl('',Validators.pattern('^[a-zA-Z \-\']+')),
       'emailId': new FormControl(''),
       'phoneNo' :  new FormControl(''),
        technologies: this.formBuilder.array([])  ,
        domainnames:  this.formBuilder.array([])  
      //'file': new FormControl('', Validators.required)
    });


    //this.getCountry();
    //this.applicationStatus = this.getMasterData("APPLICATION_STATUS");
    //this.relationship = this.getMasterData("RELATIONSHIP");

    this.getMasterData("REGION");
    this.getMasterData("CURRENCY");
    this.getMasterData("DOCUMENT_TYPE");
    this.getMasterData("TECHNOLOGY");
    this.getMasterData("DOMAIN_NAME");
    this.getCountry();
    this.getSubSBU();
    this.getFundingAgency();
  }

  get cu() {
    return this.fgCitation.controls;
  }
  addCotactDiv()
  {
    this.addcontactFlag = true;
    console.log("add contact::"+ this.addcontactFlag);//(this.fgCitation.get('contactPersonName').value);
  }
  removeCotactDiv(){
    this.addcontactFlag = false;
  }
  saveContact()
  {
    this.clinetContacts.push({
      //  'name': this.fileToUpload.name,
         'contactPersonName': this.fgCitation.get("contactPersonName").value,
        'designation': this.fgCitation.get("designation").value,
        //'documentType': documentTypeId
        'emailId':this.fgCitation.get("emailId").value,
        'phoneNo': this.fgCitation.get("phoneNo").value
      }
      );
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

      
    );

    data[0].documents = { documentsData: this.documents };
    data[0].clinetContacts = {clinetContactsData : this.clinetContacts};
    data[0].technologies = {technlologyData : this.selTechnologies};
    data[0].domainnames = {domainData: this.selDomainnames};
    data[0].userId = this.authSurvice.getUserId();
    var request = {
      data
    };

    console.log("request form obj==>"+request);

    var strRequest = JSON.stringify(request);

    this.applicationService.saveProject(strRequest).subscribe(
      (Data:
        {}) => {
        var x = JSON.parse(JSON.stringify(Data));

        if (x && x.SuccessStatus) {

          this.router.navigate(['/acknowledgement']);
        }
        else {
          if (x && x.ErrorMessage) {
            this.message = x.ErrorMessage;
            if(  this.message.includes("duplicate key value violates unique constraint"))
            {
              this.message = "Same project name and client name is already exists!";
            }
            
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
            case "TECHNOLOGY":  
            console.log(x.MasterData);
            this.technologies = x.MasterData;
            break;
            case "DOMAIN_NAME":
            console.log(x.MasterData);
            this.domainnames = x.MasterData;
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

  attachmentSelection(event) {
    console.log("sel doc type::"+event);
    this.seldocumentType=Number((<HTMLSelectElement>event.srcElement).value)
    console.log("sel doc type value::"+this.seldocumentType);
      
  }
  validateFiles(file, docTypeId) {
    // each mulitplication by 1024 converts to kb, mb, gb, etc.
    // currently at Mb
    
    const fileunit = 1024 * 1024
   // const maxsize = 2 * fileunit
   let maxsize; 
    // list of allowed extensions should be added here
    if(docTypeId == "6")
    {
      maxsize  = 20 * fileunit
   // var allowedExtensions = /(\.doc|\.docx|\.pdf|\.ppt|\.pptx)$/i;
    var allowedExtensions = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                              'application/msword', 'application/pdf', 'application/vnd.ms-powerpoint',
                            'application/vnd.openxmlformats-officedocument.presentationml.presentation']
    if (allowedExtensions.includes(file.type))
      if (file.size > 0 && file.size <= maxsize)
        return { allowed: true, err: "" }
      else
        return { allowed: false, err: "File size greater than 20MB" }
    else
      return { allowed: false, err: "Invalid file type!" }
    }else if(docTypeId == "5"){
      maxsize  = 1 * fileunit
     // var allowedExtensions = /(\.doc|\.docx)$/i;
     var allowedExtensions = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'application/msword']
      if (allowedExtensions.includes(file.type))
        if (file.size > 0 && file.size <= maxsize)
          return { allowed: true, err: "" }
        else
          return { allowed: false, err: "File size greater than 1MB" }
      else
        return { allowed: false, err: "Invalid file type!" }
    }else if(docTypeId == "7"){
      maxsize  = 1 * fileunit
     // var allowedExtensions = /(\.ppt|\.pptx)$/i;
     var allowedExtensions = [ 'application/vnd.ms-powerpoint',
   'application/vnd.openxmlformats-officedocument.presentationml.presentation']
      if (allowedExtensions.includes(file.type))
        if (file.size > 0 && file.size <= maxsize)
          return { allowed: true, err: "" }
        else
          return { allowed: false, err: "File size greater than 1MB" }
      else
        return { allowed: false, err: "Invalid file type!" }
    }
    else{
      maxsize = 1 * fileunit
     // var allowedExtensions = /(\.doc|\.docx|\.pdf|\.ppt|\.pptx)$/i;
     var allowedExtensions = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
     'application/msword', 'application/pdf', 'application/vnd.ms-powerpoint',
   'application/vnd.openxmlformats-officedocument.presentationml.presentation']
      if (allowedExtensions.includes(file.type))
        if (file.size > 0 && file.size <= maxsize)
          return { allowed: true, err: "" }
        else
          return { allowed: false, err: "File size greater than 1MB" }
      else
        return { allowed: false, err: "Invalid file type!" }
    }
  }
  onUploadClick(documentTypeId: number) {

    console.log("documentTypeId :: "+this.documentTypes);


    let documentTypeText ;//= this.documentTypes.find(i=>i.valueId = this.fgCitation.get('documentType').value).description;
    this.documentTypes.forEach( (element) => {
      if(element.valueId ==  this.fgCitation.get('documentType').value)
      {
        documentTypeText = element.description;
      }
  });

    console.log("File Type==>"+  this.fileToUpload.type);
     this.fileToUpload.type
    let validfile = this.validateFiles(this.fileToUpload, documentTypeId)
    if (validfile.allowed) {
      this.documnetErrorMsg = "";
    this.fileUploadService.uploadFile(this.fileToUpload,this.fgCitation.get("documentName").value).subscribe((data) => {
      console.log(data);
      this.documents.push({
      //  'name': this.fileToUpload.name,
         'name': this.fgCitation.get("documentName").value,
        'dmsNodeId': data.DMSNodeId,
        //'documentType': documentTypeId
        'documentType': documentTypeId,
        'documentTypeText': documentTypeText,
        'fileName' : this.fileToUpload.name
      }
      );
      console.log(this.documents);

    });

  }else{
          this.documnetErrorMsg = validfile.err; 
  }


  }

  downlaodFile(nodeid:any) {
    this.fileUploadService.downloadFile(nodeid).subscribe((data) => {

      var base64String = data.filestream;
      const linkSource = 'data:application/pdf;base64,' + base64String;
      const downloadLink = document.createElement("a");
      const fileName = "SSO-Login-Failed.png";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    });

  }

  onDeleteDocumentMember(i:any)
  {
    console.log(i);
    this.documents.splice(i, 1);
  }

  onDeleteCitationMember(i:any)
  {
    this.clinetContacts.splice(i, 1);
  }
  change()
  {
    console.log(this.fgCitation.value);
  }
  onChangeTechnology(event) {
    const technologies = <FormArray>this.fgCitation.get('technologies') as FormArray;
  
    if(event.checked) {
      technologies.push(new FormControl(event.source.value))
      this.selTechnologies.push({'valueId' : event.source.value});
    } else {
      const i = technologies.controls.findIndex(x => x.value === event.source.value);
      technologies.removeAt(i);
      const j = this.selTechnologies.findIndex(y => y.value === event.source.value);
      this.selTechnologies.splice(j);
    }
  }
  onChangeDomain(event) {
    const domainnames = <FormArray>this.fgCitation.get('domainnames') as FormArray;
  
    if(event.checked) {
      domainnames.push(new FormControl(event.source.value))
      this.selDomainnames.push({'valueId' : event.source.value});
    } else {
      const i = domainnames.controls.findIndex(x => x.value === event.source.value);
      domainnames.removeAt(i);
      const j = this.selDomainnames.findIndex(y => y.value === event.source.value);
      this.selDomainnames.splice(j);
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContactDetailsComponent, {
      width: '200px',
      data: {contactPersonName: this.contactPersonName, designation: this.designation,emailId:this.emailId, phoneNo: this.phoneNo}
      
    });
    this.contacts =  dialogRef.componentInstance.contacts;
   
  
    dialogRef.afterClosed().subscribe(result => {
     this.clinetContacts.push({
         'contactPersonName':dialogRef.componentInstance.contacts[0].contactPersonName,
        'designation': dialogRef.componentInstance.contacts[0].designation,
        //'documentType': documentTypeId
        'emailId':dialogRef.componentInstance.contacts[0].emailId,
        'phoneNo': dialogRef.componentInstance.contacts[0].phoneNo
      }
      );
    });
  }
}
