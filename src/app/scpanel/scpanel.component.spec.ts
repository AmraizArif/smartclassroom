import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScpanelComponent } from './scpanel.component';

describe('ScpanelComponent', () => {
  let component: ScpanelComponent;
  let fixture: ComponentFixture<ScpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
