import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../../models/tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.apiUrl}/tasks`);
  }
  
}
