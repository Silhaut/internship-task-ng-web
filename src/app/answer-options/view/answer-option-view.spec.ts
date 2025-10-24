import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOptionView } from './answer-option-view';

describe('AnswerOptionView', () => {
  let component: AnswerOptionView;
  let fixture: ComponentFixture<AnswerOptionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerOptionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerOptionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
