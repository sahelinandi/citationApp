import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
export interface DialogData {
  contactPersonName: string;
  designation: string;
  emailId: string;
  phoneNo: string;
}

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.less']
})
export class ContactDetailsComponent implements OnInit {
  contacts = [];
  contactFormModal: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    ngOnInit(): void {
      this.contactFormModal = this.formBuilder.group({
        'contactPersonName': new FormControl('',[Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(30)]),
        'designation': new FormControl('',[Validators.pattern('^[a-zA-Z \-\']+'),Validators.maxLength(25)]),
        'emailId': new FormControl('',Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')),
        'phoneNo' :  new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10),Validators.maxLength(10)])
 
       //'file': new FormControl('', Validators.required)
     });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  get f() { return this.contactFormModal.controls; }
 
  onSubmit() {
    this.submitted = true;
    if (this.contactFormModal.invalid) {
      return;
    }
    /*const formData = {
      contactPersonName: this.contactFormModal.controls.contactPersonName.value,
      designation: this.contactFormModal.controls.designation.value,
      emailId: this.contactFormModal.controls.emailId.value,
      phoneNo: this.contactFormModal.controls.phoneNo.value,
      mdaType: 'Minister',
      mdaId  : this.data.mdaId,
      auditDetails: {
        createdBy: this.userId
      },
      flag: 'U',
      deptSearch: ''
    };
    
    this.mdaService.saveMda(formData).subscribe(res => {
      if (res.status == '1') {
        this.submitted = false;
        this.mdaFormModal.reset();
        this.modal.close();
        return;
      }
    });
    this.contacts.push({
     
         'contactPersonName': this.contactFormModal.get("contactPersonName").value,
        'designation': this.contactFormModal.get("designation").value,
        'emailId':this.contactFormModal.get("emailId").value,
        'phoneNo': this.contactFormModal.get("phoneNo").value
      }
      );*/            
      this.contacts.push({
        'contactPersonName': this.contactFormModal.get("contactPersonName").value,
        'designation': this.contactFormModal.get("designation").value,
        'emailId':this.contactFormModal.get("emailId").value,
        'phoneNo': this.contactFormModal.get("phoneNo").value
        }
        );
    this.submitted = false;
    this.contactFormModal.reset();
    this.dialogRef.close();
    return;
  }

  close() {
    this.submitted = false;
    this.dialogRef.close();
  }
}
