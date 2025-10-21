import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth';
import { Router } from '@angular/router';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzFormModule,
    NzFlexModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  form!: FormGroup

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSave() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          if (res) {
            localStorage.setItem('accessToken', res.accessToken);
            this.router.navigate(['/admin']);
            this.authService.fetchCurrentUser();
          }
        },
        error: () => {
          console.error('Login failed');
        }
      })
    }
  }
}
