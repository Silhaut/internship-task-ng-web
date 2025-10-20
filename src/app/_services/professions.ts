import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from './api-client';
import { Observable } from 'rxjs';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { ProfessionDto } from '../_dto/profession.dto';
import { ProfessionsQueryDto } from '../_dto/professions-query.dto';
import { IdDto } from '../_dto/id.dto';
import { Professions } from '../professions/professions';

@Injectable({
  providedIn: 'root'
})
export class ProfessionsService {
  private http = inject(HttpClient);
  private apiUrl = '/api/v1/professions';
  private apiClient = inject(ApiClient);

  getProfessions(query: ProfessionsQueryDto): Observable<PagedDataDto<ProfessionDto>> {
    return this.apiClient.getPaged<PagedDataDto<ProfessionDto>>(this.apiUrl, query);
  }

  getProfession(professionId: string): Observable<ProfessionDto> {
    return this.http.get<ProfessionDto>(`http://localhost:3000${this.apiUrl}/${professionId}`);
  }

  update(professionId: string, data: Partial<Pick<ProfessionDto, 'name' | 'description'>>): Observable<IdDto> {
    return this.http.put<IdDto>(`http://localhost:3000${this.apiUrl}/${professionId}`, data)
  }
}
