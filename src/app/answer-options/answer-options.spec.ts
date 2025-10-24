import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerOptions } from './answer-options';

describe('AnswerOptions', () => {
  let component: AnswerOptions;
  let fixture: ComponentFixture<AnswerOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerOptions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerOptions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
