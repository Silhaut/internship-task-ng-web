import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { QuestionDto } from '../../_dto/question.dto';

@Component({
  selector: 'app-question-form-dialog',
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './question-form-dialog.html',
  styleUrl: './question-form-dialog.scss'
})
export class QuestionFormDialog implements OnInit {
  private modal = inject(NzModalRef)
  private formBuilder = inject(FormBuilder);

  question!: QuestionDto;
  form!: FormGroup;
  action!: 'POST' | 'PUT';

  ngOnInit() {
    const data = this.modal.getConfig().nzData;
    this.question = data.question;
    this.action = data.action;

    this.form = this.formBuilder.group({
      text: [null, Validators.required],
    })

    if (this.action === 'PUT') {
      this.form.patchValue({
        ...this.question
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
