import { Component, inject, OnInit } from '@angular/core';
import { AnswerOptionService } from '../../_services/answer-option';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AnswerOptionWithQuestionDto } from '../../_dto/answer-option.dto';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { TextFieldFormDialog } from '../../_components/text-field-form-dialog/text-field-form-dialog';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzTagModule,
    NzCardModule,
    NzDescriptionsModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzFlexModule,
    RouterModule,
  ],
  templateUrl: './answer-option-view.html',
  styleUrl: './answer-option-view.scss'
})
export class AnswerOptionView implements OnInit {
  private answerOptionService = inject(AnswerOptionService);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  optionId!: string;
  option!: AnswerOptionWithQuestionDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.optionId = params['id'];
      this.loadAnswerOption()
    })
  }

  loadAnswerOption() {
    this.answerOptionService.getAnswerOption(this.optionId).subscribe(result => {
      this.option = result;
    });
  }

  updateAnswerOption() {
    const dialogRef = this.modal.create({
      nzTitle: 'Добавить вес к вопросу',
      nzContent: TextFieldFormDialog,
      nzWidth: 700,
      nzData: {
        object: this.option,
        action: 'PUT',
        formLabel: 'Текст к варианту ответа',
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        this.answerOptionService.update(this.optionId, dto).subscribe({
          next: (result) => {
            if (result) {
              this.message.success(`Вариант ответа успешно обновлен`)
              this.loadAnswerOption()
            }
          },
          error: (err) => {
            this.message.error(`Произошла ошибка при обновлении варианта ответа:`, err.message)
          }
        })
      }
    })
  }
}
