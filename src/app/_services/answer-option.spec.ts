import { TestBed } from '@angular/core/testing';

import { AnswerOption } from './answer-option';

describe('AnswerOption', () => {
  let service: AnswerOption;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerOption);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
