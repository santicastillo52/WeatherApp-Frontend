import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { LoginUser, RegisterUser, User } from '../../models/user.model';
import { environment } from '../../environment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  environment.apiUrl;
  private http = inject(HttpClient);

  private currentUser = new BehaviorSubject<any>(this.getUser());
  public currentUser$ = this.currentUser.asObservable();

  login(user: LoginUser): Observable<{ token: string; user: User }> {
    const timezoneOffset = new Date().getTimezoneOffset();

    const body = { ...user, timezoneOffset };

    return this.http
      .post<{ token: string; user: User }>(`${this.apiUrl}/login`, body)
      .pipe(
        tap((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUser.next(response.user);
          }
        })
      );
  }

  register(user: RegisterUser): Observable<{ token: string; user: User }> {
  return this.http.post(`${this.apiUrl}/register`, user).pipe(
    switchMap(() => this.login({ email: user.email, password: user.password }))
  );
}

  logout(): void {
    localStorage.clear();
    this.currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
function newDate() {
  throw new Error('Function not implemented.');
}
