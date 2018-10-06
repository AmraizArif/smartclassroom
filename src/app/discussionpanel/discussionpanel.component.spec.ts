import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionpanelComponent } from './discussionpanel.component';

describe('DiscussionpanelComponent', () => {
  let component: DiscussionpanelComponent;
  let fixture: ComponentFixture<DiscussionpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
