import { Component, inject, OnInit } from '@angular/core';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { ProfessionDto } from '../../_dto/profession.dto';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-update-profession-dialog',
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-profession-dialog.html',
  styleUrl: './update-profession-dialog.scss'
})
export class UpdateProfessionDialog implements OnInit {
  private modal = inject(NzModalRef)
  private formBuilder = inject(FormBuilder);

  profession!: ProfessionDto;
  form!: FormGroup;

  ngOnInit() {
    const data = this.modal.getConfig().nzData;
    this.profession = data.profession;

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
    })

    this.form.patchValue({
      ...this.profession
    })
  }

  onCancel() {
    this.modal.destroy();
  }

  onSave() {
    if (this.form.invalid) this.modal.close(null)

    this.modal.close(this.form.value)
  }
}
