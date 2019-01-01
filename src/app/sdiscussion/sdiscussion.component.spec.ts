import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdiscussionComponent } from './sdiscussion.component';

describe('SdiscussionComponent', () => {
  let component: SdiscussionComponent;
  let fixture: ComponentFixture<SdiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
