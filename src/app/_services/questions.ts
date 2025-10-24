import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from './api-client';
import { Observable } from 'rxjs';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { IdDto } from '../_dto/id.dto';
import { QuestionDto, QuestionWithAnswersDto } from '../_dto/question.dto';
import { QuestionQueryDto } from '../_dto/question-query.dto';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/questions';
  private apiClient = inject(ApiClient);

  addQuestion(data: Pick<QuestionDto, 'text'>): Observable<IdDto> {
    return this.http.post<IdDto>(`\`http://localhost:3000${this.apiUrl}`, data)
  }

  getQuestions(query: QuestionQueryDto): Observable<PagedDataDto<QuestionDto>> {
    return this.apiClient.getPaged<PagedDataDto<QuestionDto>>(this.apiUrl, query);
  }

  getQuestion(questionId: string): Observable<QuestionDto> {
    return this.http.get<QuestionDto>(`http://localhost:3000${this.apiUrl}/${questionId}`);
  }

  getQuestionWithAnswers(questionId: string): Observable<QuestionWithAnswersDto> {
    return this.http.get<QuestionWithAnswersDto>(`http://localhost:3000${this.apiUrl}/${questionId}/answer-options`);
  }

  update(questionId: string, data: Pick<QuestionDto, 'text'>): Observable<IdDto> {
    return this.http.put<IdDto>(`http://localhost:3000${this.apiUrl}/${questionId}`, data)
  }

  delete(questionId: string) {
    return this.http.delete(`http://localhost:3000${this.apiUrl}/${questionId}`);
  }
}
