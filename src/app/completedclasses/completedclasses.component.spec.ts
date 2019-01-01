import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedclassesComponent } from './completedclasses.component';

describe('CompletedclassesComponent', () => {
  let component: CompletedclassesComponent;
  let fixture: ComponentFixture<CompletedclassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedclassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
