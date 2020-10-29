import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCitationComponent } from './register-citation.component';

describe('RegisterCitationComponent', () => {
  let component: RegisterCitationComponent;
  let fixture: ComponentFixture<RegisterCitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterCitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
