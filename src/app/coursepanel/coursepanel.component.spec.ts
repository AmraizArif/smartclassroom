import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepanelComponent } from './coursepanel.component';

describe('CoursepanelComponent', () => {
  let component: CoursepanelComponent;
  let fixture: ComponentFixture<CoursepanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursepanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
