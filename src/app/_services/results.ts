import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from './api-client';
import { Observable } from 'rxjs';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { TestResultQueryDto } from '../_dto/test-result-query.dto';
import {
  TestResultWithTestAndProfessionDto,
  TestResultWithTestWithoutUserAndProfessionDto
} from '../_dto/test-result.dto';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private http = inject(HttpClient);
  private apiClient = inject(ApiClient);

  getTestResults(query: TestResultQueryDto): Observable<PagedDataDto<TestResultWithTestAndProfessionDto>> {
    return this.apiClient.getPaged<PagedDataDto<TestResultWithTestAndProfessionDto>>(`/api/v2/results/`, query);
  }

  getTestResult(resultId: string): Observable<TestResultWithTestWithoutUserAndProfessionDto> {
    return this.http.get<TestResultWithTestWithoutUserAndProfessionDto>(`http://localhost:3000/api/v2/results/${resultId}`);
  }
}
