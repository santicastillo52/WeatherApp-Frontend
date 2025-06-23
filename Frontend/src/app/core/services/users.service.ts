import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 private http = inject(HttpClient);
 private apiUrl =  environment.apiUrl;

 getUsers(page: number, limit: number, name: string): Observable<any> {
    const params = {
    page: page.toString(),
    limit: limit.toString(),
    name: name
  };

  return this.http.get<any>(`${this.apiUrl}/users`, { params });
}

getAllUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.apiUrl}/allUsers`);
}
}
