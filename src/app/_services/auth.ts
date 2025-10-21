import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PagedDataDto } from '../_dto/paged-data.dto';
import { UserDto } from '../_dto/user.dto';

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

  private meSignal = signal<UserDto | null | undefined>(undefined);

  readonly me = this.meSignal.asReadonly();

  async fetchCurrentUser() {
    try {
      const user = await this.http
        .get<UserDto>(`${this.apiUrl}/auth/me`)
        .toPromise();
      this.meSignal.set(user);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      this.meSignal.set(null);
    }
  }

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, data)
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.meSignal.set(null);
  }
}

