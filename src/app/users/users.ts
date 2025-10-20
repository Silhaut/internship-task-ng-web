import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { UserDto } from '../_dto/user.dto';
import { UsersService } from '../_services/users';
import { PagedDataDto } from '../_dto/paged-data.dto';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users implements OnInit {
  private usersService = inject(UsersService)

  page: number = 1
  size: number = 20;
  totalPage!: number;
  totalSize!: number;
  users$!: Observable<UserDto[]>;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers({
      page: this.page,
      size: this.size,
      sort: 'createdAt',
      order: 'desc',
    }).subscribe((result: PagedDataDto<UserDto>) => {
      this.users$ = of(result.data);
      this.totalPage = result.totalPage;
      this.totalSize = result.totalSize;
    });
  }
}
