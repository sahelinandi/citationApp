import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.css']
})
export class AcknowledgementComponent implements OnInit {

  applicationNumber='';

  constructor() { }

  ngOnInit(): void {
    this.applicationNumber=sessionStorage.getItem("applicationNumber");
  }

}
