import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'weather',
        loadComponent: () =>
          import('./components/weather/weather.component').then(
            (c) => c.WeatherComponent
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./components/users/users.component').then(
            (c) => c.UsersComponent
          ),
      },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
