import { inject, Injectable } from '@angular/core';
import { QueryParamsDto } from '../_dto/query-params.dto';
import { Observable } from 'rxjs';
import { buildHttpQuery } from '../_utils/build-http-query';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClient {
  private http = inject(HttpClient);

  getPaged<T>(endpoint: string, query: QueryParamsDto & Record<string, any>): Observable<T> {
    const queryString = buildHttpQuery(query);
    return this.http.get<T>(`http://localhost:3000${endpoint}?${queryString}`);
  }
}
