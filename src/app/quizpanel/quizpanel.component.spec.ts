import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizpanelComponent } from './quizpanel.component';

describe('QuizpanelComponent', () => {
  let component: QuizpanelComponent;
  let fixture: ComponentFixture<QuizpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
