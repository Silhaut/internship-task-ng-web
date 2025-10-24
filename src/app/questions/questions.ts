import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { QuestionFormDialog } from '../_components/question-form-dialog/question-form-dialog';
import { QuestionDto } from '../_dto/question.dto';
import { QuestionsService } from '../_services/questions';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-questions',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzFlexModule,
    NzDividerModule,
    NzTableModule,
    NzCollapseModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzTagModule,
    NzIconModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.scss'
})
export class Questions implements OnInit {
  private questionsService = inject(QuestionsService);
  private fb = inject(FormBuilder);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  questions: QuestionDto[] = [];
  total = 0;
  loading = false;

  query$ = new BehaviorSubject({
    page: 1,
    size: 20,
    sort: 'createdAt',
    order: 'desc' as 'asc' | 'desc',
  });

  filters = this.fb.group({
    id: [''],
    text: [''],
    createdAt: [''],
  });

  sortMap: Record<string, 'ascend' | 'descend' | null> = {
    id: null,
    name: null,
    description: null,
    createdAt: 'descend',
  };

  ngOnInit() {
    this.filters.valueChanges
      .pipe(debounceTime(400), skip(1))
      .subscribe((filters) => {
        this.query$.next({
          ...this.query$.value,
          ...filters,
          page: 1,
        });
      });

    this.query$.subscribe(() => this.loadProfessions());
  }

  loadProfessions() {
    this.loading = true;
    this.questionsService.getQuestions(this.query$.value).subscribe({
      next: (res) => {
        this.questions = res.data;
        this.total = res.totalSize;
        this.loading = false;
      },
      error: (err) => {
        this.message.error('Произошла ошибка при загрузке вопросов');
        this.loading = false;
      }
    });
  }


  resetFilters() {
    this.filters.reset();
  }

  sort(field: string, order: any) {
    const sortOrder = order as 'ascend' | 'descend' | null;
    Object.keys(this.sortMap).forEach((key) => (this.sortMap[key] = null));
    if (sortOrder) this.sortMap[field] = sortOrder;
    this.query$.next({
      ...this.query$.value,
      sort: field,
      order: sortOrder === 'ascend' ? 'asc' : 'desc',
    });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex } = params;
    this.query$.next({
      ...this.query$.value,
      page: pageIndex,
      size: pageSize,
    });
  }

  createOrUpdateProfession(question: QuestionDto | null, action: 'POST' | 'PUT') {
    const titleLabel = action === 'POST' ? 'Добавление' : 'Обновление'

    const dialogRef = this.modal.create({
      nzTitle: `${titleLabel} вопроса`,
      nzContent: QuestionFormDialog,
      nzWidth: 700,
      nzData: {
        question,
        action,
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        if (action === 'POST') {
          this.questionsService.addQuestion(dto)
            .subscribe({
              next: (result) => {
                if (result) {
                  this.message.success(`Вопрос успешно добавлен`)
                  this.loadProfessions()
                }
              },
              error: (err) => {
                this.message.error(`Произошла ошибка при добавлении вопроса:`, err.message)
              }
            })
        }
        if (action === 'PUT') {
          this.questionsService.update(question!.id, dto)
            .subscribe({
              next: (result) => {
                if (result) {
                  this.message.success(`Вопрос успешно обновлен`)
                  this.loadProfessions()
                }
              },
              error: (err) => {
                this.message.error(`Произошла ошибка при обновлении вопроса:`, err.message)
              }
            })
        }
      }
    })
  }
}
