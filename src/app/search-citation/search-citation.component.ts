  import { Component, OnInit, ViewChild } from '@angular/core';


import { FormBuilder, FormGroup, Validators, PatternValidator, FormControl,FormArray } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../application.service';
import { MasterdataService } from '../masterdata.service';
import { FileUploadService } from '../file-upload.service';
import{environment} from '../../environments/environment';
import{MatDialogConfig, MatDialog} from '@angular/material/dialog';
import{TrackcitationmodalComponent} from '../track-citation-modal/trackcitationmodal/trackcitationmodal.component'
import {Sort} from '@angular/material/sort';
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
  inboxPage:Number = 1;
  sortedData:any=[];  
  inboxSelectedValue: number;    
  inboxStart : number;
  inboxEnd : number;   
  paginationArrayData: any []= environment.pageSizeOptions;
  searchFileFlag:string;
  dataFlag : boolean = false;
  noRecoedFlag : boolean = false;
  inboxDataShow:any;
  filesCount: number;
  technologies:any;
  selTechnologies=[];
  domainnames:any;
  selDomainnames=[];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private formBuilderSearch: FormBuilder,
    private applicationService: ApplicationService,
    private masterdataService: MasterdataService,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,private fb: FormBuilder

  ) {this.inboxStart = 1;
    this.inboxEnd = this.paginationArrayData[0].index;
    this.inboxSelectedValue = this.paginationArrayData[0].index; }

  ngOnInit() {
    this.fgCitation = this.fb.group({
      'projectName': new FormControl('', [Validators.required,Validators.pattern('^[a-zA-Z \-\']+')]),
      'clientName': new FormControl('', [Validators.pattern('^[a-zA-Z \-\']+')]),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'projectValueFrom': new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      'projectValueTo': new FormControl('', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      'region': new FormControl(''),
      'architechtureType': new FormControl(''),
      technologies: this.formBuilder.array([])  ,
      domainnames:  this.formBuilder.array([])  ,
      'inboxSelectedValue': this.inboxSelectedValue

    });
    this.getMasterData("REGION");
    this.getMasterData("TECHNOLOGY");
    this.getMasterData("DOMAIN_NAME");
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
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
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

          console.log("prject data==>"+x.ProjectData);

          this.projects = x.ProjectData;

          //this.router.navigate(['/acknowledgement']);
          if(this.projects.length === 0){
            this.noRecoedFlag = false;
           
          }else{
            this.dataFlag = true;
            this.noRecoedFlag = true;
    
          }
          this.filesCount=this.projects.length;                
          this.sortedData = this.projects.slice();                    
       //console.log("Serach List==>"+this.sortedData);
       
     



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

    if(this.filesCount < this.inboxEnd){      
      this.inboxDataShow = this.projects.length;
     }else{
      this.inboxDataShow = this.inboxEnd;
     }

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
  onPageSizeChangeInboxDropDown(ob) {      
    this.inboxEnd = this.inboxSelectedValue;  
    this.inboxStart =  1;    
    this.onSubmit();
    this.inboxPage = 1;
  }
  
  onPageChangeInboxPagination(ob) {        
    this.inboxStart = (ob - 1) * this.inboxSelectedValue + 1;
    this.inboxEnd = ob * this.inboxSelectedValue;
    // console.log(this.inboxStart );
    // console.log(this.inboxEnd );
     this.onSubmit();
     this.inboxPage = ob;
  
     if(this.filesCount< this.inboxEnd){      
      this.inboxDataShow = this.projects.length;
     }else{
      this.inboxDataShow = this.inboxEnd;
     }
  }
  
  sortData(sort: Sort) {    
    const data = this.projects.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }
  
    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'rnum': return compare(a.rnum, b.rnum, isAsc);     
        case 'fileName': return compare(a.fileName, b.fileName, isAsc);     
        case 'fileSubject': return compare(a.fileSubject, b.fileSubject, isAsc);  
        case 'createdBy': return compare(a.createdBy, b.createdBy, isAsc);  
        case 'dateOfCreation': return compare(a.dateOfCreation, b.dateOfCreation, isAsc);  
        case 'fileTrack': return compare(a.fileTrack, b.fileTrack, isAsc);  
        case 'fileAction': return compare(a.fileAction, b.fileAction, isAsc);  
        case 'fileStatus': return compare(a.fileStatus, b.fileStatus, isAsc);  
       
        default: return 0;
        
      }
    });
    
  }
  
  showReferenceOptions(file:any){
    console.log("Track dtls==>"+file);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '200px';
    dialogConfig.height = '50%';
    dialogConfig.data=file;
    
    const dialogRef = this.dialog.open(TrackcitationmodalComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(
        // val => console.log("Dialog output:", val)
    );  
  }
  
  showReferenceOptionsSearch(user: any, section_name:any) {
      // console.log(section_name);
      let data = {
        taskId: user.taskId,
        fileName: user.fileName,
        section_name: section_name
      }
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.maxHeight = '95vw';
      dialogConfig.width = '20px';
      dialogConfig.height = '10px';
      //dialogConfig.data=user.taskId;
      dialogConfig.data = data;
  
    /*  const dialogRef = this.dialog.open(FileDetailsModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(
        val =>{
          // this.getInboxList('');
          // this.getDraftsList('');
          // this.getSentList('');
        }
      );*/
    }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
