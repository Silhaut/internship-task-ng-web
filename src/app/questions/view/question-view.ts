import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuestionsService } from '../../_services/questions';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { QuestionWithAnswerOptionsDto } from '../../_dto/question-with-answer-options.dto';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { AnswerOptionService } from '../../_services/answer-option';
import { TextFieldFormDialog } from '../../_components/text-field-form-dialog/text-field-form-dialog';
import { AnswerOptionDto } from '../../_dto/answer-option.dto';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

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
    NzPopconfirmModule,
    RouterModule,
  ],
  templateUrl: './question-view.html',
  styleUrl: './question-view.scss'
})
export class QuestionView implements OnInit {
  private questionsService = inject(QuestionsService);
  private answerOptionService = inject(AnswerOptionService);
  private route = inject(ActivatedRoute);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  questionId!: string;
  question!: QuestionWithAnswerOptionsDto;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.questionId = params['id'];
      this.loadQuestion()
    })
  }

  loadQuestion() {
    this.questionsService.getQuestionWithAnswers(this.questionId).subscribe(result => {
      this.question = result;
    });
  }

  updateProfession() {
    const dialogRef = this.modal.create({
      nzTitle: 'Обновление вопроса',
      nzContent: TextFieldFormDialog,
      nzWidth: 700,
      nzData: {
        object: this.question,
        action: 'PUT',
        formLabel: 'Текст к вопросу',
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        this.questionsService.update(this.questionId, dto)
          .subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Вопрос успешно обновлена`)
                this.loadQuestion()
              }
            },
            error: (err) => {
              this.message.error(`Произошла ошибка при обновлении вопроса:`, err.message)
            }
          })
      }
    })
  }

  addAnswerOption(option: AnswerOptionDto | null, action: 'POST' | 'PUT') {
    const dialogRef = this.modal.create({
      nzTitle: 'Добавить вариант ответа',
      nzContent: TextFieldFormDialog,
      nzWidth: 700,
      nzData: {
        action,
        formLabel: 'Текст к варианту ответа',
        object: option,
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        if (action === 'POST') {
          const payload = {
            questionId: this.questionId,
            text: dto.text,
          }

          this.answerOptionService.addAnswerOption(payload).subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Вариант ответа успешно добавлен`)
                this.loadQuestion()
              }
            },
            error: (err) => {
              this.message.error(`Произошла ошибка при добавлении варианта ответа:`, err.message)
            }
          })
        }
        if (action === 'PUT') {
          this.answerOptionService.update(option!.id, dto).subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Вариант ответа успешно добавлен`)
                this.loadQuestion()
              }
            },
            error: (err) => {
              this.message.error(`Произошла ошибка при добавлении варианта ответа:`, err.message)
            }
          })
        }
      }
    })
  }

  deleteAnswerOption(optionId: string) {
    this.answerOptionService.delete(optionId).subscribe({
      next: () => {
        this.message.success(`Вариант ответа успешно удален`)
        this.loadQuestion()
      },
      error: () => {
        this.message.error(`Произошла ошибка при удалении варианта ответа: Вариант с весом ответа не может быть удалена!`)
      }
    })
  }
}
