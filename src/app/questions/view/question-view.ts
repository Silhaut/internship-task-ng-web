import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuestionFormDialog } from '../../_components/question-form-dialog/question-form-dialog';
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
  ],
  templateUrl: './question-view.html',
  styleUrl: './question-view.scss'
})
export class QuestionView implements OnInit {
  private questionsService = inject(QuestionsService);
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
      nzContent: QuestionFormDialog,
      nzWidth: 700,
      nzData: {
        question: this.question,
        action: 'PUT'
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
}
