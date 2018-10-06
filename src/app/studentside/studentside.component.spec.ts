import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsideComponent } from './studentside.component';

describe('StudentsideComponent', () => {
  let component: StudentsideComponent;
  let fixture: ComponentFixture<StudentsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
