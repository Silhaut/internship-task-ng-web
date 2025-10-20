import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, debounceTime, skip, switchMap } from 'rxjs';
import { ProfessionsService } from '../_services/professions';
import { ProfessionDto } from '../_dto/profession.dto';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UpdateProfessionDialog } from '../_components/update-profession-dialog/update-profession-dialog';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-professions',
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
  templateUrl: './professions.html',
  styleUrl: './professions.scss'
})
export class Professions implements OnInit {
  private professionsService = inject(ProfessionsService);
  private fb = inject(FormBuilder);
  private modal = inject(NzModalService)
  private message = inject(NzMessageService);

  professions: ProfessionDto[] = [];
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
    name: [''],
    description: [''],
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
    this.professionsService.getProfessions(this.query$.value).subscribe({
      next: (res) => {
        console.debug('[Professions] Loaded:', this.query$.value);
        this.professions = res.data;
        this.total = res.totalSize;
        this.loading = false;
      },
      error: (err) => {
        console.error('[Professions] Load failed:', err);
        this.message.error('Ошибка при загрузке профессий');
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

  updateProfession(profession: ProfessionDto) {
    const dialogRef = this.modal.create({
      nzTitle: 'Обновление профессии',
      nzContent: UpdateProfessionDialog,
      nzWidth: 700,
      nzData: {
        profession
      }
    })

    dialogRef.afterClose.subscribe((dto) => {
      if (dto) {
        this.professionsService.update(profession.id, dto)
          .subscribe({
            next: (result) => {
              if (result) {
                this.message.success(`Профессия успешно обновлена`)
                this.loadProfessions()
              }
            },
            error: (err) => {
              this.message.error(`Проищошла ошибка при обновлении профессии:`, err.message)
            }
          })
      }
    })
  }
}
