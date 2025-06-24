import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../../core/services/auth-service';
import { LoginUser } from '../../models/user.model';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string | null = null;
  isSubmitting: boolean = false;
  messageButton: string = 'Iniciar sesión';

  formModel = {
    email: '',
    password: '',
  } as LoginUser;

  submitForm() {
    if(this.isSubmitting) return;
    this.messageButton = 'Iniciando sesión...';
    this.isSubmitting = true;
    this.authService.login(this.formModel).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard/weather']);
      },
      error: (error) => {
        console.log('ha ocurrido un error', error);
        this.errorMessage = error.error?.message;
        this.isSubmitting = false;
        this.messageButton = 'Iniciar sesión';
      },
      complete:()=>{
        this.isSubmitting = false;
        this.messageButton = 'Iniciar sesión';
      }
    });
  }
}
