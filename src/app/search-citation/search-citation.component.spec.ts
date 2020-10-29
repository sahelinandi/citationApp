import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCitationComponent } from './search-citation.component';

describe('SearchCitationComponent', () => {
  let component: SearchCitationComponent;
  let fixture: ComponentFixture<SearchCitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
