import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersQueryDto } from '../_dto/users-query.dto';
import { Observable } from 'rxjs';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { UserDto } from '../_dto/user.dto';
import { ApiClient } from './api-client';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/users';
  private apiClient = inject(ApiClient);

  getUsers(query: UsersQueryDto): Observable<PagedDataDto<UserDto>> {
    return this.apiClient.getPaged<PagedDataDto<UserDto>>(this.apiUrl, query);
  }
}
