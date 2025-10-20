import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { UserDto } from '../_dto/user.dto';
import { UsersService } from '../_services/users';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-users',
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
    ReactiveFormsModule,
    NzTagModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  private usersService = inject(UsersService);
  private fb = inject(FormBuilder);

  users: UserDto[] = [];
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
    telegramId: [''],
    username: [''],
    firstName: [''],
    lastName: [''],
    role: [''],
    phone: [''],
  });

  ngOnInit() {
    this.filters.valueChanges
      .pipe(debounceTime(400))
      .subscribe((filters) => {
        this.query$.next({
          ...this.query$.value,
          ...filters,
          page: 1,
        });
      });

    this.query$
      .pipe(
        switchMap((query) => {
          this.loading = true;
          return this.usersService.getUsers(query);
        })
      )
      .subscribe((res) => {
        console.debug('[Users] Query sent:', this.query$.value);
        this.users = res.data;
        this.total = res.totalSize;
        this.loading = false;
      });
  }

  resetFilters() {
    this.filters.reset();
  }
}
