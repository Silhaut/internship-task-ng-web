import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuestionDto } from '../_dto/question.dto';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TextFieldFormDialog } from '../_components/text-field-form-dialog/text-field-form-dialog';
import { AnswerOptionService } from '../_services/answer-option';
import { AnswerOptionWithQuestionDto } from '../_dto/answer-option.dto';
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
  selector: 'app-answer-options',
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
  templateUrl: './answer-options.html',
  styleUrl: './answer-options.scss'
})
export class AnswerOptions implements OnInit {
  private answerOptionsService = inject(AnswerOptionService);
  private fb = inject(FormBuilder);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  answerOptions: AnswerOptionWithQuestionDto[] = [];
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

    this.query$.subscribe(() => this.loadAnswerOptions());
  }

  loadAnswerOptions() {
    this.loading = true;
    this.answerOptionsService.getAnswerOptions(this.query$.value).subscribe({
      next: (res) => {
        this.answerOptions = res.data;
        this.total = res.totalSize;
        this.loading = false;
      },
      error: (err) => {
        this.message.error('Произошла ошибка при загрузке вариантов ответа');
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

  updateAnswerOption(answerOption: AnswerOptionWithQuestionDto) {
    const dialogRef = this.modal.create({
      nzTitle: `Добавление варианта ответа`,
      nzContent: TextFieldFormDialog,
      nzWidth: 700,
      nzData: {
        object: answerOption,
        action: 'PUT',
        formLabel: 'Текст к варианту ответа'
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        this.answerOptionsService.update(answerOption!.id, dto)
          .subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Вариант ответа успешно обновлен`)
                this.loadAnswerOptions()
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
