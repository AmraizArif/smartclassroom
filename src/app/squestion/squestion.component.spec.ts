import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquestionComponent } from './squestion.component';

describe('SquestionComponent', () => {
  let component: SquestionComponent;
  let fixture: ComponentFixture<SquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
