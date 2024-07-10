import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from '../../../config';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = Config.apiUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/users');
  }
}
