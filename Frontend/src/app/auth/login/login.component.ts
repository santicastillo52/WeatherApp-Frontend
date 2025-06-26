import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth-service';
import { LoginUser } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  errorMessage: string | null = null;
  isSubmitting: boolean = false;
  messageButton: string = 'Iniciar sesión';

  formModel = {
    email: '',
    password: '',
  } as LoginUser;

  submitForm(): void {
    if (this.isSubmitting) return;
    
    this.setLoadingState(true);
    this.errorMessage = null;

    this.authService.login(this.formModel).subscribe({
      next: () => {
        this.router.navigate(['dashboard/weather']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        this.setLoadingState(false);
      }
    });
  }

  private setLoadingState(loading: boolean): void {
    this.isSubmitting = loading;
    this.messageButton = loading ? 'Iniciando sesión...' : 'Iniciar sesión';
  }
}
