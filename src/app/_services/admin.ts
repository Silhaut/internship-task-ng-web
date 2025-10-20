import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminOverviewDto } from '../_dto/admin-overview.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'

  overview() {
    return this.http.get<AdminOverviewDto>(`${this.apiUrl}/v1/admin/overview`)
  }
}
