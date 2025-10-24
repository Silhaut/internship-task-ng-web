import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormDialog } from './question-form-dialog';

describe('QuestionFormDialog', () => {
  let component: QuestionFormDialog;
  let fixture: ComponentFixture<QuestionFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
