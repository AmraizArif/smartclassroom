import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachercompletedComponent } from './teachercompleted.component';

describe('TeachercompletedComponent', () => {
  let component: TeachercompletedComponent;
  let fixture: ComponentFixture<TeachercompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachercompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachercompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
