import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tasks } from '../../models/tasks.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getTasks(): Observable<Tasks[]> {
    return this.http.get<Tasks[]>(`${this.apiUrl}/tasks`);
  }
  
}
