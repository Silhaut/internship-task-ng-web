import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'

  overview() {
    return this.http.get(`${this.apiUrl}/v1/admin/overview`)
  }
}
