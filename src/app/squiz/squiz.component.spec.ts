import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquizComponent } from './squiz.component';

describe('SquizComponent', () => {
  let component: SquizComponent;
  let fixture: ComponentFixture<SquizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
