import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedonboardingComponent } from './finishedonboarding.component';

describe('FinishedonboardingComponent', () => {
  let component: FinishedonboardingComponent;
  let fixture: ComponentFixture<FinishedonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
