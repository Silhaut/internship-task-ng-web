import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from './api-client';
import { Observable } from 'rxjs';
import { IdDto } from '../_dto/id.dto';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { AnswerOptionDto, AnswerOptionWithQuestionDto } from '../_dto/answer-option.dto';
import { AnswerOptionsQueryDto } from '../_dto/answer-options-query.dto';

@Injectable({
  providedIn: 'root'
})
export class AnswerOptionService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/answer-options';
  private apiClient = inject(ApiClient);

  addAnswerOption(data: Pick<AnswerOptionDto, 'questionId' | 'text'>): Observable<IdDto> {
    return this.http.post<IdDto>(`http://localhost:3000${this.apiUrl}`, data)
  }

  getAnswerOptions(query: AnswerOptionsQueryDto): Observable<PagedDataDto<AnswerOptionWithQuestionDto>> {
    return this.apiClient.getPaged<PagedDataDto<AnswerOptionWithQuestionDto>>(`/api/v2/answer-options`, query);
  }

  getAnswerOption(optionId: string): Observable<AnswerOptionWithQuestionDto> {
    return this.http.get<AnswerOptionWithQuestionDto>(`http://localhost:3000/api/v2/answer-options/${optionId}`);
  }

  update(optionId: string, data: Pick<AnswerOptionDto, 'text'>): Observable<IdDto> {
    return this.http.put<IdDto>(`http://localhost:3000${this.apiUrl}/${optionId}/text`, data)
  }

  delete(optionId: string) {
    return this.http.delete(`http://localhost:3000${this.apiUrl}/${optionId}`);
  }
}
