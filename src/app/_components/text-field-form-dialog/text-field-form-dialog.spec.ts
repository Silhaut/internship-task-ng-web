import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextFieldFormDialog } from './text-field-form-dialog';

describe('TextFieldFormDialog', () => {
  let component: TextFieldFormDialog;
  let fixture: ComponentFixture<TextFieldFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFieldFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextFieldFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
