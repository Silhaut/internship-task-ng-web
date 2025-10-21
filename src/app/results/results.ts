import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { TestResultWithTestAndProfessionDto } from '../_dto/test-result.dto';
import { ResultsService } from '../_services/results';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { RouterModule } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-results',
  imports: [
    CommonModule,
    NzPageHeaderModule,
    NzDividerModule,
    NzTableModule,
    NzTagModule,
    RouterModule,
  ],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results implements OnInit {
  private resultsService = inject(ResultsService);
  private fb = inject(FormBuilder);
  private message = inject(NzMessageService);

  results: TestResultWithTestAndProfessionDto[] = [];
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
    userId: [''],
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

    this.query$.subscribe(() => this.loadTests());
  }

  loadTests() {
    this.loading = true;
    this.resultsService.getTestResults(this.query$.value).subscribe({
      next: (res) => {
        console.debug('[Tests] Loaded:', this.query$.value);
        this.results = res.data;
        this.total = res.totalSize;
        this.loading = false;
      },
      error: (err) => {
        console.error('[Tests] Load failed:', err);
        this.message.error('Ошибка при загрузке тестов');
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
}
