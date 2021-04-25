import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionUserComponent } from './question-user.component';

describe('QuestionUserComponent', () => {
  let component: QuestionUserComponent;
  let fixture: ComponentFixture<QuestionUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
