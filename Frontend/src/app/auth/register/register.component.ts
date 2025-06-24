import { Component, inject, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { RegisterUser } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string | null = null;
  isSubmitting: boolean = false;
  messageButton: string = 'Registrarse';

  formModel: RegisterUser = {
    name: '',
    password: '',
    repeatPassword: '',
    email: '',
  } as RegisterUser;

  submitRegister() {
    if (this.isSubmitting) return;
    this.messageButton = 'Registrando...';
    this.isSubmitting = true;
    const user = {
      name: this.formModel.name,
      password: this.formModel.password,
      email: this.formModel.email,
    };
    this.authService.register(user).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard/weather']);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error?.message;
        this.isSubmitting = false;
        this.messageButton = 'Registrarse';
      },
      complete: () => {
        this.isSubmitting = false;
        this.messageButton = 'Registrarse';
      },
    });
  }

  passwordsDoNotMatch(): boolean {
    return this.formModel.password !== this.formModel.repeatPassword;
  }
}
