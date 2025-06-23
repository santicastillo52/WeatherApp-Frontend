import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isOpen = true;
  private authService = inject(AuthService);
  private router = inject(Router);
  isCollapsed = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
    console.log('sesion cerrada');
  }
}
