import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from './api-client';
import { Observable } from 'rxjs';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { TestWithUserAndAnswerAndResultDto, TestWithUserDto } from '../_dto/test.dto';
import { TestQueryDto } from '../_dto/test-query.dto';

@Injectable({
  providedIn: 'root'
})
export class TestsService {
  private http = inject(HttpClient);
  private apiClient = inject(ApiClient);

  getTests(query: TestQueryDto): Observable<PagedDataDto<TestWithUserDto>> {
    return this.apiClient.getPaged<PagedDataDto<TestWithUserDto>>(`/api/v2/tests/`, query);
  }

  getTest(testId: string): Observable<TestWithUserAndAnswerAndResultDto> {
    return this.http.get<TestWithUserAndAnswerAndResultDto>(`http://localhost:3000/api/v2/tests/${testId}`);
  }
}
