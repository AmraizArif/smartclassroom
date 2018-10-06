import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentclassesComponent } from './studentclasses.component';

describe('StudentclassesComponent', () => {
  let component: StudentclassesComponent;
  let fixture: ComponentFixture<StudentclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
