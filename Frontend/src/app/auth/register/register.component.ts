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

  formModel: RegisterUser = {
    name: '',
    password: '',
    repeatPassword: '',
    email: '',
  } as RegisterUser;

  submitRegister() {
    const user = {
      name: this.formModel.name,
      password: this.formModel.password,
      email: this.formModel.email,
    };
    this.authService.register(user).subscribe({
      next: (res) => {
        this.router.navigate(['dashboard']);
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error?.message;
      },
    });
  }

  passwordsDoNotMatch(): boolean {
    return this.formModel.password !== this.formModel.repeatPassword;
  }
}
