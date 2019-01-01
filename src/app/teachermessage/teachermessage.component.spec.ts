import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachermessageComponent } from './teachermessage.component';

describe('TeachermessageComponent', () => {
  let component: TeachermessageComponent;
  let fixture: ComponentFixture<TeachermessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachermessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
