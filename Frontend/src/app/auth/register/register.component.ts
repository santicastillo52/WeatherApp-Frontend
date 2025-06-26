import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth-service';
import { RegisterUser } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  errorMessage: string | null = null;
  isSubmitting: boolean = false;
  messageButton: string = 'Registrarse';

  formModel: RegisterUser = {
    name: '',
    password: '',
    repeatPassword: '',
    email: '',
  } as RegisterUser;

  submitRegister(): void {
    if (this.isSubmitting) return;
    
    this.setLoadingState(true);
    this.errorMessage = null;

    const user = {
      name: this.formModel.name,
      password: this.formModel.password,
      email: this.formModel.email,
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['dashboard/weather']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al registrarse';
        this.setLoadingState(false);
      }
    });
  }

  passwordsDoNotMatch(): boolean {
    return this.formModel.password !== this.formModel.repeatPassword;
  }

  private setLoadingState(loading: boolean): void {
    this.isSubmitting = loading;
    this.messageButton = loading ? 'Registrando...' : 'Registrarse';
  }
}
