import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionDto } from '../../_dto/question.dto';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AnswerOptionDto } from '../../_dto/answer-option.dto';

@Component({
  selector: 'app-text-field-form-dialog',
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './text-field-form-dialog.html',
  styleUrl: './text-field-form-dialog.scss'
})
export class TextFieldFormDialog implements OnInit {
  private modal = inject(NzModalRef)
  private formBuilder = inject(FormBuilder);

  object?: QuestionDto | AnswerOptionDto;
  form!: FormGroup;
  action!: 'POST' | 'PUT';
  formLabel!: string;

  ngOnInit() {
    const data = this.modal.getConfig().nzData;
    this.object = data.object;
    this.action = data.action;
    this.formLabel = data.formLabel;

    this.form = this.formBuilder.group({
      text: [null, Validators.required],
    })

    if (this.action === 'PUT') {
      this.form.patchValue({
        ...this.object
      })
    }
  }

  onCancel() {
    this.modal.destroy();
  }

  onSave() {
    if (this.form.valid) {
      this.modal.close(this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        control.markAsDirty();
        control.markAsTouched();
        control.updateValueAndValidity();
      });
    }
  }
}
