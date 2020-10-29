import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationdetailsComponent } from './applicationdetails.component';

describe('ApplicationdetailsComponent', () => {
  let component: ApplicationdetailsComponent;
  let fixture: ComponentFixture<ApplicationdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
