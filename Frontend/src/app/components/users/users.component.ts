import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { UsersService } from '../../core/services/users.service';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  private readonly userService = inject(UsersService);
  private readonly subscription = new Subscription();
  
  errorMessage: string | null = null;
  users!: User[];
  allUsers!: User[];
  searchTerm: string = '';
  currentPage = 1;
  totalPages = 1;
  limit = 2;

  ngOnInit(): void {
    this.loadUsers();
    this.loadAllUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadUsers(): void {
    this.subscription.add(
      this.userService.getUsers(this.currentPage, this.limit, this.searchTerm).subscribe({
        next: (res) => {
          this.users = res.users;
          this.totalPages = res.totalPages;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al cargar usuarios';
        },
      })
    );
  }

  loadAllUsers(): void {
    this.subscription.add(
      this.userService.getAllUsers().subscribe({
        next: (users) => {
          this.allUsers = users;
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Error al cargar todos los usuarios';
        },
      })
    );
  }

  searchName(): void {
    this.loadUsers();
  }

  cancelName(): void {
    this.searchTerm = '';
    this.loadUsers();
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  exportToClipboard(): void {
    const data = this.allUsers
      .map((user) => `${user.name}, ${user.email}, ${user.last_login}, ${user.created_at}`)
      .join('\n');
    navigator.clipboard.writeText(data).then(() => {
      alert('Copiado al portapapeles');
    });
  }

  exportToPDF(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [['Nombre', 'Email', 'Último Inicio de Sesión', 'Fecha de Creación']],
      body: this.allUsers.map((user) => [user.name, user.email, user.last_login, user.created_at]),
    });

    doc.save('usuarios.pdf');
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.allUsers);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const data: Blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });
    saveAs(data, 'usuarios.xlsx');
  }

  printAllUsers(): void {
    if (!this.allUsers || this.allUsers.length === 0) {
      alert('No hay usuarios para imprimir.');
      return;
    }

    const tableHtml = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Último login</th>
            <th>Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          ${this.allUsers.map(user => `
            <tr>
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.last_login ?? ''}</td>
              <td>${user.created_at}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    const win = window.open('', '_blank', 'width=900,height=700');

    if (!win) {
      alert('El navegador bloqueó la ventana de impresión.');
      return;
    }

    const html = `
      <html>
        <head>
          <title>Imprimir Todos los Usuarios</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Listado Completo de Usuarios</h2>
          ${tableHtml}
        </body>
      </html>
    `;

    win.document.open();
    win.document.write(html);
    win.document.close();

    win.onload = () => {
      win.focus();
      win.print();
      win.close();
    };
  }
}
