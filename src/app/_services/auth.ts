import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type LoginRequest = {
  username: string,
  password: string,
}

type LoginResponse = {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api'

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data)
  }
}

