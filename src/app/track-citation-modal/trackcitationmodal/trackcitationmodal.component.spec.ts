import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackcitationmodalComponent } from './trackcitationmodal.component';

describe('TrackcitationmodalComponent', () => {
  let component: TrackcitationmodalComponent;
  let fixture: ComponentFixture<TrackcitationmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackcitationmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackcitationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
